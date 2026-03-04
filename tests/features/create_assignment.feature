Feature: Create Assignment
  As a Teacher
  I want to create an assignment
  so that I can assign it to students

  Scenario: Successfully create an assignment
    Given a classroom exists
    When I create an assignment with title "Assignment 1" for the classroom
    Then the assignment should be created successfully

  Scenario: Missing assignment title
    Given a classroom exists
    When I send a request to create an assignment without a title
    Then the assignment should not be created

