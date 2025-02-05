import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";
import { getEnvironmentUrl } from "../../utils/environment.utils";
import { SettingsPage } from "../../Pages/settings.page";
import { WorkflowPageAndStudio , Taskdetails} from "../../Pages/workflow.page";
import fs from 'fs';


setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser; 
let settingsPage : SettingsPage;
let workflowPage : WorkflowPageAndStudio;
let workflowName : string;

//created tasks name
const intakeTask :string  = "Intake Form";
const postIntakeTask : string = "Post Intake";
let requesterApprovalTask:string;
let requesterCompletionTask : string;
let managerApprovalTask :string;
let managerCompletionTask : string;
let teamOwnerApprovalTask :string;
let teamOwnerCompletionTask : string;
let csmApprovalTask :string; 
let csmCompletionTask : string;
let selectedUserApprovalTask :string ;
let selectedUserCompletionTask :string;
let emApprovalTask :string;
let emCompletionTask : string
let withoutFormTask : string;
let withoutChecklistTask : string;

let questionPicked : string;

//created tasks details
let requesterApprovalTaskDetails : Taskdetails;
let requesterCompletionTaskDetails : Taskdetails;
let managerApprovalTaskDetails : Taskdetails;
let managerCompletionTaskDetails : Taskdetails;
let teamOwnerApprovalTaskDetails : Taskdetails; 
let teamOwnerCompletionTaskDetails : Taskdetails;
let csmApprovalTaskDetails : Taskdetails;
let csmCompletionTaskDetails : Taskdetails;
let selectedUserApprovalTaskDetails : Taskdetails;
let selectedUserCompletionTaskDetails : Taskdetails;
let emApprovalTaskDetails : Taskdetails;
let emCompletionTaskDetails : Taskdetails;
let withoutFormTaskDetails : Taskdetails;
let withoutChecklistTaskDetails : Taskdetails;
let intakeTaskDetails : Taskdetails;
let postIntakeTaskDetails : Taskdetails;


let users : Users = usersData;

let loginPage : LoginPage;
let loginUtils : LoginUtils

Before(async function () {
  browser = await chromium.launch({ headless: true});
  const context = await browser.newContext({
    recordVideo: { dir: 'videos/' }, // Save videos in the "videos" directory
  })
  page = await context.newPage();
  settingsPage = new SettingsPage(page);
  workflowPage = new WorkflowPageAndStudio(page);
});

Given("Superadmin {string} logs in to {string} and switches to {string} organization",  async function(user : string, env : string ,orgname : string){
    const url = getEnvironmentUrl(env);
    loginPage = new LoginPage(page, url);
    loginUtils = new LoginUtils(loginPage);
    const userDetails = users[user];
    await loginUtils.loginAsSuperadmin(userDetails.email,userDetails.password,orgname)
})


Then("User navigates to settings workflows page",async function(){
    await settingsPage.navigateToWorkflowsSection();
})

Then("User creates a new Workflow and moves to Workflow Studio",async function(){
    workflowName = await workflowPage.createANewWorkflow();
})

Then("User fills in details to the intake task and completes it",async function(){
    await workflowPage.intakeOverviewContinueWithDefaultValues();
    questionPicked = await workflowPage.formSectionCompletionWithVendorQuestionAndOtherQuestionTypes();
    await workflowPage.checklistCompletion();
    intakeTaskDetails = new Taskdetails("Completion","Requester",intakeTask,questionPicked,"Vendor question");
})

Then("User creates a new Phase",async function(){
    await workflowPage.createANewPhase();
})


Then("User creates an approval task for csm inside the newly created phase",async function(){
    await workflowPage.createANewTaskfromEmptyPhase();
    csmApprovalTask = await workflowPage.approvalCSMOverview();
    await workflowPage.createSectionInFormsWithDefaultName();
    questionPicked = await workflowPage.formSectionCompletion();
    await workflowPage.checklistCompletion();
    csmApprovalTaskDetails = new Taskdetails("Approval","CSM",csmApprovalTask,questionPicked);
})

Then("User hovers over the approval task for csm and creates a new completion task for Requester's manager at the bottom",async function(){    
    await workflowPage.hoverOverATaskAndClickonBottomnode(csmApprovalTask);
    managerCompletionTask = await workflowPage.completionRequestermanagerOverview();
    await workflowPage.createSectionInFormsWithDefaultName();
    questionPicked = await workflowPage.formSectionCompletion();
    await workflowPage.checklistCompletion();
    managerCompletionTaskDetails = new Taskdetails("Completion","Manager",managerCompletionTask,questionPicked);
})

Then("User hovers over the completion task for manager and creates a new Approval task for Engagement manager to the left",async function(){
    await workflowPage.hoverOverATaskAndClickonLeftnode(managerCompletionTask);
    emApprovalTask = await workflowPage.completionRequesterOverview();
    await workflowPage.createSectionInFormsWithDefaultName();
    questionPicked = await workflowPage.formSectionCompletion();
    await workflowPage.checklistCompletion();
    emApprovalTaskDetails = new Taskdetails("Approval","EM",emApprovalTask,questionPicked);

})

Then("User creates a second phase",async function(){
   await workflowPage.createANewPhase();
})

Then("User creates an completion task for csm inside the newly created phase",async function(){
    await workflowPage.createANewTaskfromEmptyPhase();
    csmCompletionTask = await workflowPage.completionCSMOverview();
    await workflowPage.createSectionInFormsWithDefaultName();
    questionPicked = await workflowPage.formSectionCompletion();
    await workflowPage.checklistCompletion();
    csmCompletionTaskDetails = new Taskdetails("Completion","CSM",csmCompletionTask,questionPicked);

})

Then("User hovers over the completion task for csm and creates a new approval task for selecteduser to the right",async function(){
    await workflowPage.hoverOverATaskAndClickonRightnode(csmCompletionTask);
    selectedUserApprovalTask = await workflowPage.approvalSelectedUserOverview();
    await workflowPage.createSectionInFormsWithDefaultName();
    questionPicked = await workflowPage.formSectionCompletion();
    await workflowPage.checklistCompletion();
    selectedUserApprovalTaskDetails = new Taskdetails("Approval","Selfserve user 2",selectedUserApprovalTask,questionPicked);

})

Then("User hovers over the approval task for selecteduser and creates a new completion task for Engagement Manager at the bottom",async function(){
  await workflowPage.hoverOverATaskAndClickonBottomnode(selectedUserApprovalTask);
  emCompletionTask = await workflowPage.completionEMOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  emCompletionTaskDetails = new Taskdetails("Completion","EM",emCompletionTask,questionPicked);

})

Then("User creates a Third phase",async function(){
  await workflowPage.createANewPhase();
})

Then("User creates an approval task for requester inside the newly created phase",async function(){
  await workflowPage.createANewTaskfromEmptyPhase();
  requesterApprovalTask = await workflowPage.approvalRequesterOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  requesterApprovalTaskDetails = new Taskdetails("Approval","Requester",requesterApprovalTask,questionPicked);

})

Then("User hovers over the approval task for selecteduser and creates a new completion task for selecteduser without form to the right",async function(){
    await workflowPage.hoverOverATaskAndClickonRightnode(requesterApprovalTask);
    withoutFormTask = await workflowPage.completionSelectedUserOverview();
    await workflowPage.withoutform();
    await workflowPage.checklistCompletion();
    questionPicked = "No question";
    withoutFormTaskDetails = new Taskdetails("Completion","Selfserve user 2",withoutFormTask,questionPicked);

})

Then("User hovers over the without form task for selecteduser and creates a new completion task for selecteduser without checklist to the right",async function(){
  await workflowPage.hoverOverATaskAndClickonRightnode(withoutFormTask);
  withoutChecklistTask = await workflowPage.completionSelectedUserOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.withoutChecklist();
  withoutChecklistTaskDetails = new Taskdetails("Completion","Selfserve user 2",withoutChecklistTask,questionPicked);
})

Then("User hovers over the approval task for requester and creates a new completion task for requester at the bottom",async function(){
  await workflowPage.hoverOverATaskAndClickonBottomnode(requesterApprovalTask);
  requesterCompletionTask = await workflowPage.completionRequesterOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  requesterCompletionTaskDetails = new Taskdetails("Completion","Requester",requesterCompletionTask,questionPicked);

})

Then("User hovers over the completion task for requester and creates a new approval task for Requester's Team owner at the bottom",async function(){
  await workflowPage.hoverOverATaskAndClickonBottomnode(requesterCompletionTask);
  teamOwnerApprovalTask = await workflowPage.approvalRequesterteamownerOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  teamOwnerApprovalTaskDetails = new Taskdetails("Approval","Team owner",teamOwnerApprovalTask,questionPicked);
})

Then("User hovers over the withoutchecklist task  and creates a new completion task for Requester's Team owner at the bottom",async function(){
  await workflowPage.hoverOverATaskAndClickonBottomnode(withoutChecklistTask);
  teamOwnerCompletionTask = await workflowPage.completionRequesterteamownerOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  teamOwnerCompletionTaskDetails = new Taskdetails("Completion","Team owner",teamOwnerCompletionTask,questionPicked);
})

Then("User hovers over the postintake task and creates a new completion task for selecteduser to the left",async function(){
  await workflowPage.hoverOverATaskAndClickonLeftnode(postIntakeTask);
  selectedUserCompletionTask = await workflowPage.completionSelectedUserOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  selectedUserCompletionTaskDetails = new Taskdetails("Completion","Selfserve user 2",selectedUserCompletionTask,questionPicked);
})


Then("User fills in details to Post Intake Task",async function(){
  await workflowPage.postIntakeTaskedit();
  await workflowPage.completionCSMOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  postIntakeTaskDetails = new Taskdetails("Completion","CSM",postIntakeTask,questionPicked);
})

Then("User hovers over the Intake task and creates a new approval task for Requester's manager to the right",async function(){
  await workflowPage.hoverOverATaskAndClickonRightnode(intakeTask);
  managerApprovalTask = await workflowPage.approvalRequestermanagerOverview();
  await workflowPage.createSectionInFormsWithDefaultName();
  questionPicked = await workflowPage.formSectionCompletion();
  await workflowPage.checklistCompletion();
  managerApprovalTaskDetails = new Taskdetails("Approval","Manager",managerApprovalTask,questionPicked);
})


Then("User publishes the workflow",async function(){
  await workflowPage.publishWorkflow();
  const Information = {
    managerApprovalTaskDetails,
    managerCompletionTaskDetails,
    teamOwnerApprovalTaskDetails,
    teamOwnerCompletionTaskDetails,
    csmApprovalTaskDetails,
    csmCompletionTaskDetails,
    selectedUserApprovalTaskDetails,
    selectedUserCompletionTaskDetails,
    emApprovalTaskDetails,
    emCompletionTaskDetails,
    requesterApprovalTaskDetails,
    requesterCompletionTaskDetails,
    withoutFormTaskDetails,
    withoutChecklistTaskDetails,
    intakeTaskDetails,
    postIntakeTaskDetails,
    workflowName
  
  }
  // Write the combined object to a JSON file
fs.writeFileSync('Data/workflowdata.json', JSON.stringify(Information, null, 2), 'utf-8');
})

After(async function (this: any) {
  if (page) {
    const videoPath = await page.video()?.path();
    if (videoPath) {
      console.log(`Video saved at: ${videoPath}`);

      // Read video file as a buffer
      const videoBuffer = fs.readFileSync(videoPath);

      // Attach the video buffer to the Cucumber report
      this.attach(videoBuffer, 'video/webm');
    }

    await page.close();
  }

  if (browser) {
    await browser.close();
  }
});












