/**
 * In-memory sliding-window rate limiter for sensitive authentication & admin endpoints
 */
const rateLimits = new Map();

// Periodic cleanup of expired rate limit entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of rateLimits.entries()) {
    if (now > data.resetTime) {
      rateLimits.delete(key);
    }
  }
}, 10 * 60 * 1000);

const rateLimiter = ({ windowMs = 15 * 60 * 1000, max = 50, message = "Too many requests. Please try again later." }) => {
  return (req, res, next) => {
    // In test or local dev if desired, we still enforce high threshold
    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
      req.socket?.remoteAddress ||
      "127.0.0.1";
    const key = `${ip}:${req.baseUrl || req.path}`;
    const now = Date.now();

    const record = rateLimits.get(key) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count += 1;
    }

    rateLimits.set(key, record);

    res.setHeader("X-RateLimit-Limit", max);
    res.setHeader("X-RateLimit-Remaining", Math.max(0, max - record.count));
    res.setHeader("X-RateLimit-Reset", Math.ceil(record.resetTime / 1000));

    if (record.count > max) {
      return res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((record.resetTime - now) / 1000),
      });
    }

    next();
  };
};

module.exports = { rateLimiter };
