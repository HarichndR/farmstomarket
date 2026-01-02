const logger = require('../utils/logger');

function RequestLogger(req, res, next) {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        const logDetails = {
            timestamp: new Date().toISOString(),
            userId: req.user ? req.user.id : 'Guest',
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 400,
            userAgent: req.headers['user-agent'],
            message: res.statusMessage || '',
            duration: `${duration}ms`,
            ip: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        };

        logger.info('request', logDetails);
    });

    next();
}

module.exports = RequestLogger;
