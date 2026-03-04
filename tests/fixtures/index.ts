import { AssignmentBuilder } from './assignment-builder';
import { AssignmentSubmissionBuilder } from './assignment-submission-builder';
import { ClassEnrollmentBuilder } from './class-enrollment-builder';
import { ClassroomBuilder } from './classroom-builder';
import { StudentAssignmentBuilder } from './student-assignment-builder';
import { StudentBuilder } from './student-builder';

function aStudent() {
  return new StudentBuilder();
}

function aClassRoom() {
  return new ClassroomBuilder();
}

function anAssignment() {
  return new AssignmentBuilder();
}

function anEnrolledStudent() {
  return new ClassEnrollmentBuilder();
}

function aStudentAssigment() {
  return new StudentAssignmentBuilder();
}

function anAssignmentSubmission() {
  return new AssignmentSubmissionBuilder();
}

export {
  aStudent,
  aClassRoom,
  anAssignment,
  anEnrolledStudent,
  aStudentAssigment,
  anAssignmentSubmission,
  StudentBuilder,
  ClassroomBuilder,
  AssignmentBuilder,
  ClassEnrollmentBuilder,
  StudentAssignmentBuilder,
  AssignmentSubmissionBuilder,
};
