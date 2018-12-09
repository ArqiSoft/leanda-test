@start-all-tests @014 @entity-counters  @suite-4
Feature: As a OSDR user I want to check if counters are changed after processing files:

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

Scenario: As a user I want to create a folder (and the new folder appears only once )
    Given Delete file or folder 'TEST_COUNTERS' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_COUNTERS'
    And click Create button
    Then 'TEST_COUNTERS' file or folder is shown
    And I go to folder 'DRAFTS/TEST_COUNTERS'

# Scenario Outline: As a user I want to upload different web pages
#     Given I open context toolbar menu and click 'Upload Web Page' folder button
#     When I put web page <url> to dialog
#     When I check that url is valid
#     Then I import web page
#     Examples:
#         | url                                          |
#         | 'https://angular.io/api/core/InjectionToken' |
#         | 'https://material.angular.io/components' |

# Scenario Outline: As a user I want to explore imported pages
#     Given I refresh browser
#     Then <url> file or folder is shown
#     Examples:
#         | url |
#         | 'Angular Docs' |
#         | 'Angular Material' |

Scenario Outline: As a user I check that counters were changed
    Then I check that <Entity> counter is incremented
    Examples:
        | Entity       |
        | 'Documents'  |
        | 'Images'     |
        # | 'Models'     |
        | 'Structures' |
        | 'Crystals'   |
        | 'Reactions'  |
        | 'Spectra'    |
        | 'Datasets'   |
        # | 'Webpages'   |

Scenario: As a user I want to delete folder
    Given I go in the main directory
    And I select file or folder 'TEST_COUNTERS'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_COUNTERS' disappeared

Scenario: I logout from site
    When I logout from site