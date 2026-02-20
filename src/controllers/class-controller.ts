import express from 'express';

import { ClassService } from '../services';

import { parseForResponse } from '../shared/utils';
import {
  CreateClassDTO,
  ClassID,
  EnrollStudentDTO,
} from '../dtos/class-dtos';

class ClassController {
  constructor(private classService: ClassService) {}

  public createClass = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = CreateClassDTO.fromRequest(req.body);

      const data = await this.classService.createClass(dto);

      res.status(201).json({
        data: parseForResponse(data),
        error: undefined,
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  public enrollStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = EnrollStudentDTO.fromRequest(req.body);

      const data = await this.classService.enrollStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };

  public getAssignments = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = ClassID.fromRequestParams(req.params);

      const data = await this.classService.getAssignments(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (err) {
      next(err);
    }
  };
}

export default ClassController;
