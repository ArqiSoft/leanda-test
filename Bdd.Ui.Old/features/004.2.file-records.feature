@smoke
@test0042
Feature: As an OSDR user 
         I could use different views of records in chemical files
         and set properties of record previews    

Scenario: I login in the application as a test user
     Given I go to the site
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page

Scenario: I navigate to TEST_FILES folder 
    When I click Upload and Organize panel
    Then I should see browser window
    And  Check if "TEST_FILES" folder already exist and create if not
    When I select folder "TEST_FILES"
    And  open the folder
    Then I am inside the folder "TEST_FILES" directory

Scenario: I navigate to TEST_CHEMICAL_FILES folder
    Given I am inside the folder "TEST_FILES" directory
    And  Check if "TEST_CHEMICAL_FILES" folder already exist and create if not
    When I select folder "TEST_CHEMICAL_FILES"
    And  open the folder
    Then I am inside the folder "TEST_CHEMICAL_FILES" directory

Scenario Outline: As a user I want to upload a Chemical files
    Given I am inside the folder "TEST_CHEMICAL_FILES" directory
    When  I want to upload file from <path> directory
    Then  I check that <filename> file is added
      Examples:
         | type | path         | filename|
         | "CDX"  | "../../../Data/CDX/10000_10Mos.cdx" |"10000_10Mos.cdx"|

Scenario: I want to open a chemical file 
    Given I am inside the folder "TEST_CHEMICAL_FILES" directory
    When  I select "10000_10Mos.cdx" file 
    And   I open "10000_10Mos.cdx" file
    Then I see file properties section
    Then  I see file records section

Scenario: I want to see file records in grid-view
    Given I am inside the file "10000_10Mos.cdx"
    When  I select display file records as grid  
    Then  records are presented in a grid view

Scenario: I want to see file records in tile-view
    Given I am inside the file "10000_10Mos.cdx"
    When  I select display file records as tiles  
    Then  records are presented in a tiles view

Scenario Outline: I want to set records properties preview
    When  I select display file records as grid  
    Then  records are presented in a grid view
    When I select first record
    And  I click properties settings
    When  I change Settings properties to <properties> 
    Then  There are <ColumnsInTable> for records properties shown 
     Examples:
         | properties       | ColumnsInTable|
         | UnselectAll      |       2       |
         | SelectAll        |       11      |
         | "InChIKey"       |       3       |
         | "InChIKey,MF"    |       4       |
         | "InChI,InChIKey,MAM"|    5       |

Scenario: As a user I want to delete test folder
        Given I go in the main directory
        And I select folder "TEST_FILES"
        And click Delete button
        And confirm deleting
        Then "TEST_FILES" folder is not showing any more

 Scenario: Check status by-dafault (now there is no such status)
 Scenario: Check Invert button 
 Scenario: Check different files properties 
 Scenario: Check that in a grid-view for files with more than 1 record, properties should be sortable


