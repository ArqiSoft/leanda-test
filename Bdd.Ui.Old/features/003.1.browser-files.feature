@smoke
Feature: As an OSDR user I want to browse my Drafts and manipulate the files

# Files (use a MOL file first): 
# * can upload a file from /data folder, and the uploaded file appears once (use a new folder, as duplicate names are generally allowed) 
# * can rename a file 
# * can delete a file 
# * can open a file 
# * download a file

# not done: 
# * can move a file 

@test0031
 Scenario: I login in the application as a test user
     Given I go to the site
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page

@test0031
Scenario: I navigate to TEST_FILES folder 
    When I click Upload and Organize panel
    Then I should see browser window
    And  Check if "TEST_FILES" folder already exist and create if not
    When I select folder "TEST_FILES"
    And  open the folder
    Then I am inside the folder "TEST_FILES" directory

@test0031
Scenario: As a user I want to upload a Word file
    Given I am inside the folder "TEST_FILES" directory
    When  I want to upload "../../../Data/DOC/Hexahedron_kk_kc_kk.docx" file
    Then  I check that "Hexahedron_kk_kc_kk.docx" file is shown

@test0031
    Scenario: As a user I want to upload a Excel file
    Given I am inside the folder "TEST_FILES" directory
    When  I want to upload "../../../Data/XLS/Use Cases_Planning Grant.xlsx" file
    Then  I check that "Use Cases_Planning Grant.xlsx" file is shown

@test0031
    Scenario: As a user I want to rename Excel file
    Given I am inside the folder "TEST_FILES" directory
    When I select "xlsx" file
    And click Rename button
    And rename file to "TEST_EXCEL.XLSX"
    And click outside the folder 
    Then I check that "TEST_EXCEL.XLSX" file is shown

@test0031
    Scenario: As a user I want to download a file from the folder
    Given I am inside the folder "TEST_FILES" directory
    When I select "TEST_EXCEL.XLSX" file
    And click download button
    Then "TEST_EXCEL.XLSX" file should be downloaded

@test0031
    Scenario: As a user I want to download 2 files together
    Given I am inside the folder "TEST_FILES" directory
    When I select "TEST_EXCEL.XLSX" file
    And hold SHIFT key
    And I select "Hexahedron_kk_kc_kk.docx" file
    And release SHIFT key
    And click download button
    Then ".zip" file should be downloaded

 @test0031
    Scenario: As a user I want to delete Word file
    Given I am inside the folder "TEST_FILES" directory
    When I count items at step "before deleting"
    When I select "docx" file
    And click Delete button
    And confirm deleting
    When I count items at step "after deleting"
   # Then One Word file is deleted

@test0031
    Scenario: As a user I want to open a file
    Given I am inside the folder "TEST_FILES" directory
    When I select "TEST_EXCEL.XLSX" file
    And I open "TEST_EXCEL.XLSX" file
    Then I see file properties section

@test0031
    Scenario: As a user I should be able to download open file
    Given I am inside the file "TEST_EXCEL.XLSX"
    When click download file button 
    Then "TEST_EXCEL (1).XLSX" file should be downloaded
