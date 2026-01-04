// Redis-backed rate limiter middleware
// Uses the project's Redis client to store per-IP counters (INCR + EXPIRE)

const RedisClient = require('../Redis/config/redis.config');
const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60 * 1000; // default 1 minute
const maxRequests = parseInt(process.env.RATE_LIMIT_MAX, 10) || 60; // default 60 requests
const windowSec = Math.ceil(windowMs / 1000);

module.exports = async function rateLimiter(req, res, next) {
    try {
        const ip = (req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown').toString();
        const key = `rate:${ip}`;

        // Increment the counter
        const count = await RedisClient.incr(key);

        // If first hit, set TTL
        if (count === 1) {
            await RedisClient.expire(key, windowSec);
        }

        const remaining = Math.max(0, maxRequests - count);
        res.setHeader('X-RateLimit-Limit', String(maxRequests));
        res.setHeader('X-RateLimit-Remaining', String(remaining));

        if (count > maxRequests) {
            // Get time to live (seconds) for Retry-After
            let ttl = await RedisClient.ttl(key);
            if (typeof ttl !== 'number' || ttl < 0) ttl = windowSec;
            res.setHeader('Retry-After', String(ttl));
            if (res.apiError) return res.apiError('Too many requests, please try again later', 429);
            return res.status(429).json({ success: false, message: 'Too many requests, please try again later' });
        }

        return next();
    } catch (err) {
        // On Redis errors, allow requests to continue but log if possible
        // eslint-disable-next-line no-console
        console.warn('Rate limiter error:', err && err.message ? err.message : err);
        return next();
    }
};
