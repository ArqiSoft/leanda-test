@start-all-tests @005 @machine-learning @suite-2 @unstable
Feature: As a Leanda user I want to use ML functionality

  Scenario: I login in the application as a test user
    Given I go to the site
    When go to login page
    When login as a test user

  Scenario: As a  user I want to navigate to browser
    When I click on Organize panel
    Then I should see root folder DRAFTS browser

  Scenario: As a  user I want to create a folder (and the new folder appears only once )
    Given I go in the main directory
    And Delete file or folder 'TEST_ML_FILES' if it exist
    And I click create button on toolbar
    And enter valid folder name 'TEST_ML_FILES'
    And click Create button
    Then 'TEST_ML_FILES' file or folder is shown

  Scenario: As a user I want to upload a Chemical files
    Given I go to folder 'DRAFTS/TEST_ML_FILES'
    When  I want to upload file from '../../Data/SDF/test_sdf_file.sdf' 'test_sdf_file.sdf' directory
    Then  I am waiting for SDF to be uploaded
    And  I check that 'test_sdf_file.sdf' file is added

  Scenario: I want to create a model from *.SDF file
    Given I use right click on 'test_sdf_file.sdf' to call context menu and choose menu element 'Machine Learning' and subMenu 'Train Model'
    And I can see train model dialog
    And I select 'Classification' model type
    And I click on select folder icon
    And I click create new folder in folder picker
    And I enter new folder name 'ML-TRAIN' in folder picker
    Then I click submit folder creation button in folder picker 
    Then I select 'ML-TRAIN' in folder picker
    Then I click Select Folder button in folder picker
    And I click next button to go to second step

  Scenario: I want to expand advance parameteres
    Given I select option to set parameters manually
    Then I can see that advanced parameters available

  Scenario: I want to select parameters
      And I select standard scaling option
      And I select training parameter as 'Soluble'
      And I am setting sub sample size to '1'
      And I am setting test data size to '0.2'
      And I am setting K-Fold value to '4'

  Scenario: I want to set parameters for first Fingerprint
      Given I choose 'first' fingerprint type as 'Extended-Connectivity Fingerprints binary'
      And I choose 'first' fingerprint size as '2048'
      And I set fingerprint radius to '3'
      And I add fingerprint

  Scenario: I want to set parameters for second Fingerprints
      Given I choose 'second' fingerprint type as 'AVALON fingerprints'
      And I choose 'second' fingerprint size as '512'
      And I add fingerprint

  Scenario: I want to set parameters for third Fingerprints
      Given I choose 'third' fingerprint type as 'Can2Enum fingerprint'
      And I click next button to go to the third step

  Scenario: I want to choose training method
      Given I select 'Naive Bayes' method
      And I submit model training
      And I am waiting for model to be created
      And I am waiting for model to be created
      And I go to folder 'DRAFTS/TEST_ML_FILES/ML-TRAIN' 
      Then 'Naive Bayes' file or folder is shown
      Then 'Naive_Bayes_report.pdf' file or folder is shown
      Then 'radar_plot.png' file or folder is shown

  Scenario Outline: As a user I want to check files that were created
    Given I go in the main directory
    And I go to folder 'DRAFTS/TEST_ML_FILES/ML-TRAIN/Naive Bayes'
    When  I want to open file <filename>
    Then I check that preview of file type <type> exist
    Examples:
      | filename                        | type |
      | 'Naive Bayes_test_sdf_file.csv' | 'CSV' |
      | 'Naive_Bayes_QMRF_report.pdf'   | 'PDF' |
      | 'Naive_Bayes_ROC_plot.png'      | 'PNG' |
      | 'Naive_Bayes_confusion.png'     | 'PNG' |
      | 'Naive_Bayes_report.pdf'        | 'PDF' |
      | 'radar_plot.png'                | 'PNG' |
      
  @unstable    
  Scenario: As a user I want to open ML Predict Properties View 
    Given I go in the main directory
    When  I go to folder 'DRAFTS/TEST_ML_FILES'
    And I use right click on 'test_sdf_file.sdf' to call context menu and choose menu element 'Machine Learning' and subMenu 'Predict Properties'
  
  @unstable 
  Scenario: As a user I want to select model and start predicting proerties
    When I choose Model in predict dialog 'Naive Bayes'
    And I click on select folder icon
    And I click create new folder in folder picker
    And I enter new folder name 'ML-PREDICT' in folder picker
    Then I click submit folder creation button in folder picker 
    Then I select 'ML-PREDICT' in folder picker
    Then I click Select Folder button in folder picker
    # And I choose Primary Field in predict dialog
    And I click Predict button in predict dialog
  
  @unstable
  Scenario: As a user I wan to check files that were created by prediction
    When  I go to folder 'DRAFTS/TEST_ML_FILES/ML-PREDICT'
    And  I want to open first record
    Then I check that preview of file type 'CSV' exist

  Scenario: I logout from site
    When I logout from site