@start-all-tests @010 @file-download @suite-3
Feature: As a Leanda user I want to download files in different ways:

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create folder for my files
    Given I switch to tile view
    And Delete file or folder 'TEST_FOLDER_010' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_010'
    And click Create button
    Then 'TEST_FOLDER_010' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_010'

Scenario Outline: As a user I want to remove existing files if exist
    Given Delete file or folder <file_name> if it exist
    Examples: 
        | file_name |
        | '125_11Mos' |
        | 'absurd.jpg' |

Scenario Outline: As a user I want to upload a Chemical files
    When  I want to upload file from <path> <filename> directory
    Then  I check that <filename> file is added
    Examples:
    | type | path         | filename|
    | 'SDF'  | '../../Data/SDF/HMDB-2-records.sdf' |'HMDB-2-records.sdf'|
    | 'CSV'  | '../../Data/CDX/125_11Mos.cdx' |'125_11Mos.cdx'|
    | 'JPG'  | '../../Data/Images/absurd.jpg' |'absurd.jpg'|

Scenario: As a user I want to download file by using context toolbar menu
    Given for tile view I select 'HMDB-2-records.sdf' using CTRL
    And I open context toolbar menu and click 'Download' folder button

Scenario: As a user I want to download file by using item more options button
    Given I choose 'absurd.jpg' folder and click on more actions button and click 'Download' folder button
    And Delete file or folder 'absurd.jpg' if it exist

Scenario: As a user I want to download file from file page menu
    When I want to open file '125_11Mos'
    Then I download file '125_11Mos'
    And I go to folder 'DRAFTS/TEST_FOLDER_010'

Scenario Outline: As a user I want to remove existing files if exist
    Given Delete file or folder <file_name> if it exist
    Examples: 
        | file_name |
        | 'HMDB-2-records.sdf'|
        | '125_11Mos' |
        | 'absurd.jpg' |

Scenario: As a user I want to delete test folder from DRAFTS
    Given I go in the main directory
    And I select file or folder 'TEST_FOLDER_010'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_FOLDER_010' disappeared

Scenario: I logout from site
    When I logout from site
