import { prisma } from './database';

import { ClassController, StudentController } from './controllers';
import { ClassDatabase, StudentDatabase } from './persistence';
import { ClassService, StudentService } from './services';
import { StudentRouter } from './routes/student-routes';

import { errorHandler } from './shared/errors/errorHandler';

import Application from './app';
import { ClassRouter } from './routes/class-routes';

const studentDb = new StudentDatabase(prisma);
const studentService = new StudentService(studentDb);
const studentController = new StudentController(studentService);
const studentRouter = new StudentRouter(studentController);

const classDb = new ClassDatabase(prisma);
const classService = new ClassService(classDb, studentDb);
const classController = new ClassController(classService);
const classRouter = new ClassRouter(classController);

const routers = [studentRouter, classRouter];

const app = new Application(routers, errorHandler);

export default app;
