Feature: Workflow creation


Scenario: User logs in navigates to wf page
    Given Superadmin "Ganesh Aravind" logs in to "Production env" and switches to "test-org" organization
    Then User navigates to settings workflows page
    Then User creates a new Workflow and moves to Workflow Studio
    Then User fills in details to the intake task and completes it
    Then User creates a new Phase
    Then User creates an approval task for csm inside the newly created phase
    Then User hovers over the approval task for csm and creates a new completion task for Requester's manager at the bottom
    Then User hovers over the completion task for manager and creates a new Approval task for Engagement manager to the left
    Then User creates a second phase
    Then User creates an completion task for csm inside the newly created phase
    Then User hovers over the completion task for csm and creates a new approval task for selecteduser to the right
    Then User hovers over the approval task for selecteduser and creates a new completion task for Engagement Manager at the bottom
    Then User creates a Third phase
    Then User creates an approval task for requester inside the newly created phase
    Then User hovers over the approval task for selecteduser and creates a new completion task for selecteduser without form to the right
    Then User hovers over the without form task for selecteduser and creates a new completion task for selecteduser without checklist to the right
    Then User hovers over the approval task for requester and creates a new completion task for requester at the bottom
    Then User hovers over the completion task for requester and creates a new approval task for Requester's Team owner at the bottom
    Then User hovers over the withoutchecklist task  and creates a new completion task for Requester's Team owner at the bottom
    Then User hovers over the postintake task and creates a new completion task for selecteduser to the left
    Then User fills in details to Post Intake Task
    Then User hovers over the Intake task and creates a new approval task for Requester's manager to the right
    Then User publishes the workflow
