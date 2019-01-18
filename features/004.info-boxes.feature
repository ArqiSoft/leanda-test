@start-all-tests @004 @record-view-info-boxes-data @suite-1
Feature: As a Leanda user I want to check if there any properties in file/record info-boxes:

Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

  Scenario: As a user I want to create folder for my files
    Given Delete file or folder 'TEST_FOLDER_004' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_004'
    And click Create button
    Then 'TEST_FOLDER_004' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_004'

Scenario: As a user I want to upload a file to folder       
    Given Delete file or folder '3d-chiral.mol' if it exist
    When I want to upload file from '../../Data/MOL/3d-chiral.mol' '3d-chiral.mol' directory
    Then I check that '3d-chiral.mol' file is added

Scenario: As a user I want to open recrod in MOL file
    When I want to open file '3d-chiral.mol'
    And I want to open first record

Scenario Outline: As a user I want to check if the properties in record are correct
    Given I check if key <propertyName> is presented
    And I check if value <propertyValue> is presented
    Examples: 
        | n   | propertyName          | propertyValue |
        | '0' | 'InChI'               | 'InChI=1S/C2H7NO/c1-2(3)4/h2,4H,3H2,1H3/t2-/m0/s1' |
        | '1' | 'InChIKey'            | 'UJPKMTDFFUTLGM-REOHCLBHSA-N' |
        | '4' | 'SMILES'              | 'C[C@@H](N)O' |
        | '5' | 'MOLECULAR_FORMULA'   | 'C2 H7 N O' |
        | '6' | 'MOLECULAR_WEIGHT'    | '61.083080530166626' |
        | '7' | 'MONOISOTOPIC_MASS'   | '61.05276381969452' |
        | '8' | 'MOST_ABUNDANT_MASS'  | '61.05276381969452' |

Scenario: As a user I want to delete uploaded files
    Given I go in the main directory
    And Delete file or folder 'TEST_FOLDER_004' if it exist

Scenario: I logout from site
    When I logout from site