
Feature: As an OSDR user I want to add some chemical files

@test0032
 Scenario: I login in the application as a test user
     Given I go to the site
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page

@test0032
Scenario: I navigate to TEST_FILES folder 
    When I click Upload and Organize panel
    Then I should see browser window
    And  Check if "TEST_FILES" folder already exist and create if not
    When I select folder "TEST_FILES"
    And  open the folder
    Then I am inside the folder "TEST_FILES" directory

@test0032
Scenario: I want to navigate to TEST_CHEMICAL_FILES folder
    Given I am inside the folder "TEST_FILES" directory
    And  Check if "TEST_CHEMICAL_FILES" folder already exist and create if not
    When I select folder "TEST_CHEMICAL_FILES"
    And  open the folder
    Then I am inside the folder "TEST_CHEMICAL_FILES" directory

@test0032
 Scenario Outline: As a user I want to upload a Chemical files
    Given I am inside the folder "TEST_CHEMICAL_FILES" directory
    When  I want to upload file from <path> directory
    Then  I check that <filename> file is added
      Examples:
         | type | path         | filename|
         | "MOL"  | "../../../Data/MOL/1oir.mol" |"1oir.mol"|
         | "CDX"  | "../../../Data/CDX/10000_10Mos.cdx" |"10000_10Mos.cdx"|

@test0032
Scenario: As a new user I want to delete test folder
        Given I go in the main directory
        And I select folder "TEST_FILES"
        And click Delete button
        And confirm deleting
        Then "TEST_FILES" folder is not showing any more
