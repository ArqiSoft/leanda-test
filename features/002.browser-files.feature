@start-all-tests @002 @actions-with-files @suite-1
Feature: As an OSDR user I want to manage my files:

  @smoke
  Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

  @smoke
  Scenario: As a user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

  Scenario: As a user I want to create folder for my files
    Given Delete file or folder 'TEST_FOLDER_002' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_002'
    And click Create button
    Then 'TEST_FOLDER_002' file or folder is shown
    And I go to folder 'DRAFTS/TEST_FOLDER_002'

  @smoke
  Scenario: As a user I want to create new folder
    Given Delete file or folder 'TEST_FOLDER_002_1' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_FOLDER_002_1'
    And click Create button
    Then 'TEST_FOLDER_002_1' file or folder is shown

  @smoke
  Scenario: I want to open folder
    When I go to folder 'DRAFTS/TEST_FOLDER_002/TEST_FOLDER_002_1'

  # @smoke
  # Scenario: As a user I want to upload Chemical files
  #   When I want to upload file from '../../Data/MOL/1oir_canon.mol' '1oir_canon.mol' directory

  Scenario Outline: As a user I want to upload a Chemical files
    When I want to upload file from <path> <filename> directory
    Then I check that <filename> file is added
    Examples:
      | type  | path                                                              | filename                                        |
      | 'MOL' | '../../Data/MOL/1oir_canon.mol'                                | '1oir_canon.mol'                                |
      | 'PDF' | '../../Data/PDF/DataScienceJournal-min.pdf'                    | 'DataScienceJournal-min.pdf'                    |
      | 'SDF' | '../../Data/SDF/HMDB-2-records.sdf'                            | 'HMDB-2-records.sdf'                            |
      | 'CSV' | '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' | 'FocusSynthesis_InStock_071411_extra_short.csv' |
      | 'JPG' | '../../Data/Images/absurd.jpg'                                 | 'absurd.jpg'                                    |
      | 'GIF' | '../../Data/Images/optmedcut.gif'                              | 'optmedcut.gif'                                 |

  @smoke
  Scenario: As a user I want to open uploaded file
    When I want to open file 'HMDB-2-records.sdf'
    When I check that file has two records
    When I check that image preview exist on file page
    Then I go to folder 'DRAFTS/TEST_FOLDER_002/TEST_FOLDER_002_1'

  Scenario Outline: As a user I want to check that file has two records and preview
    When I want to open file <filename>
    When I check that image preview exist on file page
    Then I go to folder 'DRAFTS/TEST_FOLDER_002/TEST_FOLDER_002_1'
    Examples:
      | type  | path                               | filename         |
      | 'MOL' | '../../Data/MOL/1oir_canon.mol' | '1oir_canon.mol' |

  Scenario Outline: As a user I want to open uploaded file
    When I want to open file <filename>
    Then I check that preview of file type <type> exist
    Then I go to folder 'DRAFTS/TEST_FOLDER_002/TEST_FOLDER_002_1'
    Examples:
      | type  | path                                                              | filename                                        |
      | 'JPG' | '../../Data/Images/absurd.jpg'                                 | 'absurd.jpg'                                    |
      | 'GIF' | '../../Data/Images/optmedcut.gif'                              | 'optmedcut.gif'                                 |
      | 'PDF' | '../../Data/PDF/DataScienceJournal-min.pdf'                    | 'DataScienceJournal-min.pdf'                    |
      | 'CSV' | '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' | 'FocusSynthesis_InStock_071411_extra_short.csv' |

  @smoke
  Scenario: As a  user I want to delete a folder
    Given I go in the main directory
    And I select file or folder 'TEST_FOLDER_002'
    And I open context toolbar menu and click 'Delete' folder button
    And confirm delete folder
    Then 'TEST_FOLDER_002' disappeared

  @smoke
  Scenario: I logout from site
    When I logout from site
