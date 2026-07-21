@checkout
Feature: SauceDemo Checkout

  As a SauceDemo customer
  I want to complete the checkout process
  So that I can purchase the products in my cart

  Background:
    Given the user is logged in with valid credentials
    And the user has added "Sauce Labs Backpack" to the cart
    And the user has opened the shopping cart
    And the user has proceeded to checkout

  @smoke @end-to-end @positive
  Scenario: Complete an order successfully
    When the user enters valid customer information
    Then the checkout overview page should be displayed
    And "Sauce Labs Backpack" should be displayed in the order summary
    When the user finishes the order
    Then the checkout complete page should be displayed
    And the message "Thank you for your order!" should be displayed

  @regression @negative
  Scenario Outline: Display an error for incomplete customer information
    When the user enters "<firstName>", "<lastName>" and "<postalCode>"
    Then the checkout error "<expectedError>" should be displayed
    And the user should remain on the customer information page

    Examples:
      | firstName | lastName | postalCode | expectedError                  |
      |           | Luna     | 42300      | Error: First Name is required  |
      | Huda      |          | 42300      | Error: Last Name is required   |
      | Huda      | Luna     |            | Error: Postal Code is required |