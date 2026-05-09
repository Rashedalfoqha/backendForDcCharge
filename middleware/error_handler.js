/**
 * Global Error Handler Middleware
 * Prevents leaking sensitive information in production
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${new Date().toISOString()}:`, err.stack);

    const isProduction = process.env.NODE_ENV === 'production';
    
    const statusCode = err.statusCode || 500;
    const message = statusCode === 500 && isProduction 
        ? 'An internal server error occurred' 
        : err.message || 'Something went wrong';

    res.status(statusCode).json({
        success: false,
        message,
        ...(isProduction ? {} : { stack: err.stack, details: err.details || err })
    });
};

module.exports = errorHandler;
