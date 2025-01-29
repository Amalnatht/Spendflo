import { Page, Locator, expect, Response } from '@playwright/test';
import {generateRandomText , draganddrop } from "../utils/general.utils";
import { promises } from 'dns';
import { StringLiteral } from 'typescript';


export class WorkflowPageAndStudio {
    private page: Page;
    private settingsButton: Locator;
    private wfNavigationSideBar: Locator;
    private addWorkflowButton: Locator;
    private createaNewWorkflowButton: Locator;
    private wfNameInputField: Locator;
    private createWorkflowButton: Locator;
    private workflowStudioCloseButton: Locator;
    private intakeform3dots: Locator;
    private postIntakeForm3dots: Locator;
    private taskEditButton: Locator;
    private saveAndContinueButtonInTaskform : Locator;
    private addSectionButton : Locator;
    private vendorQuestionBlock : Locator;
    private shortTextQuestionBlock: Locator;
    private longTextQuestionBlock : Locator;
    private dropdownQuestionBlock : Locator;
    private singleChoiceQuestionBlock : Locator;
    private multipleChoiceQuestionBlock : Locator;
    private numberQuestionBlock : Locator;
    private dateQuestionBlock : Locator;
    private attachmentQuestionBlock : Locator;
    private currencyQuestionBlock : Locator;
    private userselectQuestionBlock : Locator;
    private addChecklistItemButton : Locator;
    private section1Block : Locator;
    private saveButtonForms : Locator;
    private intakePhase : Locator;
    private completedPhase : Locator;
    private plusIconNextToCompletedPhase : Locator;
    private phaseNameInputField : Locator;
    private createPhaseButton : Locator;
    private plusAddTaskButton : Locator;
    private addTaskButton : Locator;
    private taskNameInputField : Locator;
    private approvalRadioButton : Locator;
    private completionRadioButton : Locator;
    private selectARoleField : Locator;
    private selectAroleDropdown : Locator;
    private selectAUserField : Locator;
    private selectUserSearchField : Locator;
    private selectUserDropdownFirstOption : Locator;
    private csmRoleFromdropdown : Locator;
    private requesterManagerFromdropdown : Locator;
    private engagementManagerFromdropdown : Locator;
    private requesterFromdropdown : Locator;
    private requesterTeamOwnerFromdropdown : Locator;
    private publishButtoninWorkflowStudio : Locator;
    private versionDescriptionField : Locator;
    private publishButtoninModal : Locator;
    private formQuestionName : Locator;
    private formPlusAddOptionButton : Locator;
    private formAddoptionInputField : Locator;
    private formDescriptionField : Locator;
    private formResponseRequiredToggle : Locator;
    private formSelectTypeofAttachment : Locator;
    private formattachemtquestionFirstoptionselection : Locator;
    private formUserQuestionUserTypeSelectAdmin : Locator;
    private bottomNodePlusButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsButton = page.locator('//img[@alt="GearUnfilled"]');
        this.wfNavigationSideBar = page.getByText('Workflows');
        this.addWorkflowButton = page.getByText('+ Add Workflow');
        this.createaNewWorkflowButton = page.getByText('Create a New Workflow');
        this.wfNameInputField = page.locator('//input[@name="workflowName"]');
        this.createWorkflowButton = page.getByText('Create Workflow');
        this.workflowStudioCloseButton = page.locator('(//p[text()="Workflow Studio Guide"]/ancestor::div[2]//p)[2]');
        this.intakeform3dots = page.locator('//span[text()="Intake Form"]/ancestor::div[2]//button');
        this.taskEditButton = page.locator("//button[text()='Edit']");
        this.saveAndContinueButtonInTaskform = page.locator('//p[text()="Save & Continue"]');
        this.addSectionButton = page.getByText('Add Section');
        this.vendorQuestionBlock = page.locator("//p[text()='Vendor']/ancestor::div[1]");
        this.shortTextQuestionBlock = page.locator('//p[text()="Short Text"]/ancestor::div[1]');
        this.longTextQuestionBlock = page.locator('//p[text()="Long Text"]/ancestor::div[1]');
        this.dropdownQuestionBlock = page.locator('//p[text()="Dropdown"]/ancestor::div[1]');
        this.singleChoiceQuestionBlock = page.locator('//p[text()="Single Choice"]/ancestor::div[1]');
        this.multipleChoiceQuestionBlock = page.locator('//p[text()="Multiple Choice"]/ancestor::div[1]');
        this.numberQuestionBlock = page.locator('//p[text()="Number"]/ancestor::div[1]');
        this.dateQuestionBlock = page.locator('//p[text()="Date"]/ancestor::div[1]');
        this.attachmentQuestionBlock = page.locator('//p[text()="Attachment"]/ancestor::div[1]');
        this.currencyQuestionBlock = page.locator('//p[text()="Currency"]/ancestor::div[1]');
        this.userselectQuestionBlock = page.locator('//p[text()="User Select"]/ancestor::div[1]');
        this.addChecklistItemButton = page.getByText('Add Checklist Item');
        this.section1Block = page.locator('//h3[text()="Section 1"]/ancestor::div[2]/following-sibling::div');
        this.saveButtonForms = page.locator('(//p[text()="Save"])[2]');
        this.intakePhase = page.locator(`//h1[text()='Intake']`);
        this.completedPhase = page.locator("//h1[text()='Completed']");
        this.plusIconNextToCompletedPhase = page.locator("(//div[@id='2']//button)[1]");
        this.phaseNameInputField = page.locator("//input[@name='phaseName']");
        this.createPhaseButton = page.locator("//p[text()='Create Phase']/ancestor::button");
        this.plusAddTaskButton =  page.locator("//p[text()='+ Add Task']/ancestor::button[1]");
        this.addTaskButton = page.locator("//span[text()='Add Task']");
        this.taskNameInputField = page.getByPlaceholder('Enter task name');
        this.approvalRadioButton = page.locator("//span[text()='Approval']/ancestor::span");
        this.completionRadioButton = page.locator("//span[text()='Completion']/ancestor::span");
        this.selectARoleField = page.locator("//span[text()='Select a Role']/ancestor::span");
        this.selectAroleDropdown = page.locator("//label[@for='Role:']/following-sibling::div//button");
        this.selectAUserField = page.locator("//span[text()='Select a User']/ancestor::span");
        this.selectUserSearchField = page.locator('//input[@name="search-input"]');
        this.selectUserDropdownFirstOption= page.locator("//div[@role='listbox']/div[1]");
        this.csmRoleFromdropdown = page.locator("//span[text()='CSM']/ancestor::div[@role='option']");
        this.requesterManagerFromdropdown = page.locator(`//span[text()="Requester's Manager"]/ancestor::div[@role='option']`);
        this.engagementManagerFromdropdown = page.locator("//span[text()='Engagement Manager']/ancestor::div[@role='option']");
        this.requesterFromdropdown = page.locator("//div[@role='option']//span[text()='Requester']");
        this.requesterTeamOwnerFromdropdown = page.locator(`//span[text()="Requester's Team Owner"]/ancestor::div[@role='option']`);
        this.publishButtoninWorkflowStudio = page.locator("//p[text()='Publish']/ancestor::button");
        this.versionDescriptionField = page.locator("//label[@for='Version Description']/following-sibling::textarea");
        this.publishButtoninModal = page.locator("(//p[text()='Publish'])[2]");
        this.formQuestionName = page.locator('//input[@name="title"]');
        this.formPlusAddOptionButton = page.locator("//p[text()='+ Add Option']/ancestor::button");
        this.formAddoptionInputField = page.locator("//label[@for='Add Options']/ancestor::div[1]//input[@step='any']");
        this.formDescriptionField = page.locator("//label[@for='Description']/following-sibling::textarea");
        this.formResponseRequiredToggle = page.locator("//label[@for='Response required']//following-sibling::div//button");
        this.formSelectTypeofAttachment = page.locator("//label[@for='Select the type of attachment']/following-sibling::div//button");
        this.formattachemtquestionFirstoptionselection = page.locator("//div[@role='option'][1]");
        this.formUserQuestionUserTypeSelectAdmin = page.locator("//label[text()='Users with role: Admin']");
        this.bottomNodePlusButton = page.locator("//button[contains(@class, 'absolute bottom')]");
        this.postIntakeForm3dots = page.locator('//span[text()="Post Intake"]/ancestor::div[2]//button')


    }

    async createANewWorkflow():Promise<string>{
        await this.addWorkflowButton.click();
        await this.createaNewWorkflowButton.click();
        let workflowName = generateRandomText(5);
        await this.wfNameInputField.fill(workflowName);
        await this.createWorkflowButton.click();
        await this.workflowStudioCloseButton.click();
        return workflowName;
    }

    async createANewPhase(){
        await this.completedPhase.hover();
        await this.plusIconNextToCompletedPhase.click();
        await this.phaseNameInputField.fill(generateRandomText(5));
        await this.createPhaseButton.click();
    }

    async createANewTaskfromEmptyPhase(){
        await this.plusAddTaskButton.click();
    }

    async intakeOverviewContinueWithDefaultValues(){
        await this.intakeform3dots.click();
        await this.taskEditButton.click();
        await this.saveAndContinueButtonInTaskform.click();
    }
    
    async postIntakeTaskedit(){
        await this.postIntakeForm3dots.click();
        await this.taskEditButton.click(); 
    }

    async formSectionCompletionWithVendorQuestionAndOtherQuestionTypes():Promise<string>{
        await this.addSectionButton.click();
        await this.page.keyboard.press('Enter');
        let source : Locator; let target: Locator;
        source = this.vendorQuestionBlock;
        target = this.section1Block;
        await draganddrop(source,target,this.page);
        await this.saveButtonForms.click();
        await this.page.waitForTimeout(3000);
        return await this.formSectionCompletion();
        
    }

    async createSectionInFormsWithDefaultName(){
        await this.addSectionButton.click();
        await this.page.keyboard.press('Enter');
    }

    async formSectionCompletion():Promise<string>{
        let source : Locator; let target: Locator;
        let randomNumber = Math.floor(Math.random() * 10) + 1;
        if (randomNumber==1){
            source = this.shortTextQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Short Text Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();
            await this.saveButtonForms.click();
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;

        }
        else if (randomNumber==2){
            source = this.longTextQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Long Text Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();
            await this.saveButtonForms.click();
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if (randomNumber==3){
            source = this.dropdownQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Dropdown Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("A");
            await this.page.keyboard.press('Enter');
            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("B");
            await this.page.keyboard.press('Enter');

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if ( randomNumber == 4){
            source = this.singleChoiceQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Single Choice Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("A");
            await this.page.keyboard.press('Enter');
            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("B");
            await this.page.keyboard.press('Enter');

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if(    randomNumber == 5){
            source = this.multipleChoiceQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Multiple Choice Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("A");
            await this.page.keyboard.press('Enter');
            await this.formPlusAddOptionButton.click();
            await this.formAddoptionInputField.fill("B");
            await this.page.keyboard.press('Enter');

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if(randomNumber == 6){
            source = this.numberQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Number Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;

        }
        else if(randomNumber == 7){
            source = this.dateQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Date Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if(randomNumber == 8){
            source = this.attachmentQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);

            const questionpassed = "Attachment Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.formSelectTypeofAttachment.click();
            await this.formattachemtquestionFirstoptionselection.click();

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return  questionpassed;
        }
        else if(randomNumber == 9){
            source = this.currencyQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "Currency Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else if(randomNumber == 10){
            source = this.userselectQuestionBlock;
            await source.scrollIntoViewIfNeeded();
            target = this.section1Block;
            await draganddrop(source,target,this.page);
            const questionpassed = "User select Question";
            await this.formQuestionName.fill(questionpassed);
            await this.formDescriptionField.fill("Description");
            await this.formResponseRequiredToggle.click();

            await this.formUserQuestionUserTypeSelectAdmin.click();

            await this.saveButtonForms.click(); 
            await this.page.waitForTimeout(3000);
            await this.saveAndContinueButtonInTaskform.click();
            return questionpassed;
        }
        else{
            console.log("Invalid Question Type");
            return "Invalid question";
        }
    }

    async checklistCompletion(){
        await this.addChecklistItemButton.click();
        await this.page.keyboard.insertText('Checklist Item 1');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1500);
        await this.saveAndContinueButtonInTaskform.click();
        await this.page.waitForTimeout(4000);
        await this.saveAndContinueButtonInTaskform.click();
        await this.page.waitForTimeout(4000);
    }

    async approvalCSMOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.csmRoleFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
    }

    async completionCSMOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.csmRoleFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async approvalEMOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.engagementManagerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async completionEMOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.engagementManagerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async approvalRequesterOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async completionRequesterOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async approvalRequesterteamownerOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterTeamOwnerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async completionRequesterteamownerOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterTeamOwnerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async approvalRequestermanagerOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterManagerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async completionRequestermanagerOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectARoleField.click();
        await this.selectAroleDropdown.click();
        await this.requesterManagerFromdropdown.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async approvalSelectedUserOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.approvalRadioButton.click();
        await this.selectAUserField.click();
        await this.selectUserSearchField.fill("Selfserve user 2");
        await this.page.waitForTimeout(3000);
        await this.selectUserDropdownFirstOption.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
        
    }

    async completionSelectedUserOverview():Promise<string>{
        let taskname = generateRandomText(5);
        await this.taskNameInputField.fill(taskname);
        await this.completionRadioButton.click();
        await this.selectAUserField.click();
        await this.selectUserSearchField.fill("Selfserve user 2");
        await this.page.waitForTimeout(3000);
        await this.selectUserDropdownFirstOption.click();
        await this.page.waitForTimeout(3000);
        await this.saveAndContinueButtonInTaskform.click();
        return taskname;
    }

    async withoutform(){
        await this.page.waitForTimeout(4000);
        await this.saveAndContinueButtonInTaskform.click();
        await this.page.waitForTimeout(4000);

    }

    async withoutChecklist(){
        await this.page.waitForTimeout(4000);
        await this.saveAndContinueButtonInTaskform.click();
        await this.page.waitForTimeout(4000);
        await this.saveAndContinueButtonInTaskform.click();
        await this.page.waitForTimeout(4000);
    }
    
    async hoverOverATaskAndClickonBottomnode(taskToBeHoveredOver : string){
        let taskToHoverover = this.page.locator(`//span[text()='${taskToBeHoveredOver}']`);
        await taskToHoverover.scrollIntoViewIfNeeded();
        await taskToHoverover.hover();
        await this.bottomNodePlusButton.click();

    }
    async hoverOverATaskAndClickonLeftnode(taskToBeHoveredOver : string){
        let taskToHoverover = this.page.locator(`//span[text()='${taskToBeHoveredOver}']`);
        await taskToHoverover.scrollIntoViewIfNeeded();
        await taskToHoverover.hover();
        await this.page.locator(`//span[text()='${taskToBeHoveredOver}']/ancestor::div[4]//div[@data-handlepos='left']`).click();
        if(taskToBeHoveredOver!="Post Intake" && taskToBeHoveredOver!= "Intake Form"){
            await this.addTaskButton.click();
        }

    }
    async hoverOverATaskAndClickonRightnode(taskToBeHoveredOver : string){
        let taskToHoverover = this.page.locator(`//span[text()='${taskToBeHoveredOver}']`);
        await taskToHoverover.scrollIntoViewIfNeeded();
        await taskToHoverover.hover();
        await this.page.locator(`//span[text()='${taskToBeHoveredOver}']/ancestor::div[4]//div[@data-handlepos='right']`).click();
        if(taskToBeHoveredOver!="Post Intake" && taskToBeHoveredOver!= "Intake Form"){
            await this.addTaskButton.click();
        }
    }

    async publishWorkflow(){
        await this.publishButtoninWorkflowStudio.click();
        await this.versionDescriptionField.fill("Version 1");
        await this.page.waitForTimeout(2000);
        await this.publishButtoninModal.click();
        await this.page.waitForTimeout(12000);
    }

}

export class Taskdetails {
    private typeoftask : string;
    private userrole : string;
    private taskname : string;
    private question : string;
    private additonalQuestion : string
    constructor( typeoftask : string, userrole : string, taskname : string , question : string, additonalQuestion: string = "empty"){ {
        this.question = question;
        this.typeoftask = typeoftask;
        this.userrole = userrole;
        this.taskname = taskname;
        this.additonalQuestion = additonalQuestion;
    }
  }
}