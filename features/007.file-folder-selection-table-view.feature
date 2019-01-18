@start-all-tests @007 @file-folder-actions-table-view @suite-2
Feature: As a Leanda user I want to select multiple files or folders or both in table view:

    Scenario: I login in the application as a test user
        Given I go to the site
        When go to login page
        When login as a test user

    Scenario: As a user I want to navigate to browser
        When I click on Organize panel
        Then I should see root folder DRAFTS browser
        
    Scenario: As a user I want to switch to table view
        Given I go in the main directory
        And I switch to table view

    Scenario: As a user I want to create folder for my files
        Given Delete file or folder 'TEST_FOLDER_007' if it exist
        And I click create button on toolbar
        And enter valid folder name 'TEST_FOLDER_007'
        And click Create button
        Then 'TEST_FOLDER_007' folder in table view is shown
        And I go to table folder 'DRAFTS/TEST_FOLDER_007'

    Scenario Outline: As a user I want to create new folder
        Given Delete file or folder <folderName> if it exist
        And I click create button on toolbar
        And enter valid folder name <folderName>
        And click Create button
        Then <folderName> folder in table view is shown
        Examples:
            |folderName|
            |'TABLE_VIEW_1'|
            |'TABLE_VIEW_2'|
            |'TABLE_VIEW_3'|
            |'TABLE_VIEW_TO_RENAME'|

    Scenario: As a user I want to upload a file to folder
        Given I go to table folder 'DRAFTS/TEST_FOLDER_007'
        When I want to upload file from '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' 'FocusSynthesis_InStock_071411_extra_short.csv' directory
        Then I check that 'FocusSynthesis_InStock_071411_extra_short.csv' file in table view is added   
    
    Scenario: As a  user I want to rename the folder
        Given for table view I select 'TABLE_VIEW_TO_RENAME' using CTRL
        And I open context toolbar menu and click 'Rename' folder button
        And enter new folder name 'TABLE_VIEW_TO_RENAME' to 'TABLE_VIEW_4' and click ENTER button to save
        Then check if folder name in table view was changed to 'TABLE_VIEW_4'

    Scenario: As a user I want to select table items using CTRL
        Given for table view I select 'TABLE_VIEW_1' using CTRL
        And for table view I select 'TABLE_VIEW_2' using CTRL
        And for table view I select 'TABLE_VIEW_3' using CTRL
        Then I refresh browser

    Scenario: As a user I want to select table items using SHIFT
        Given I switch to table view
        And for table view I select 'TABLE_VIEW_1' using CTRL
        And for table view I select 'TABLE_VIEW_3' using SHIFT
        And for table view I select 'FocusSynthesis_InStock_071411_extra_short' using CTRL

    Scenario: As a user I want to move selected items to another folder
        Given I open context toolbar menu and click 'Move' folder button
        And I select 'TABLE_VIEW_4' in move dialog
        And I click move button

    Scenario: As a user I want to delete previously selected items 
        Given I go to table folder 'DRAFTS/TEST_FOLDER_007/TABLE_VIEW_4'
        And for table view I select 'TABLE_VIEW_1' using CTRL
        And for table view I select 'TABLE_VIEW_2' using CTRL
        And for table view I select 'FocusSynthesis_InStock_071411_extra_short' using SHIFT
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete files & folders

    Scenario: As a user I want to delete a folder
        Given I go in the main directory
        And for table view I select 'TEST_FOLDER_007' using CTRL
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete folder
        Then 'TEST_FOLDER_007' disappeared

    Scenario: I logout from site
        When I logout from site