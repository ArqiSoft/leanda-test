@abcdef @unstable
Feature: As a OSDR user I want to export files

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    Then login as a test user
    Then I click on Organize panel

Scenario Outline: As a user I want to export file using toolbar context menu
    Given I select file or folder '125_11Mos.cdx'
    And I open context toolbar menu and choose menu element 'Export File' and subMenu '<Export Types>'
    And I can see export dialog
    And I click select all button
    And I uncheck first two items
    And I click reverse selection button
    And I click export
    And I refresh browser    
    Examples:
       | Export Types  |
       | Export to SDF |
       | Export to CSV |

Scenario: As a user I want collapse sidebar menu 
    When I want to open file '125_11Mos.cdx'
    Then I click button to collapse menu


Scenario Outline: As a user I want to exporte files from collapsed panel
    And I click collapsed menu file button and export '<File Format>' file
    And click Export button
    Examples:
       | File Format  |
       | CSV          |
       | SDF          |
       | SPL          |

Scenario: As a user I want to check download exported files
    Given I select file or folder '125_11Mos.cdx'
    And I open context toolbar menu and choose menu element 'Export File' and subMenu 'Export to SDF'
    And I can see export dialog
    And I click export
    And I click on notification panel icon.
    And I can see 'Export Finished' notification
    And I download first available export file
#    And Delete file or folder '125_11Mos.cdx' if it exist



Scenario: I logout from site
    When I logout from site