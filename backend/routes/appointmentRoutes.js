import { Router } from 'express';
import { MedicalController } from '../controllers/medicalController.js';

const router = Router();

router.get('/', MedicalController.getAppointments);
router.post('/', MedicalController.createAppointment);

export default router;
