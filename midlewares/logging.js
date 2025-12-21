function RequiestLogger(req, res, next) {
    const start = Date.now();

    // Capture response finish event to log after response is sent
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logDetails = {
            timestamp: new Date().toISOString(),
            userId: req.user ? req.user.id : 'Guest', // Assuming req.user is set after authentication
            action: `${req.method} ${req.originalUrl}`,
            status: res.statusCode,
            success: res.statusCode >= 200 && res.statusCode < 400,
            userAgent: req.headers['user-agent'],
            message: res.statusMessage,
            stack:"",
            duration: `${duration}ms`,
        };

        // Log the details (you can replace this with a logging library like Winston)
        console.log(logDetails);
    });

    next();
}

module.exports = RequiestLogger;
