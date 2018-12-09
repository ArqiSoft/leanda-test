@stepper
Feature: As a OSDR user I want to explore the dataset stepper page

  @login
  Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

  @filter
  Scenario: I setup filter
    Given I go to file page
    When I open filter panel
    When I search and add filter by name 'InChI' and value 'hello'
    When I search and add filter by name 'SMILES' and value 'world'
    When I remove all chosen filters
    When I search and add filter by name 'InChI' and value 'hello'

  @stepper
  Scenario: I setup filter
    Given I go to stepper with property 'InChI' and its value 'hello'
    When I go through first step
    When I go through second step
    When I go through third step

  @logout
  Scenario: I logout from site
    When I logout from site
#    Then I am on logout page
    Then I go to main page