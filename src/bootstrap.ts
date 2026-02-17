import { prisma } from './database';

import { StudentController } from './controllers';
import { StudentDatabase } from './persistence/student-database';
import { StudentService } from './services';

import Server from './server';
import { StudentRouter } from './routes/student-routes';

const studentDb = new StudentDatabase(prisma);
const studentService = new StudentService(studentDb);
const studentController = new StudentController(studentService);
const studentRouter = new StudentRouter(studentController);

const server = new Server(studentRouter);

export default server;
