@shopping-cart
Feature: SauceDemo Shopping Cart

  As a logged-in SauceDemo customer
  I want to add products to my shopping cart
  So that I can purchase the selected products

  Background:
    Given the user is logged in with valid credentials
    And the inventory page is displayed

  @smoke @positive
  Scenario: Add a product to the shopping cart
    When the user adds "Sauce Labs Backpack" to the cart
    Then the shopping cart badge should display "1"

  @regression @positive
  Scenario: Verify an added product in the shopping cart
    When the user adds "Sauce Labs Backpack" to the cart
    And the user opens the shopping cart
    Then "Sauce Labs Backpack" should be displayed in the cart