import express from 'express';

import { StudentService } from '../services';
import { GetStudentDTO, CreateStudentDTO } from '../dtos/student-dto';

import { parseForResponse } from '../shared/utils';

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

export default StudentController;
