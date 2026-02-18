import { prisma } from './database';

import { StudentController } from './controllers';
import { StudentDatabase } from './persistence';
import { StudentService } from './services';
import { StudentRouter } from './routes/student-routes';

import { errorHandler } from './shared/errors/errorHandler';

import Application from './app';

const studentDb = new StudentDatabase(prisma);
const studentService = new StudentService(studentDb);
const studentController = new StudentController(studentService);
const studentRouter = new StudentRouter(studentController);

const routers = [studentRouter];

const app = new Application(routers, errorHandler);

export default app;
