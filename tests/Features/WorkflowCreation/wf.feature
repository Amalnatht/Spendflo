Feature: Workflow creation

Scenario: User logs in navigates to wf page
    # Given Superadmin "Amalnath" logs in and switches to "SpendfloOne" organization
    Given User "selfserveuser1" logs in
    Then User navigates to settings workflows page