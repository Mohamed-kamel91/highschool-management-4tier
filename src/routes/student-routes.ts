import express from 'express';
import { studentController } from '../controllers/student-controller';

const router = express.Router();

router.get('/students/:id', studentController.getStudent);

export { router as studentRouter };
