@start-all-tests @006 @file-folder-actions-tile-view @suite-2
Feature: As a OSDR user I want to select multiple files or folders or both in tile view:

    Scenario: I login in the application as a test user
        Given I go to the site
        When go to login page
        When login as a test user

    Scenario: As a user I want to navigate to browser
        When I click on Organize panel
        Then I should see root folder DRAFTS browser

    Scenario: As a user I want to create folder for my files
        Given Delete file or folder 'TEST_FOLDER_006' if it exist
        And I click create button on toolbar
        And enter valid folder name 'TEST_FOLDER_006'
        And click Create button
        Then 'TEST_FOLDER_006' file or folder is shown
        And I go to folder 'DRAFTS/TEST_FOLDER_006'

    Scenario Outline: As a user I want to create folder
        Given Delete file or folder <folder_name> if it exist
        And I click create button on toolbar
        And enter valid folder name <folder_name>
        And click Create button
        Examples:
            | folder_name |
            | 'TILE_VIEW_1' |
            | 'TILE_VIEW_2' |
            | 'TILE_VIEW_3' |
            | 'TILE_VIEW_TO_RENAME' |
    
    Scenario: As a user I want to upload a file to folder
        Given Delete file or folder 'FocusSynthesis_InStock_071411_extra_short.csv' if it exist
        When I want to upload file from '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' 'FocusSynthesis_InStock_071411_extra_short.csv' directory
        Then I check that 'FocusSynthesis_InStock_071411_extra_short.csv' file is added   
    
    Scenario: As a  user I want to rename the folder
        Given I select file or folder 'TILE_VIEW_TO_RENAME'
        And I open context toolbar menu and click 'Rename' folder button
        And enter new folder name 'TILE_VIEW_TO_RENAME' to 'TILE_VIEW_4' and click ENTER button to save
        Then I check that folder name was changed to 'TILE_VIEW_4'

    Scenario: As a user I want to select tile items using CTRL
        Given I select file or folder 'TILE_VIEW_1'
        And for tile view I select 'TILE_VIEW_2' using CTRL
        And for tile view I select 'TILE_VIEW_3' using CTRL
        Then I refresh browser

    Scenario: As a user I want to select tile items using SHIFT
        And for tile view I select 'TILE_VIEW_2' using CTRL
        And for tile view I select 'TILE_VIEW_4' using SHIFT
        And for tile view I select 'FocusSynthesis_InStock_071411_extra_short.csv' using CTRL

    Scenario: As a user I want to move selected items to another folder
        Given I open context toolbar menu and click 'Move' folder button
        And I select 'TILE_VIEW_1' in move dialog
        And I click move button
        Then I go in the main directory

    Scenario: As a user I want to delete previously selected items 
        Given I go to folder 'DRAFTS/TEST_FOLDER_006/TILE_VIEW_1'
        And for tile view I select 'TILE_VIEW_2' using CTRL
        And for tile view I select 'TILE_VIEW_3' using CTRL
        And for tile view I select 'FocusSynthesis_InStock_071411_extra_short.csv' using SHIFT
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete files & folders

    Scenario: As a user I want to delete a folder
        Given I go in the main directory
        And for tile view I select 'TEST_FOLDER_006' using CTRL
        And I open context toolbar menu and click 'Delete' folder button
        And confirm delete files & folders
        Then 'TEST_FOLDER_006' disappeared

    Scenario: I logout from site
        When I logout from site