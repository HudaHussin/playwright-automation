@checkout
Feature: SauceDemo Checkout

  As a SauceDemo customer
  I want to complete the checkout process
  So that I can purchase the products in my cart

  Background:
    Given the user is logged in with valid credentials
    And the user has added "Sauce Labs Backpack" to the cart
    And the user has opened the shopping cart

  @smoke @end-to-end @positive
  Scenario: Complete an order successfully
    Given "Sauce Labs Backpack" is displayed in the cart
    When the user proceeds to checkout
    And the user enters valid customer information
    And the user continues to the checkout overview
    Then "Sauce Labs Backpack" should be displayed in the order summary
    When the user finishes the order
    Then the checkout complete page should be displayed
    And the message "Thank you for your order!" should be displayed