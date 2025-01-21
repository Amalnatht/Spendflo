Feature: Login functionality

Scenario: User logs in with valid credentials
  Given User navigates to Login page
  When User Enters details and clicks on Sign in with credentials from row 1
    | email | pwd |
    | amalnath@spendflo.com | Amalnath123@ |
  When Skip for now is visible
  Then Click on Skip for now button
  Then User should be signed in
  When Pendo guide is visible
  Then Close the Pendo guide
  When Organization name is spendflo
  Then Switch organization to "test-org" 
