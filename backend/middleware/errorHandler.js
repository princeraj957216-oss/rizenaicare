export function errorHandler(err, req, res, next) {
  // Never expose internal stack traces or secrets to users
  const statusCode = err.statusCode || 500;
  const message = err.message || 'An unexpected internal error occurred. Please try again.';

  if (process.env.NODE_ENV !== 'production' && !err.isOperational) {
    console.error('[Server Error]:', err.message);
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    timestamp: new Date().toISOString()
  });
}
