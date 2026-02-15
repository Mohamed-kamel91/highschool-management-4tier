import express from 'express';

import { StudentDatabase } from '../persistence/student-database';
import { StudentService } from '../services/student-service';

import { parseForResponse } from '../utils';
import { CreateStudentDTO, GetStudentDTO } from '../dto/student-dto';
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

  public createStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = CreateStudentDTO.fromRequest(req.body);

      const data = await this.studentService.createStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
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
