@smoke 
@test0041
Feature: As an OSDR user I could use different Views

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

Scenario: I  navigate to TEST_CHEMICAL_FILES folder
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
         | "MOL"  | "../../../Data/MOL/1oir.mol" |"1oir.mol"|
         | "CDX"  | "../../../Data/CDX/10000_10Mos.cdx" |"10000_10Mos.cdx"|
         | "CIF"  | "../../../Data/CIF/1100110.cif" |"1100110.cif"|

Scenario: I want to see files in grid-view
    Given I am inside the folder "TEST_CHEMICAL_FILES" directory
    When  I select display grid view 
    Then  files are presented in a grid view

Scenario: I want to see files in tile-view
    Given I am inside the folder "TEST_CHEMICAL_FILES" directory
    When  I select display tile view  
    Then  files are presented as tiles
