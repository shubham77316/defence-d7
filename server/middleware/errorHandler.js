const errorHandler = (err, req, res, next) => {
  console.error("[SERVER ERROR]", err);

  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || "Internal Strategic Server Error";

  // Mongoose Bad ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = `Resource not found with specified identifier.`;
  }

  // Mongoose Duplicate Key
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate record entered for '${field}'. Please provide a unique value.`;
  }

  // Mongoose Validation Error
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  // Multer Error
  if (err.name === "MulterError") {
    statusCode = 400;
    if (err.code === "LIMIT_FILE_SIZE") {
      message = "File exceeds maximum size limit of 10MB.";
    }
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = errorHandler;
