Feature: Agreement creation

Scenario: Users logs in and and creates a Non-SaaS Contract
    Given User "Huda One" logs in to "SpendfloOne" org in "production env"
    Then User navigates to Agreements page
    Then User selects "Contract" - "Others" option for Agreement creation
    Then User continues to Agreement Creation
    Then User enters Vendor details
    Then User fills Agreement details
    Then User creates Line-item
    Then User saves the Agreement
