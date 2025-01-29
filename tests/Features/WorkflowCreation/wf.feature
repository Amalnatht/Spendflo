Feature: Workflow creation


Scenario: User logs in navigates to wf page
    Given Superadmin "Amalnath" logs in to "prod" and switches to "SpendfloOne" organization
    # Given User "selfserveuser1" logs in to "prod"
    Then User navigates to settings workflows page
