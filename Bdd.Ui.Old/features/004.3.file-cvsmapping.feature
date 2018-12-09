@csv-mapping
Feature: As an OSDR user I could perform mapping csv file into chemical file

@test0043
Scenario: I login in the application as a test user
     Given I go to the site
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page

@test0043
Scenario: I navigate to TEST_FILES folder 
    When I click Upload and Organize panel
    Then I should see browser window
    And  Check if "TEST_FILES" folder already exist and create if not
    When I select folder "TEST_FILES"
    And  open the folder
    Then I am inside the folder "TEST_FILES" directory

@test0043
Scenario: As a user I want to upload a CSV file
    Given I am inside the folder "TEST_FILES" directory
    When  I want to upload "../../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv" file
    Then  I check that "FocusSynthesis_InStock_071411_extra_short.csv" file is shown

@test0043
Scenario: As a user I want to open a CSV file  
    When  I open "FocusSynthesis_InStock_071411_extra_short.csv" file
    Then  I see file properties section

@test0043
Scenario: As a user I want to map a  CSV file by Chemical Name
    Given I am inside the file "FocusSynthesis_InStock_071411_extra_short.csv"
    When  I click Mapping button
    Then  Mapping screen is open
    When I map File field "Chemical Name" to "Chemical Name"
    And  Start Processing
    And  Wait untill Chemical element is presented
   Then I see file records section

@test0043
Scenario: As a user I want to delete a CSV file 
   Given I am inside the file "FocusSynthesis_InStock_071411_extra_short.csv"
    When I navigate in "TEST_FILES" directory
    And  I select "FocusSynthesis_InStock_071411_extra_short.csv" file
    And  click Delete button
    And confirm deleting

