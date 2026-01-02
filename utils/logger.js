const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json, errors } = format;

const logFormat = printf(({ level, message, timestamp, stack, ...meta }) => {
    const base = { level, message, timestamp, ...meta };
    if (stack) base.stack = stack;
    return JSON.stringify(base);
});

const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp(),
        errors({ stack: true }),
        json()
    ),
    transports: [
        new transports.Console({ format: combine(timestamp(), logFormat) }),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/combined.log' })
    ],
    exitOnError: false,
});

module.exports = logger;
