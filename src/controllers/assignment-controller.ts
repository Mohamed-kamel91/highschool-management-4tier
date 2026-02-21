import express from 'express';

import { AssignmentService } from '../services';
import {
  AssignmentID,
  AssignStudentDTO,
  CreateAssignmentDTO,
  GradeAssignmentDTO,
  SubmitAssignmentDTO,
} from '../dtos/assignment-dtos';

import { parseForResponse } from '../shared/utils';

class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  public createAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = CreateAssignmentDTO.fromRequest(req.body);

      const data = await this.assignmentService.createAssignment(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public getAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = AssignmentID.fromRequestParams(req.params);

      const data = await this.assignmentService.getAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public assignStudent = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = AssignStudentDTO.fromRequest(req.body);

      const data = await this.assignmentService.assignStudent(dto);

      res.status(201).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public submitAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = SubmitAssignmentDTO.fromRequest(req.body);

      const data = await this.assignmentService.submitAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

  public gradeAssignment = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const dto = GradeAssignmentDTO.fromRequest(req.body);

      const data = await this.assignmentService.gradeAssignment(dto);

      res.status(200).json({
        error: undefined,
        data: parseForResponse(data),
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AssignmentController;
