import express from 'express';
import { studentController } from '../controllers/student-controller';

const router = express.Router();

router.get('/students/:id', studentController.getStudent);
router.post('/students', studentController.createStudent);

export { router as studentRouter };
