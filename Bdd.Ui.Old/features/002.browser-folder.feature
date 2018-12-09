@test002
@smoke
Feature: As an OSDR user I want to manage my folders:
# done:
    # Add folder
    # Add another folder
    # Add sub-folder
    # Add another sub-folder
    # Rename subfolder
    # Delete subfolder
    # Move subfolder
    # Move folder with subfolders
    # Delete folder

# to be implemented:
    # think about different Move scenarios
    # think about testing depth of subfolders
    #create folder/subfolder with duplicating name
    # move folder/subfolder when folder with the name already exist
    #create folder/subfolder with invalid name
    #create folder/subfolder with short/empty/long names

 Scenario: I login in the application as a test user
    Given I go to the site
    When  login as a test user
    Then  I should see "HELLO, TESTER 1" on the Home page
 
 Scenario: As a  user I want to navigate to browser 
    When I click Upload and Organize panel
    Then I should see browser window

    Scenario: As a  user I want to create a folder (and the new folder appears only once )
       # When I count items at step "1"
        Given I go in the main directory
        And I click Add folder button
        And enter valid folder name "TEST_F1" 
         # if file with this name already exist, than folder "Test_f1+(random number)" will be created
        And click Create button
        Then "TEST_F1" folder is shown
        #Then I count items at step "2"

    Scenario: As a  user I want to create another folder
        Given I go in the main directory
        When I click Add folder button
        And enter valid folder name "TEST_F2"
        And click Create button
        Then "TEST_F2" folder is shown

    Scenario: As a  user I want to create a sub-folder
        Given I go in the main directory
        When I select folder "TEST_F2"
        And open the folder
        Then I am inside the folder "TEST_F2" directory
        When I click Add folder button 
        And enter valid folder name "TEST_F2_SUB1"
        And click Create button
        Then "TEST_F2_SUB1" folder is shown

    Scenario: As a  user I want to create another sub-folder
        Given I am inside the folder "TEST_F2" directory
        When I click Add folder button 
        And enter valid folder name "TEST_F2_SUB2"
        And click Create button
        Then "TEST_F2_SUB2" folder is shown  

    Scenario: As a  user I want to rename a sub-folder
        Given I am inside the folder "TEST_F2" directory
        When I select folder "TEST_F2_SUB2"
        And click Rename button
        When I add "_RENAME" text to folder name
        And click outside the folder 
        Then "TEST_F2_SUB2_RENAME" folder is shown

    Scenario: As a  user I want to delete exicting sub-folder
        Given I am inside the folder "TEST_F2" directory
        When I select folder "TEST_F2_SUB2_RENAME"
       # And I remember folder names
        And click Delete button
        And confirm deleting
        Then "TEST_F2_SUB2_RENAME" folder is not showing any more
 
    Scenario: As a  user I want to move exicting sub-folder in other folder
        Given I am inside the folder "TEST_F2" directory
        When I select folder "TEST_F2_SUB1"
        And click Move button 
        And I move to TEST_F1 from TEST_F2  directory
        And Confirm moving to selected folder
        Then "TEST_F2_SUB1" folder is not showing any more
       # When I open   "TEST_F1" directory
        When I go in the main directory
        And I select folder "TEST_F1"
        And open the folder
        Then "TEST_F2_SUB1" folder is shown

    Scenario: As a  user I want to move exicting folder with sub-folders
        Given I go in the main directory
        When I select folder "TEST_F1"
        And click Move button 
        And I move to "TEST_F2" directory
        And Confirm moving to selected folder
        Then "TEST_F1" folder is not showing any more
        When I open   "TEST_F2" directory
        Then "TEST_F1" folder is shown
        When I select folder "TEST_F1"
        And open the folder
        Then "TEST_F2_SUB1" folder is shown 

    Scenario: As a new user I want to delete exicting folder
        #When I count items at step "3"
        Given I go in the main directory
        And I select folder "TEST_F2"
        And click Delete button
        And confirm deleting
      #  And I count items at step "4"
        Then "TEST_F2" folder is not showing any more
        #And I count items at step "5"
