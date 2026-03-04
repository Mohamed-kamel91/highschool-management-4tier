Feature: Class enrollment
  As an administrator
  I want to enroll a student to a class
  So that the student can attend the class

  Scenario: Successfully enroll a student to a class
    Given a class and a student exist
    When I enroll the student to the class
    Then the student should be enrolled to the class successfully
        
  Scenario: Student already enrolled to a class
    Given a student is already enrolled to a class
    When I enroll the student to the class again
    Then the class enrollment should not be created