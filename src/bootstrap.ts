import { prisma } from './database';

import {
  ClassController,
  StudentController,
  AssignmentController,
} from './controllers';
import {
  ClassDatabase,
  StudentDatabase,
  AssignmentDatabase,
} from './persistence';
import {
  ClassService,
  StudentService,
  AssignmentService,
} from './services';
import {
  StudentRouter,
  ClassRouter,
  AssignmentRouter,
} from './routes';

import { errorHandler } from './shared/errors/errorHandler';

import Application from './app';
import { StudentAssignmentRouter } from './routes/assignment-routes';

const studentDb = new StudentDatabase(prisma);
const studentService = new StudentService(studentDb);
const studentController = new StudentController(studentService);
const studentRouter = new StudentRouter(studentController);

const classDb = new ClassDatabase(prisma);
const classService = new ClassService(classDb, studentDb);
const classController = new ClassController(classService);
const classRouter = new ClassRouter(classController);

const assignmentDb = new AssignmentDatabase(prisma);
const assignmentService = new AssignmentService(assignmentDb, studentDb);
const assignmentController = new AssignmentController(assignmentService);
const assignmentRouter = new AssignmentRouter(assignmentController);
const studentAssignmentRouter = new StudentAssignmentRouter(assignmentController);

const routers = [
  studentRouter, 
  classRouter, 
  assignmentRouter, 
  studentAssignmentRouter,
];

const app = new Application(routers, errorHandler);

export default app;
