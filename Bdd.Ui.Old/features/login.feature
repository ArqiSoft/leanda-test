#features/login.feature
Feature: Login in OSDR with  Protractor
    As a user  I should be able to login with valid credentials

    Scenario: Login with valid credentials
        Given I go to "https://osdr.dev.dataledger.io"
        When I am on the login page
        And I fill the username with "test1"
        And I fill the password with "qqq123"
        And I click button
        Then I should see "HELLO, TESTER 1" on the Home page

@test000
 Scenario: I login in the application as a test user
     Given I go to "https://osdr.dev.dataledger.io"
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page


     Scenario: Log Out  from the application
        When User click Log Out link 
        And  User confirm log out decision
        Then Log out confirmation should appear

    # Scenario: As a new and slightly more calm user I want to login using my Facebook account
    # Scenario: As a still new and more experienced user I want to login using my G+ account
    # Scenario: As a more experienced user I want to login using my LinkedIn account
    # Scenario: As a scientist or publisher user I want to login using my ORCID account
    # Scenario: As a more experienced user I want to login using my existing build-in OSDR account
    # Scenario: As a more experienced user I want to register for built-in OSDR account