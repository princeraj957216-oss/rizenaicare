import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import aiRoutes from './routes/aiRoutes.js';
import medicalRoutes from './routes/medicalRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { standardLimiter } from './middleware/rateLimiter.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet({
  crossOriginResourcePolicy: false
}));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '12mb' }));
app.use(express.urlencoded({ extended: true, limit: '12mb' }));

app.use(standardLimiter);

// Serve static uploads if needed
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', healthRoutes);
app.use('/api', aiRoutes);
app.use('/api', medicalRoutes);
app.use('/api/appointments', appointmentRoutes);

// Fallback 404
app.use('/api/*', (req, res) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

// Central Error Handler
app.use(errorHandler);

// Vercel loads the Express app as a serverless function. Keep the local
// listener for development, but export the app for the hosted runtime.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[RIZEN CARE API] Server active on http://localhost:${PORT}`);
  });
}

export default app;
