@start-all-tests @011 @create-folder-from-move-dialog @suite-3
Feature: As a OSDR user I want to create a folder from move dialog:

    Scenario: I login in the application as a test user
        Given I go to the site
        When go to login page
        When login as a test user

    Scenario: As a user I want to navigate to browser
        When I click on Organize panel
        Then I should see root folder DRAFTS browser

    Scenario: As a  user I want to create a folder
        Given Delete file or folder 'TEST_FOLDER_011' if it exist
        And I click create button on toolbar
        And enter valid folder name 'TEST_FOLDER_011'
        And click Create button
        Then 'TEST_FOLDER_011' file or folder is shown
        And I go to folder 'DRAFTS/TEST_FOLDER_011'   

    Scenario: As a  user I want to create a folder
        Given Delete file or folder 'TEST_FOLDER_011_1' if it exist
        And I click create button on toolbar
        And enter valid folder name 'TEST_FOLDER_011_1'
        And click Create button
        Then 'TEST_FOLDER_011_1' file or folder is shown

    Scenario: As a user I want to create folder from move dialog
        Given I select file or folder 'TEST_FOLDER_011_1'
        And I open context toolbar menu and click 'Move' folder button
        And I click create new folder button in move dialog
        And I enter test folder name 'TEST_FOLDER_011_2' in input field
        Then I click submit folder creation button in move dialog 
        Then I check if 'TEST_FOLDER_011_2' was created in move dialog
        Then I close modal window

    Scenario: As a user I want to delete test folder from DRAFTS
        Given I go in the main directory
        And I select file or folder 'TEST_FOLDER_011'
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete folder
        Then 'TEST_FOLDER_011' disappeared

    Scenario: I logout from site
        When I logout from site