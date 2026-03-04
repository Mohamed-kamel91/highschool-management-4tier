Feature: Assign a student to an assignment
  As a teacher
  I want to assign a student to an assignment
  So that the student can achieve learning objectives

  Scenario: Assign a student to an assignment
    Given A student is enrolled to a class with name "Math"
    And an assignment exists for the class "Math"
    When I assign the student the assignment 
    Then the student should be assigned to the assignment

  Scenario: Student is not enrolled to the class
    Given A student is not enrolled to a class
    And an assignment exists for the class
    When I assign the student to the assignment
    Then the student should not be assigned to the assignment
