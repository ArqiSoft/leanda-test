@start-all-tests @009 @folder-file-input-field-validator @suite-3 @unstable
Feature: As a OSDR user I want check if folder/file names are valid:

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create folder for my files
    And Delete file or folder 'TEST_FOLDER_009' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_009'
    And click Create button
    Then 'TEST_FOLDER_009' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_009'

Scenario: As a user I want to create a folder
    Given Delete file or folder 'TEST_FOLDER_009_1' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_009_1'
    And click Create button
    Then 'TEST_FOLDER_009_1' file or folder is shown
    And I click create button on toolbar
        
Scenario Outline: As a user I check my new folder name is valid
    And enter valid folder name <title>
    And check if folder name <title> is valid or invalid
    Then I delete new folder name create folder dialog
    Examples: 
        |title|
        |'TEST_FOLDER_009_1_/'| 
        |'TEST_FOLDER_009_1_\'|
        |'TEST_FOLDER_009_1_:'|
        |'TEST_FOLDER_009_1_*'|
        |'TEST_FOLDER_009_1_?'|
        |'TEST_FOLDER_009_1_​"'|
        |'TEST_FOLDER_009_1_<'|
        |'TEST_FOLDER_009_1_>'|
        |'TEST_FOLDER_009_1_\|'|
        |'TEST_FOLDER_009_1_.'|
        |'TEST_FOLDER_009_1_. '|
        |'/\\:*?"<> &\|.'|
        |'CON'|
        |'PRN'|
        |'AUX'|
        |'NUL'|
        |'COM1'|
        |'COM2'|
        |'COM3'|
        |'COM4'|
        |'COM5'|
        |'COM6'|
        |'COM7'|
        |'COM8'|
        |'COM9'|
        |'LPT1'|
        |'LPT2'|
        |'LPT3'|
        |'LPT4'|
        |'LPT5'|
        |'LPT6'|
        |'LPT7'|
        |'LPT8'|
        |'LPT9'|

Scenario: As a user I close create folder dialog and choose another directory
    Given I press cancel
    And I select file or folder 'TEST_FOLDER_009_1'
    And I open context toolbar menu and click 'Rename' folder button

Scenario Outline: As a user I want to give new name for existing folder and check if it is valid 
    And remove old folder name if needed
    And I set new invalid folder name <title>
    And I check if <title> is valid or not
    And remove old folder name if needed
    Examples: 
        |title|
        |'TEST_FOLDER_009_1_/'| 
        |'TEST_FOLDER_009_1_\'|
        |'TEST_FOLDER_009_1_:'|
        |'TEST_FOLDER_009_1_*'|
        |'TEST_FOLDER_009_1_?'|
        |'TEST_FOLDER_009_1_​"'|
        |'TEST_FOLDER_009_1_<'|
        |'TEST_FOLDER_009_1_>'|
        |'TEST_FOLDER_009_1_\|'|
        |'TEST_FOLDER_009_1_.'|
        |'TEST_FOLDER_009_1_. '|
        |'/\\:*?"<> &\|.'|
        |'CON'|
        |'PRN'|
        |'AUX'|
        |'NUL'|
        |'COM1'|
        |'COM2'|
        |'COM3'|
        |'COM4'|
        |'COM5'|
        |'COM6'|
        |'COM7'|
        |'COM8'|
        |'COM9'|
        |'LPT1'|
        |'LPT2'|
        |'LPT3'|
        |'LPT4'|
        |'LPT5'|
        |'LPT6'|
        |'LPT7'|
        |'LPT8'|
        |'LPT9'|

Scenario: As a user I close create folder dialog and choose another directory
    Given I click on cancel button
    And I open context toolbar menu and click 'Move' folder button
    And I click create new folder button in move dialog

Scenario Outline: As a user I want to create folder from move menu and check if it is valid 
    And I enter test folder name <title> in input field
    And I check this folder name <title> is invalid
    And I clear input field for new folder in move dialog
    Examples: 
        |title|
        |'TEST_FOLDER_009_1_/'| 
        |'TEST_FOLDER_009_1_\'|
        |'TEST_FOLDER_009_1_:'|
        |'TEST_FOLDER_009_1_*'|
        |'TEST_FOLDER_009_1_?'|
        |'TEST_FOLDER_009_1_​"'|
        |'TEST_FOLDER_009_1_<'|
        |'TEST_FOLDER_009_1_>'|
        |'TEST_FOLDER_009_1_\|'|
        |'TEST_FOLDER_009_1_.'|
        |'TEST_FOLDER_009_1_. '|
        |'/\\:*?"<> &\|.'|
        |'CON'|
        |'PRN'|
        |'AUX'|
        |'NUL'|
        |'COM1'|
        |'COM2'|
        |'COM3'|
        |'COM4'|
        |'COM5'|
        |'COM6'|
        |'COM7'|
        |'COM8'|
        |'COM9'|
        |'LPT1'|
        |'LPT2'|
        |'LPT3'|
        |'LPT4'|
        |'LPT5'|
        |'LPT6'|
        |'LPT7'|
        |'LPT8'|
        |'LPT9'|

Scenario: As a user I want to close dialog
    Then I close move dialog
    
Scenario: I want to clean up
    Given I go in the main directory
    And I select file or folder 'TEST_FOLDER_009'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_FOLDER_009' disappeared

Scenario: I logout from site
    When I logout from site