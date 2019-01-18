@start-all-tests @015 @export-files  @suite-4
Feature: As a Leanda user I want to export files

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create a folder (and the new folder appears only once )
    Given Delete file or folder 'EXPORT_FILES' if it exist
    And I click create button on toolbar
    And enter valid folder name 'EXPORT_FILES'
    And click Create button
    Then 'EXPORT_FILES' file or folder is shown
    And I go to folder 'DRAFTS/EXPORT_FILES'

Scenario: As a user I want to upload new file
    Given Delete file or folder '125_11Mos.cdx' if it exist
    When I want to upload file from '../../Data/CDX/125_11Mos.cdx' '125_11Mos.cdx' directory
    And I check that '125_11Mos.cdx' file is added

Scenario: As a user I want to export file using toolbar context menu
    Given I select file or folder '125_11Mos.cdx'
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

Scenario: As a user I want to export file using context-menu
    Given I use right click on '125_11Mos.cdx' to call context menu and choose menu element 'Export File' and subMenu 'Export to CSV'
    And I click select all button
    And I click export

Scenario: As a user I want to check download exported files
    Given I click on notification panel icon
    And I can see 'Export Finished' notification
    And I close notification panel
    And I go to folder 'DRAFTS/EXPORT_FILES'
    And Delete file or folder '125_11Mos.cdx' if it exist    
   # And I download first available export file

Scenario: I want to clean up
    Given I go in the main directory
    And I select file or folder 'EXPORT_FILES'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'EXPORT_FILES' disappeared
    
Scenario: I logout from site
    When I logout from site