@start-all-tests @008 @context-menu @suite-2 @unstable
Feature: As a Leanda user I want to perform actions using context menu:

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create folder for my files
    Given I switch to tile view
    And Delete file or folder 'TEST_FOLDER_008' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_008'
    And click Create button
    Then 'TEST_FOLDER_008' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_008'

Scenario: As a user I want to create TEST_FOLDER_008_1
    Given Delete file or folder 'TEST_FOLDER_008_1' if it exist
    And I use right click on free space to call context menu and click 'Create Folder' folder button
    And enter valid folder name 'TEST_FOLDER_008_1'
    And click Create button
        
Scenario: As a user I want to put multiple files in another folder calling context menu by right click
    Given I use right click on 'TEST_FOLDER_008_1' to call context menu and click 'Move' folder button 
    Then I close move dialog

Scenario: As a user I want to rename folder by clicking on more options context menu in item footer 
    Given I use right click on 'TEST_FOLDER_008_1' to call context menu and click 'Rename' folder button
    And enter new folder name 'TEST_FOLDER_008_1' to 'TEST_FOLDER_008_2' and click ENTER button to save
    Then I check that folder name was changed to 'TEST_FOLDER_008_2'

Scenario: As a user I want to delete folders & files using more options context menu by right click
    Given I use right click on 'TEST_FOLDER_008_2' to call context menu and click 'Delete' folder button
    And confirm delete files & folders        

Scenario: As a user I want to delete a folder
    Given I go in the main directory
    And I select file or folder 'TEST_FOLDER_008'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_FOLDER_008' disappeared

Scenario: I logout from site
    Given I go in the main directory
    When I logout from site