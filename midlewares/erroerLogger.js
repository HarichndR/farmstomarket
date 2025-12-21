function errorLogger(err, req, res, next){
    // Log error details
    console.error('Error occurred:', {
      message: err.message,
      stack: err.stack,
      method: req.method,
      url: req.originalUrl,
      headers: req.headers,
      userId: req.user ? req.user.id : 'Guest', // Assuming req.user is set after authentication
    });
    // Respond to the client
    res.status(500).json({ error: 'Internal Server Error' })
    next();
  }

  module.exports= errorLogger;