Feature: Login functionality

Scenario: User logs in with valid credentials
  Given User navigates to Login page
  When User Enters details and clicks on Sign in with credentials for user "Rishi S"
  When Click on skip for now if visible
  Then User should be signed in
  Then Check if pendo is visible and close it
  Then Switch organization if it's not spendfloone or testorg to "test-org"

