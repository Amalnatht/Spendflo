Feature: Agreement creation

Scenario: Users logs in and and creates a Non-SaaS Contract
    Given User "Huda One" logs in to "SpendfloOne" org in "prod"
    Then User navigates to Agreements page
    Then User selects Others-Contract option for contract creation
    Then User enters Vendor details
    Then User fills Agreement details
    Then User creates Line-item
    Then User saves the Agreement
