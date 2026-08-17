import { Router } from 'express';

const router = Router();

router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    platform: 'RIZEN CARE AI Platform',
    version: '1.0.0',
    providersConfigured: {
      gemini: !!process.env.GEMINI_API_KEY,
      openrouter: !!process.env.OPENROUTER_API_KEY,
      groq: !!process.env.GROQ_API_KEY,
      fallbackEngine: true
    },
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

export default router;
