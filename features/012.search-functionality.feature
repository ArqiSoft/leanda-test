@start-all-tests @012 @search-functionality @unstable @suite-3
Feature: As a Leanda user I want to search for files/folders:

    Scenario: I login in the application as a test user
        Given I go to the site
        When go to login page
        When login as a test user
        # Then I should see 'Tester 1' on the Home page

    Scenario: As a user I want to navigate to browser
        When I click on Organize panel
        Then I should see root folder DRAFTS browser

    #@smoke
    Scenario: As a  user I want to create a folder
        Given Delete file or folder 'TEST_FOLDER_012' if it exist
        And I click create button on toolbar
        And enter valid folder name 'TEST_FOLDER_012'
        And click Create button
        Then 'TEST_FOLDER_012' file or folder is shown
        And I go to folder 'DRAFTS/TEST_FOLDER_012'
    
    #@smoke
    Scenario: As a user I want to upload a file to folder
        Given Delete file or folder 'FocusSynthesis_InStock_071411_extra_short' if it exist
        When I want to upload file from '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' 'FocusSynthesis_InStock_071411_extra_short.csv' directory
        Then I check that 'FocusSynthesis_InStock_071411_extra_short.csv' file is added
   
    #@smoke
    Scenario Outline: As a user I want to search for my files and folders
        Given I click on search button in toolbar
        And I enter <title> to find by title
        And I check if <title> file or folder was found
        And I clean search field
        And I close search field
        Examples: 
            | title |
            |'FocusSynthesis_InStock_071411_extra_short.csv'|
            |'TEST_FOLDER_012'| 
    
    #@smoke
    Scenario Outline: As a user I want to delete my files and folders
        Given Delete file or folder 'FocusSynthesis_InStock_071411_extra_short.csv' if it exist
    
    Scenario: As a user I want to delete test folder from DRAFTS
        Given I go in the main directory
        And I select file or folder 'TEST_FOLDER_012'
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete folder
        Then 'TEST_FOLDER_012' disappeared

    #@smoke
    Scenario: I logout from site
        When I logout from site
