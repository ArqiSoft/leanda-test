@start-all-tests @013 @web-importer @suite-4 @unstable
Feature: As an Leanda user I want to import web page:

  Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

  Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

  Scenario: As a user I want to create a folder (and the new folder appears only once )
    Given Delete file or folder 'TEST_IMPORT_WEB_PAGE' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_IMPORT_WEB_PAGE'
    And click Create button
    Then 'TEST_IMPORT_WEB_PAGE' file or folder is shown

  Scenario: As a  user I want to upload new page
    Given I go to folder 'DRAFTS/TEST_IMPORT_WEB_PAGE'
    And I open context toolbar menu and click 'Upload Web Page' folder button
    Then Import web page dialog is shown
    Then I close import web page dialog

  Scenario Outline: As a user I want to upload different web pages
    Given I go to folder 'DRAFTS/TEST_IMPORT_WEB_PAGE'
    And I open context toolbar menu and click 'Upload Web Page' folder button
    When I put web page <url> to dialog
    When I check that url is valid
    Then I import web page
    Examples:
      | url                                          |
      | 'https://angular.io/api/core/InjectionToken' |
      | 'https://material.angular.io/components' |

  Scenario Outline: As a user I want to explore imported pages
    Given I go to folder 'DRAFTS/TEST_IMPORT_WEB_PAGE'
    Then <url> file or folder is shown
    Examples:
      | url |
      | 'Angular Docs' |
      | 'Angular Material' |
    
  Scenario: As a  user I want to delete a folder
    Given I go in the main directory
    Given I select file or folder 'TEST_IMPORT_WEB_PAGE'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder

  Scenario: I logout from site
    When I logout from site
