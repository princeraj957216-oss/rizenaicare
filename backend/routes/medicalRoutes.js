import { Router } from 'express';
import { MedicalController } from '../controllers/medicalController.js';

const router = Router();

router.get('/doctors', MedicalController.getDoctors);
router.get('/hospitals', MedicalController.getHospitals);

export default router;
