@prod-smoke
Feature: As a OSDR user I want to login to site and than logout 

Scenario: I login in the application as a test user
  Given I go to the site
  When go to login page
  # When login as a test user
  When I login to PROD
  Then I should see 'E2E Test' on the Home page

Scenario: As a user I want to navigate to browser
  When I click on Organize panel
  Then I should see root folder DRAFTS browser

Scenario: As a user I want to create folder for my files
  Given Delete file or folder 'TEST_FOLDER_PROD' if it exist
  And I click create button on toolbar
  And enter valid folder name 'TEST_FOLDER_PROD'
  And click Create button
  Then 'TEST_FOLDER_PROD' file or folder is shown
  And I go to folder 'DRAFTS/TEST_FOLDER_PROD'

Scenario Outline: As a user I want to upload a Chemical files
  When I want to upload file from <path> <filename> directory
  Then I check that <filename> file is added
  Examples:
    | type  | path                                                              | filename                                        |
    | 'PDF' | '../../Data/PDF/DataScienceJournal-min.pdf'                    | 'DataScienceJournal-min.pdf'                    |
    | 'SDF' | '../../Data/SDF/HMDB-2-records.sdf'                            | 'HMDB-2-records.sdf'                            |
    | 'CSV' | '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' | 'FocusSynthesis_InStock_071411_extra_short.csv' |
    | 'JPG' | '../../Data/Images/absurd.jpg'                                 | 'absurd.jpg'                                    |
    | 'GIF' | '../../Data/Images/optmedcut.gif'                              | 'optmedcut.gif'                                 |

Scenario Outline: As a user I want to open uploaded file
  When I want to open file <filename>
  Then I check that preview of file type <type> exist
  Then I go to folder 'DRAFTS/TEST_FOLDER_PROD'
  Examples:
    | type  | path                                                              | filename                                        |
    | 'JPG' | '../../Data/Images/absurd.jpg'                                 | 'absurd.jpg'                                    |
    | 'GIF' | '../../Data/Images/optmedcut.gif'                              | 'optmedcut.gif'                                 |
    | 'PDF' | '../../Data/PDF/DataScienceJournal-min.pdf'                    | 'DataScienceJournal-min.pdf'                    |
    | 'CSV' | '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' | 'FocusSynthesis_InStock_071411_extra_short.csv' |

Scenario: As a user I want to upload new file
  Given Delete file or folder '1357_8Mos.cdx' if it exist
  When I want to upload file from '../../Data/CDX/1357_8Mos.cdx' '1357_8Mos.cdx' directory
  And I check that '1357_8Mos.cdx' file is added

Scenario: As a user I want to export file using toolbar context menu
  Given I select file or folder '1357_8Mos.cdx'
  And I open context toolbar menu and choose menu element 'Export File' and subMenu 'Export to SDF'
  And I can see export dialog
  And I click select all button
  And I uncheck first two items
  And I click reverse selection button
  And I click export

Scenario: As a user I want to check if file was exported to SDF 
  Given I click on notification panel icon
  And I can see 'Export Finished' notification
  And I close first notification
  And I click close all notifications button
  And I close notification panel

Scenario: As a user I want to rename folder by clicking on more options context menu in item footer
  Given I go in the main directory
  And I use right click on 'TEST_FOLDER_PROD' to call context menu and click 'Rename' folder button
  And enter new folder name 'TEST_FOLDER_PROD' to 'TEST_FOLDER_RENAMED' and click ENTER button to save
  Then I check that folder name was changed to 'TEST_FOLDER_RENAMED'

Scenario: As a  user I want to delete a folder
  Given I go in the main directory
  And Delete file or folder 'TEST_FOLDER_RENAMED' if it exist
  Then 'TEST_FOLDER_RENAMED' disappeared

Scenario: As a user I want to open notification panel and see my notifications
  Given I click on notification panel icon
  Then I can see notification panel
  And I can see notifications in notification panel

Scenario: As a user I want to interact with panel and notifications
  Given I close first notification
  And I click close all notifications button
  And I close notification panel

Scenario: I logout from site
  When I logout from site
  Then I am on logout page