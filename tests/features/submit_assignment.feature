Feature: Submit an assignment
  As a student
  I want to submit an assignment
  So that I can get a grade

  Scenario: Successfully submit an assignment
    Given I was assigned an assignment
    When I submit my assignment
    Then it should be successfully submitted

  Scenario: Submit an assignment already submitted
    Given I have already submitted an assignment
    When I submit the assignment again
    Then It should not be submitted again 
    And I should receive an error message