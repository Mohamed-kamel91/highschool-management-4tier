import express from 'express';

import { StudentDatabase } from '../persistence/student-database';
import { StudentService } from '../services/student-service';

import { parseForResponse } from '../utils';
import { GetStudentDTO } from '../dto/student-dto';
import { prisma } from '../database';

class StudentController {
  private studentService: StudentService;

  constructor(studentService: StudentService) {
    this.studentService = studentService;
  }

  public getStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    const { id } = req.params;

    try {
      const dto = GetStudentDTO.fromRequest(id);
      const data = await this.studentService.getStudent(dto);

      res.status(200).json({
        data: parseForResponse(data),
        error: null,
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

const studentDb = new StudentDatabase(prisma);
const studentService = new StudentService(studentDb);
const studentController = new StudentController(studentService);

export { studentController };
