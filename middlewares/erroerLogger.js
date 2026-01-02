const logger = require('../utils/logger');
const { error: responseError } = require('../utils/response');

function errorLogger(err, req, res, next) {
  const payload = {
    message: err.message,
    stack: err.stack,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    userId: req.user ? req.user.id : 'Guest',
  };

  logger.error('UnhandledError', payload);

  if (res.headersSent) return next(err);

  return responseError(res, 'Internal Server Error', 500, process.env.NODE_ENV === 'development' ? payload : null);
}

module.exports = errorLogger;