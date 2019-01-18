@start-all-tests @016 @notifications-and-panel  @suite-4
Feature: As a Leanda user I want to see notifications and interact with them

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create a folder
    Given Delete file or folder 'TEST_NOTIFICATIONS' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_NOTIFICATIONS'
    And click Create button
    Then 'TEST_NOTIFICATIONS' file or folder is shown
    And I go to folder 'DRAFTS/TEST_NOTIFICATIONS'

Scenario: As a user I want to open notification panel and see my notifications
    Given I click on notification panel icon
    Then I can see notification panel
    And I can see notifications in notification panel

Scenario: As a user I want to interact with panel and notifications
    Given I close first notification
    And I click close all notifications button
    And I close notification panel

# Scenario: As a user I want to stop and restart file upload from notification panel
#     When I want to upload file from '../../Data/PDF/IIM_2016053115330515.pdf' 'IIM_2016053115330515.pdf' directory
#     And I stop file upload from notification panel
#     And I restart file upload from notification panel
#     And I click close all notifications button    
#     And I close notification panel

Scenario: I want to clean up
    Given I go in the main directory
    And I select file or folder 'TEST_NOTIFICATIONS'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_NOTIFICATIONS' disappeared

Scenario: I logout from site
    When I logout from site 