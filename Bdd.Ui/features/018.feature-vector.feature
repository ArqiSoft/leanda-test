@start-all-tests @018 @feature-vector-computation @unstable

Feature: As a user I want to use feature vector computation

    @fvc-smoke
    Scenario: I go to feature page
        Given I go to the site
        When I go to the feature page

    @fvc-smoke
    Scenario: I have a file to use for computation
        When I want to upload file from '../../../Data/SDF/HMDB-2-records.sdf' 'HMDB-2-records.sdf' directory

    Scenario: I want to set parameters for first Fingerprint
        Given I choose 'first' fingerprint type as 'Extended-Connectivity Fingerprints binary'
        And I choose 'first' fingerprint size as '2048'
        # '0' is the number of fingerprint set, '3' is value from drop-down
        And I choose '0' fingerprint radius as '3'
        And I add fingerprint

    Scenario: I want to set parameters for second Fingerprints
        Given I choose 'second' fingerprint type as 'AVALON fingerprints'
        And I choose 'second' fingerprint size as '512'
        And I add fingerprint

    Scenario: I want to set parameters for third Fingerprints
        Given I choose 'third' fingerprint type as 'RDKit descriptros'
        And I click 'Compute Features' button

    @fvc-smoke @smoke
    Scenario: I want to set parameters for first Fingerprint
        Given I choose 'first' fingerprint type as 'Extended-Connectivity Fingerprints binary'
        And I choose 'first' fingerprint size as '2048'
        # '0' is the number of fingerprint set, '3' is value from drop-down
        And I choose '0' fingerprint radius as '3'

    @fvc-smoke
    Scenario: I want to start computing FVC
        Given I click 'Compute Features' button

    @fvc-smoke
    Scenario: I am waiting for results
        Given I am waiting for CSV preview to appear

    @fvc-smoke
    Scenario: I want to download results
        Then I click 'Download' button

