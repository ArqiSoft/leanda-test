@start-all-tests @017 @single-structure-prediction @unstable
Feature: As a user I want to use single structure prediction

  @ssp-smoke
  Scenario: I go to prediction page
    Given I go to the site
    When I go to the ssp page

  @ssp-smoke
  Scenario: I draw element in ketcher
    Given I go to predict page with 'CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C' data
    Then I go to page to select properties

  Scenario: As a user I want to select properties
    Given I select checkbox group 'Biological and Medical'

  @ssp-smoke @smoke
  Scenario Outline: As a user I want to select predction property
    Given I select checkbox <property>
    Examples:
      | property                           |
      | '48 hour T. pyriformis IGC50'      |
      | 'Fish Biotransformation Half-life' |
      | 'Boiling point'                    |

  @ssp-smoke
  Scenario: I go to predict page
    Given I go to page to Predict
    Then I am waiting for predict result

  @ssp-smoke @smoke
  Scenario Outline: As a user I want to check prediction result for Smoke Test
    # Can have up to 6 models, currently 4
    Given I am checking predict property <property> <dataset> <consensus> <DNN> <RF> <XGBoost> <kNN> result
    Examples:
      | property                           | dataset                                                                                                            | consensus         | DNN               | RF                | XGBoost           | kNN               |
      | '48 hour T. pyriformis IGC50'      | 'Tetrahymena pyriformis 50 percent growth inhibition concentration (IGC50) data from Schultz and coworkers papers' | '4.60 log(mol/L)' | '4.52 log(mol/L)' | '5.02 log(mol/L)' | '4.87 log(mol/L)' | '4.01 log(mol/L)' |
      | 'Fish Biotransformation Half-life' | 'Fish Biotransformation Half-life data from PHYSPROP'                                                              | '0.43 log (days)' | '0.51 log (days)' | '0.35 log (days)' | '0.37 log (days)' | '0.48 log (days)' |
      | 'Boiling point'                    | 'Boiling point dataset from PHYSPROP (OPERA)'                                                                      | '332.48 ℃'        | '358.28 ℃'        | '365.72 ℃'        | '370.38 ℃'        | '235.55 ℃'        |

  Scenario Outline: As a user I want to check prediction result - Biological and Medical
    # Can have up to 6 models, currently 4
    Given I am checking predict property <property> <dataset> <consensus> <DNN> <RF> <XGBoost> <kNN> result
    Examples:
      | property                      | dataset                                                                                                            | consensus            | DNN                  | RF                   | XGBoost              | kNN                  |
      | '48 hour T. pyriformis IGC50' | 'Tetrahymena pyriformis 50 percent growth inhibition concentration (IGC50) data from Schultz and coworkers papers' | '4.60 log(mol/L)'    | '4.52 log(mol/L)'    | '5.02 log(mol/L)'    | '4.87 log(mol/L)'    | '4.01 log(mol/L)'    |
      | '96 hour fathead minnow LC50' | '96-hour fathead minnow 50 percent lethal concentration (LC50) data from ECOTOX'                                   | '4.93 log10 (mol/L)' | '5.17 log10 (mol/L)' | '5.29 log10 (mol/L)' | '4.60 log10 (mol/L)' | '4.63 log10 (mol/L)' |
      | 'Oral rat LD50'               | 'Oral rat 50 percent lethal dose (LD50) data from ChemIDplus'                                                      | '2.70 log10 (mol/L)' | '2.09 log10 (mol/L)' | '3.23 log10 (mol/L)' | '2.95 log10 (mol/L)' | '2.51 log10 (mol/L)' |
      | 'Bioconcentration factor'     | 'BioConcentration Factor (logBCF) dataset from PHYSPROP (OPERA)'                                                   | '2.63 log(mol/L)'    | '2.42 log(mol/L)'    | '3.03 log(mol/L)'    | '2.72 log(mol/L)'    | '2.35 log(mol/L)'    |
      | 'Bioconcentration factor'     | 'BioConcentration Factor (logBCF) data from PHYSPROP (TEST)'                                                       | '2.34 log(mol/L)'    | '2.77 log(mol/L)'    | '2.12 log(mol/L)'    | '2.18 log(mol/L)'    | '2.28 log(mol/L)'    |
      | 'Biological half-life'        | 'Biological half-life dataset from PHYSPROP (OPERA)'                                                               | '1.84 log (days)'    | '1.54 log (days)'    | '2.04 log (days)'    | '1.92 log (days)'    | ''                   |

  Scenario: I start new prediction
    Given I start new prediction
    Then I go to page to select properties

  Scenario: As a user I want to select properties
    Given I select checkbox group 'Ecological'

  Scenario: I go to predict page
    Given I go to page to Predict
    Then I am waiting for predict result

  Scenario Outline: As a user I want to check prediction result - Ecological
    Given I am checking predict property <property> <dataset> <consensus> <DNN> <RF> <XGBoost> <kNN> result
    Examples:
      | property                           | dataset                                                     | consensus           | DNN                 | RF                  | XGBoost             | kNN                 |
      | 'Fish Biotransformation Half-life' | 'Fish Biotransformation Half-life data from PHYSPROP'       | '0.43 log (days)'   | '0.51 log (days)'   | '0.35 log (days)'   | '0.37 log (days)'   | '0.48 log (days)'   |
      | 'Soil Absorption Coefficient'      | 'Soil Adsorption Coefficient dataset from PHYSPROP (OPERA)' | '3.88 Log10 (L/kg)' | '4.14 Log10 (L/kg)' | '4.57 Log10 (L/kg)' | '4.55 Log10 (L/kg)' | '2.26 Log10 (L/kg)' |

  Scenario: I start new prediction
    Given I start new prediction
    Then I go to page to select properties

  Scenario: As a user I want to select properties
    Given I select checkbox group 'Physical and Chemical'

  Scenario: I go to predict page
    Given I go to page to Predict
    Then I am waiting for predict result

  Scenario Outline: As a user I want to check prediction result - Physical and Chemical
    Given I am checking predict property <property> <dataset> <consensus> <DNN> <RF> <XGBoost> <kNN> result
    Examples:
      | property               | dataset                                                                    | consensus                 | DNN                       | RF                     | XGBoost                | kNN                    |
      | 'Boiling point'        | 'Boiling point dataset from PHYSPROP (OPERA)'                              | '332.48 ℃'                | '358.28 ℃'                | '365.72 ℃'             | '370.38 ℃'             | '235.55 ℃'             |
      | 'Boiling point'        | 'Boiling point dataset from PHYSPROP (TEST)'                               | '327.11 ℃'                | '360.99 ℃'                | '336.17 ℃'             | '349.79 ℃'             | '261.0 ℃'              |
      | 'Henry's Law Constant' | 'Henry's Law Constant (HL) data from PHYSPROP'                             | '-0.06 log (atm-m3/mole)' | '-0.06 log (atm-m3/mole)' | ''                     | ''                     | ''                     |
      | 'LogP'                 | 'Octanol/Water Partition Coefficient (logP) dataset from PHYSPROP (OPERA)' | '5.66'                    | '6.26'                    | '6.50'                 | '6.33'                 | '3.54'                 |
      | 'Melting point'        | 'Melting point dataset from PHYSPROP (OPERA)'                              | '149.35 ℃'                | '157.01 ℃'                | '143.29 ℃'             | '140.03 ℃'             | '157.08 ℃'             |
      | 'Melting point'        | 'Melting point dataset from PHYSPROP (TEST)'                               | '139.24 ℃'                | '126.23 ℃'                | '143.69 ℃'             | '144.85 ℃'             | '142.20 ℃'             |
      | 'Water solubility'     | 'Water solubility dataset from PHYSPROP (OPERA)'                           | '-6.19 Log10(moles/L)'    | '-6.47 Log10(moles/L)'    | '-6.85 Log10(moles/L)' | '-6.83 Log10(moles/L)' | '-4.63 Log10(moles/L)' |
      | 'Water solubility'     | 'Water solubility dataset from PHYSPROP (TEST)'                            | '-6.05 log10(moles/L)'    | ''                        | '-6.63 Log10(moles/L)' | '-6.69 Log10(moles/L)' | '-4.84 Log10(moles/L)' |
      | 'Vapor pressure'       | 'Vapor pressure dataset from PHYSPROP (TEST)'                              | '-5.37 log10(mm/Hg)'      | '-5.38 log10(mm/Hg)'      | '-7.06 log10(mm/Hg)'   | '-7.85 log10(mm/Hg)'   | '-1.19 log10(mm/Hg)'   |
      | 'Vapor pressure'       | 'Vapor pressure from PHYSPROP (OPERA)'                                     | '-5.55 log10(mm/Hg)'      | '-6.60 log10(mm/Hg)'      | '-7.03 log10(mm/Hg)'   | '-7.75 log10(mm/Hg)'   | '-0.81 log10(mm/Hg)'   |
