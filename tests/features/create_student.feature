Feature: Create Student
	As an administrator
  I want to create student records
  so that students can be assigned to classes and assignments and managed within the system

  Scenario: Successfully create a student
    Given I have a student with name "Mohamed Kamel" and email "mohkamel91@gmail.com"
    When I send a request to create the student
    Then The student should be created successfully

  Scenario: Missing student email 
    Given I have a student with name "Mohamed Kamel" but no email
    When I send a request to create the student 
    Then the student should not be created 
    And I shoud receive an error message 