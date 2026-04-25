// Simple request logger middleware
const logger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const color =
      res.statusCode < 300 ? '\x1b[32m' :
      res.statusCode < 400 ? '\x1b[36m' :
      res.statusCode < 500 ? '\x1b[33m' : '\x1b[31m';
    console.log(
      `${color}[${new Date().toISOString()}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms)\x1b[0m`
    );
  });
  next();
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error('\x1b[31m[ERROR]\x1b[0m', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { logger, errorHandler };
