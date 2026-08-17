import rateLimit from 'express-rate-limit';

export const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // max 120 requests per 15 minutes
  message: {
    success: false,
    error: 'Too many requests, please try again after a few minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const aiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 40,
  message: {
    success: false,
    error: 'AI request limit reached. Please wait a moment before sending more queries.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
