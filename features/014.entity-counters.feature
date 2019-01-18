@start-all-tests @014 @entity-counters  @suite-4
Feature: As a Leanda user I want to check if counters are changed after processing files:

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

    Scenario Outline: As a user I want to upload a Chemical files
        When I want to upload file from <path> <filename> directory
        Then I check that <filename> file is added
        Examples:
            | type  | path                                                           | filename                                        |
            | 'DOC' | '../../Data/DOC/Chemistry_Through_ChemSpider.doc'              | 'Chemistry_Through_ChemSpider.doc'              |
            | 'SDF' | '../../Data/CIF/1100110.cif'                                   | '1100110.cif'                                   |
            | 'CSV' | '../../Data/CSV/FocusSynthesis_InStock_071411_extra_short.csv' | 'FocusSynthesis_InStock_071411_extra_short.csv' |
            | 'JPG' | '../../Data/Images/absurd.jpg'                                 | 'absurd.jpg'                                    |
            | 'JDX' | '../../Data/JDX/2-Methyl-1-Propanol.jdx'                       | '2-Methyl-1-Propanol.jdx'                       |
            | 'MOL' | '../../Data/MOL/1oir_canon.mol'                                | '1oir_canon.mol'                                |
            | 'RXN' | '../../Data/RXN/10001.rxn'                                     | '10001.rxn'                                     |
            | 'RDF' | '../../Data/RDF/ccr0401.rdf'                                   | 'ccr0401.rdf'                                   |

    Scenario Outline: As a user I check that counters were changed
        Then I check that <Entity> counter is incremented
        Examples:
            | Entity      |
            | 'Documents' |
            | 'Images'    |
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