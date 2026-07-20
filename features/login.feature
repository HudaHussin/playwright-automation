@authentication
Feature: SauceDemo Login

  As a SauceDemo customer
  I want to log in to the application
  So that I can access the product inventory

  @smoke @positive
  Scenario: Successful login with valid credentials
    Given the user is on the SauceDemo login page
    When the user logs in with valid credentials
    Then the inventory page should be displayed

  @regression @negative
  Scenario: Unsuccessful login with invalid credentials
    Given the user is on the SauceDemo login page
    When the user logs in with invalid credentials
    Then an invalid credentials error should be displayed
    And the user should remain on the login page