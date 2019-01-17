@start-all-tests @001 @login-logout @suite-1 @smoke
Feature: As a OSDR user I want to login to site and than logout

Scenario: I login in the application as a test user
  Given I go to the site
  When go to login page
  When login as a test user
  # Then I should see 'Test E2E' on the Home page

Scenario: I logout from site
  When I logout from site
  Then I am on logout page
#    Then I go to main page