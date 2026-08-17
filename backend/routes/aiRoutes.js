import { Router } from 'express';
import { AIController } from '../controllers/aiController.js';
import { aiLimiter } from '../middleware/rateLimiter.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = Router();

router.use(aiLimiter);

router.post('/chat', AIController.handleChat);
router.post('/analyze-symptoms', AIController.analyzeSymptoms);
router.post('/medicine-information', AIController.getMedicineInformation);
router.post('/analyze-report', upload.single('report'), AIController.analyzeReport);
router.post('/analyze-prescription', upload.single('prescription'), AIController.analyzePrescription);
router.post('/diet-plan', AIController.generateDietPlan);

export default router;
