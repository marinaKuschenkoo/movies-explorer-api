const rateLimit = require('express-rate-limit');

const MAX_LIMIT_RATE_ERROR = 'Превышено ограничение количества запросов, попробуйте снова позже.';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: MAX_LIMIT_RATE_ERROR,
});

module.exports = limiter;
