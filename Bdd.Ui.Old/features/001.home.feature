@test001
@smoke
Feature: As a new OSDR user I want to explore the home page

 Scenario: I login in the application as a test user
     Given I go to the site
     When  login as a test user
     Then  I should see "HELLO, TESTER 1" on the Home page

 Scenario: as a user I want to try "Upload and Organize" panel 
     When I click Upload and Organize panel
     Then I should see browser window
     When I click Home link in the menu
     Then I navigate back to Home screen

 Scenario: as a user I want to try "Share" panel 
     When I click Share panel
     Then I should see Share panel
     When I click Home link in the menu
     Then I navigate back to Home screen

 Scenario: as a user I want to try "Annotate" panel 
     When I click Annotate panel
     Then I should see Annotate panel
     When I click Home link in the menu
     Then I navigate back to Home screen

 Scenario: as a user I want to click on all Menu Items  
     When I click Organize link in the menu
     Then I should see browser window
     When I click Profile link in the menu
     Then I should see Profile page
 
 Scenario: As a user I want to contact OSDR via email
 Scenario: As a user I want to see OSDR on Facebook
 Scenario: As a user I want to see OSDR on G+
 Scenario: As a user I want to see OSDR on LinkedIn
