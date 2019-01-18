@start-all-tests @003 @actions-with-folders @suite-1
Feature: As an Leanda user I want to manage my folders:

  Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

  Scenario: As a  user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

  Scenario: As a user I want to create folder for my files
    Given Delete file or folder 'TEST_FOLDER_003' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_003'
    And click Create button
    Then 'TEST_FOLDER_003' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_003'

  Scenario Outline: As a user I want to delete folders
    Given Delete file or folder <folderName> if it exist
    Examples:
    | folderName |
    | 'TEST_FOLDER_003_1' |
    | 'TEST_FOLDER_003_2' |
    | 'TEST_FOLDER_003_3' |
    | 'TEST_FOLDER_003_4' |
 
  Scenario Outline: As a user I want to create a folders
    Given I click create button on toolbar
    And enter valid folder name <name>
    And click Create button
    Then <name> file or folder is shown
    Examples:
    | name |
    | 'TEST_FOLDER_003_1' |
    | 'TEST_FOLDER_003_2' |
    | 'TEST_FOLDER_003_4' |
  
  Scenario: As a user I want to rename the folder
    Given I select file or folder 'TEST_FOLDER_003_1'
    And I open context toolbar menu and click 'Rename' folder button
    And enter new folder name 'TEST_FOLDER_003_1' to 'TEST_FOLDER_003_3' and click ENTER button to save
    And I check that folder name was changed to 'TEST_FOLDER_003_3'

  Scenario: As a user I want to put folder in folder
    Given I select file or folder 'TEST_FOLDER_003_2'
    And I open context toolbar menu and click 'Move' folder button
    And I select 'TEST_FOLDER_003_3' in move dialog
    And I click move button

  Scenario: As a user I want to check if folder was moved
    Given I go to folder 'DRAFTS/TEST_FOLDER_003/TEST_FOLDER_003_3'
    Then I check existing of folder 'TEST_FOLDER_003_2' in folder 'DRAFTS/TEST_FOLDER_003/TEST_FOLDER_003_3'

  Scenario: As a user I want to move the folder to another folder
    Given I select file or folder 'TEST_FOLDER_003_2'
    And I open context toolbar menu and click 'Move' folder button
    And I select 'UP Button' in move dialog
    And I click move button
    Then I go to folder 'DRAFTS/TEST_FOLDER_003'
    Then I check existing of folder 'TEST_FOLDER_003_4' in folder 'DRAFTS/TEST_FOLDER_003'

  Scenario: As a user I want to delete folders
    Given I go in the main directory
    And I select file or folder 'TEST_FOLDER_003'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_FOLDER_003' disappeared

  Scenario: I logout from site
    When I logout from site