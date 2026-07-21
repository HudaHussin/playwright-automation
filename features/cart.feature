@shopping-cart
Feature: SauceDemo Shopping Cart

  As a logged-in SauceDemo customer
  I want to add products to my shopping cart
  So that I can purchase the selected products

  Background:
    Given the user is logged in with valid credentials
    And the inventory page is displayed

  @smoke @positive
  Scenario: Add and verify a product in the shopping cart
    When the user adds "Sauce Labs Backpack" to the cart
    Then the shopping cart badge should display "1"
    When the user opens the shopping cart
    Then the cart page should be displayed
    And "Sauce Labs Backpack" should be displayed in the cart