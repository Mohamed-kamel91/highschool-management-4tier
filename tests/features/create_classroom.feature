Feature: Create Classroom
	As an administrator
  I want to create a classroom
  so that I can add students to it

  Scenario: Successfully create a classroom
    Given I have a classroom with name "Math"
    When I send a request to create the classroom
    Then the classroom should be created successfully

  Scenario: Classroom already exists
    Given a classroom with name "Math" already exists
    When I send a request to create a classroom with same name
    Then the classroom should not be created