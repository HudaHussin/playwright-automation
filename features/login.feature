@authentication
Feature: SauceDemo Login

  As a SauceDemo customer
  I want to log in to the application
  So that I can access the product inventory

  Background:
    Given the user is on the SauceDemo login page

  @smoke @positive
  Scenario: Display a usable login form
    Then the username field should be visible and editable
    And the password field should hide the entered password
    And the login button should be visible and enabled

  @smoke @positive
  Scenario: Successful login with valid credentials
    When the user logs in with valid credentials
    Then the inventory page should be displayed
    And the Products title should be visible

  @regression @negative
  Scenario Outline: Display the correct error for an unsuccessful login
    When the user logs in with "<loginCase>"
    Then the login error "<expectedError>" should be displayed
    And the user should remain on the login page

    Examples:
      | loginCase          | expectedError                              |
      | invalid credentials | Username and password do not match         |
      | empty username      | Username is required                       |
      | empty password      | Password is required                       |
      | locked-out user     | Sorry, this user has been locked out       |  