import { Page, Locator, expect, Response } from '@playwright/test';
import {generateRandomText , draganddrop } from "../utils/general.utils";
import { dateFormatValidation } from '../utils/general.utils';



export class RequestCreationPage {
    private _page: Page;
    private createRequestCTAfromNavbar : Locator
    // private wfName : string
    private allTabRequestListing:  Locator
    private continueButton : Locator
    private vendorInputField :  Locator
    private vendorDropdownFirstOption :  Locator
    // private taskContinueButton
    private checkboxFalse : Locator
    private submitButton : Locator
    private gotoRequestDetailsButton : Locator
    private approveButton : Locator
    private _url : string | null;
    private _requestIdFromUrl : string | null
    private _requestno :string | null
    private _vendorCardInHomePage : Locator | null;
    private _vendorNameFromCard : Locator | null;
    private _wfNameFromCard : Locator | null;
    private _taskNameFromCard :  Locator | null;
    private _userNameFromCard : Locator | null;
    private _requesterNameFromTable : Locator | null;
    private _vendorNameFromTable :  Locator | null;
    private _wfNameFromTable : Locator| null;
    private _taskNameFromTable : Locator | null;
    private _userNameFromTable : Locator | null;

    constructor(page: Page) {
        this._page = page;
        this.createRequestCTAfromNavbar =page.locator("(//p[text()='Create a Request'])[1]");
        this.continueButton = page.getByText("Continue");
        this.vendorInputField = page.locator("//input[@name='search-input']");
        this.vendorDropdownFirstOption = page.locator("(//label[@for='Select a vendor']//following-sibling::div[1]//div[@role='option'])[1]");
        this.checkboxFalse = page.locator('//label[@role="checkbox"][@aria-checked="false"]');
        this.submitButton = page.getByText("Submit");
        this.gotoRequestDetailsButton = page.getByText("Go to Request Details");
        this.approveButton = page.locator("//p[text()='Approve']/ancestor::button");
        this.allTabRequestListing = page.locator(`//p[text()='All']`);
        this._url = null;
        this._requestIdFromUrl = null;
        this._requestno = null;
        this._vendorCardInHomePage = null;
        this._vendorNameFromCard = null;
        this._wfNameFromCard = null;
        this._taskNameFromCard = null;
        this._userNameFromCard = null;
        this._requesterNameFromTable = null;
        this._vendorNameFromTable = null;
        this._wfNameFromTable = null;
        this._taskNameFromTable = null;
        this._userNameFromTable = null;
    }
//create request method -. returns url and id //nareesh input
   
    get page(){
        return this._page;
    }

    async seturl(value:string){
        this._url = await this.page.url();
    }
    get url():string{
        if(!this._url){
            throw new Error("Url has not been set.")
        }
        return this._url
    }
    set requestIdFromUrl(url :string){
        if(!this._url){
            throw new Error("Url has not been set. Please set seturl before calling requestIdFromUrl()")
        }
        this._requestIdFromUrl = url.substring(37);
    }
    get requestIdFromUrl():string{
        if (!this._requestIdFromUrl) {
            throw new Error("requestIdFromUrl has not been set.");
        }
        return this._requestIdFromUrl;
    }
    async setrequestNoFromColumn(){
        if (!this._requestIdFromUrl) {
            throw new Error("Request ID is not set. Please set requestIdFromUrl before calling setRequestNoFromColumn().");
        }
        let i = this.page.locator(`(//a[contains(@href,'${this._requestIdFromUrl}')]//p)[1]`);
        this._requestno = await i.textContent();
    }
    get requestno():string{
        if (!this._requestno) {
            throw new Error("requestno has not been set. Call setRequestNoFromColumn() first.");
        }
        return this._requestno
    }   

    
    async setVendorCardInHomePage(vendorName : string){

        this._vendorCardInHomePage = await this.page.locator(`(//h4[text()='My Requests']/ancestor::div[3]//h3[text()='${vendorName}'])[1]`);
    }
    get vendorCardInHomePage():Locator{
        if (!this._vendorCardInHomePage) {
            throw new Error("vendorcardinhomepage has not been set. Call setvendorcardinhomepage() first.");
        }
        return this._vendorCardInHomePage
    }



    async setVendorNameFromCard(){
        if (!this._requestIdFromUrl) {
            throw new Error("Request ID is not set. Cannot determine vendorNameFromCard.");
        }
        this._vendorNameFromCard = await this.page.locator(`//a[contains(@href,'${this._requestIdFromUrl}')]//h3`);
    }
    get vendorNameFromCard():Locator{
        if (!this._vendorNameFromCard) {
            throw new Error("vendorNameFromCard is not set. Call setVendorNameFromCard() before accessing it.");
        }
        return this._vendorNameFromCard
    }
    async setUserNameFromCard(){
        if (!this._requestIdFromUrl) {
            throw new Error(
              "Request ID is not set. Please call set requestIdFromUrl before calling setUserNameFromCard()."
            );
          }
        this._userNameFromCard = await this.page.locator(`(//a[contains(@href,'${this._requestIdFromUrl}')]/ancestor::div[2]//h5)[6]`);
    }
    get userNameFromCard():Locator{
        if (!this._userNameFromCard) {
            throw new Error(
              "userNameFromCard is not set. Call setUserNameFromCard() before accessing it."
            );
          }
        return this._userNameFromCard;
    }
    async setWfNameFromCard(){
        if (!this._requestIdFromUrl) {
            throw new Error(
              "Request ID is not set. Please call set requestIdFromUrl before calling setWfNameFromCard()."
            );
          }
        this._wfNameFromCard = await this.page.locator(`(//a[contains(@href,'${this._requestIdFromUrl}')]/ancestor::div[3]//h5)[2]`);
    }
    get wfNameFromCard():Locator{
        if (!this._wfNameFromCard) {
            throw new Error(
              "wfNameFromCard is not set. Call setWfNameFromCard() before accessing it."
            );
          }
        return this._wfNameFromCard;
    }
    async setTaskNameFromCard(){
        if (!this._requestIdFromUrl) {
            throw new Error(
              "Request ID is not set. Please call set requestIdFromUrl before calling setTaskNameFromCard()."
            );
          }
        this._taskNameFromCard = await this.page.locator(`(//a[contains(@href,'${this._requestIdFromUrl}')]/ancestor::div[2]//h5)[4]`);
    }
    get taskNameFromCard():Locator{
        if (!this._taskNameFromCard) {
            throw new Error(
              "taskNameFromCard is not set. Call setTaskNameFromCard() before accessing it."
            );
          }
        return this._taskNameFromCard;
    }
    async setRequesterNameFromTable(){
        if (!this._requestno) {
            throw new Error(
              "Request number is not set. Please call setRequestNoFromColumn() before calling setRequesterNameFromTable()."
            );
          }
        this._requesterNameFromTable = await this.page.locator(`//p[text()='${this._requestno}']/ancestor::td/following-sibling::td[2]//p`);
    }
    get requesterNameFromTable():Locator{
        if (!this._requesterNameFromTable) {
            throw new Error(
              "requesterNameFromTable is not set. Call setRequesterNameFromTable() before accessing it."
            );
          }
        return this._requesterNameFromTable;
    }
    async setVendorNameFromTable(){
        if (!this._requestno) {
            throw new Error(
              "Request number is not set. Please call setRequestNoFromColumn() before calling setVendorNameFromTable()."
            );
          }
        this._vendorNameFromTable = await this.page.locator(`//p[text()='${this._requestno}']/ancestor::td/following-sibling::td[1]//p`);
    }
    get vendorNameFromTable():Locator{
        if (!this._vendorNameFromTable) {
            throw new Error(
              "vendorNameFromTable is not set. Call setVendorNameFromTable() before accessing it."
            );
          }
        return this._vendorNameFromTable;
    }
    async setWfNameFromTable(){
        if (!this._requestno) {
            throw new Error(
              "Request number is not set. Please call setRequestNoFromColumn() before calling setWfNameFromTable()."
            );
          }
        this._wfNameFromTable = await this.page.locator(`//p[text()='${this._requestno}']/ancestor::td/following-sibling::td[7]//p`);
    }
    get wfNameFromTable():Locator{
        if (!this._wfNameFromTable) {
            throw new Error(
              "wfNameFromTable is not set. Call setWfNameFromTable() before accessing it."
            );
          }
        return this._wfNameFromTable;
    }
    async setTaskNameFromTable(){
        if (!this._requestno) {
            throw new Error(
              "Request number is not set. Please call setRequestNoFromColumn() before calling setTaskNameFromTable()."
            );
          }
        this._taskNameFromTable = await this.page.locator(`//p[text()='${this._requestno}']/ancestor::td/following-sibling::td[9]//p`);
    }
    get taskNameFromTable():Locator{
        if (!this._taskNameFromTable) {
            throw new Error(
              "taskNameFromTable is not set. Call setTaskNameFromTable() before accessing it."
            );
          }
        return this._taskNameFromTable;
    }
    async setUserNameFromTable(){
        if (!this._requestno) {
            throw new Error(
              "Request number is not set. Please call setRequestNoFromColumn() before calling setUserNameFromTable()."
            );
          }
        this._userNameFromTable = await this.page.locator(`//p[text()='${this._requestno}']/ancestor::td/following-sibling::td[10]//p`);
    }
    get userNameFromTable():Locator{
        if (!this._userNameFromTable) {
            throw new Error(
              "userNameFromTable is not set. Call setUserNameFromTable() before accessing it."
            );
          }
        return this._userNameFromTable;
    }
    validateVendorCardHomePage(){
        if(!this._vendorCardInHomePage){
            throw new Error(
                "No such vendor exists in the requests section in home page"
            )
        }
    }
    async validateVendorNameHomePage(vendorname: string){
        if(!this._vendorNameFromCard){
            throw new Error(
                "Vendor name doesn't exist in the card"
            )
        }
        try{
            await expect(this._vendorNameFromCard).toHaveText(vendorname);
        }
        catch(e){
            console.log("Vendor doesn't match");
            process.exit(0);
        }
    }
    async validateWfNameFromHomePage(wfname:string){
        if(!this._wfNameFromCard){
            throw new Error(
                "WF name doesn't exist in the card"
            )
        }
        try{
            await expect(this._wfNameFromCard).toHaveText(wfname);
        }
        catch(e){
            console.log("wfname doesn't match");
            process.exit(0);
        }
    }
    async validateTaskNameFromHomePage(taskname:string){
        if(!this._taskNameFromCard){
            throw new Error(
                "Task name doesn't exist in the card"
            )
        }
        try{
            await expect(this._taskNameFromCard).toHaveText(taskname);
        }
        catch(e){
            console.log("taskname doesn't match");
            process.exit(0);
        }

    }
    async validateUserNameFromHomePage(username:string){
        if(!this._userNameFromCard){
            throw new Error(
                "User name doesn't exist in the card"
            )
        }
        try{
            await expect(this._userNameFromCard).toHaveText(username);
        }
        catch(e){
            console.log("Username doesn't match");
            process.exit(0);
        }
    }
    async validateRequesterNameFromTable(requestername :string){
        if(!this._requesterNameFromTable){
            throw new Error(
                "Couldn't find the requester name in the table"
            )
        }
        try{
            await expect(this._requesterNameFromTable).toHaveText(requestername);
        }
        catch(e){
            console.log("requester name doesn't match");
            process.exit(0);
        }
    }
    async validateVendorNameFromTable(vendorName :string){
        if(!this._vendorNameFromTable){
            throw new Error(
                "Couldn't find the vendor name in the table"
            )
        }
        try{
            await expect(this._vendorNameFromTable).toHaveText(vendorName);
        }
        catch(e){
            console.log("Vendor name doesn't match");
            process.exit(0);
        }
    }
    async validateTaskNameFromTable(taskName :string){
        if(!this._taskNameFromTable){
            throw new Error(
                "Couldn't find the Task name in the table"
            )
        }
        try{
            await expect(this._taskNameFromTable).toHaveText(taskName);
        }
        catch(e){
            console.log("Task name doesn't match");
            process.exit(0);
        }
    }
    async validateWfNameFromTable(wfName :string){
        if(!this._wfNameFromTable){
            throw new Error(
                "Couldn't find the Wf name in the table"
            )
        }
        try{
            await expect(this._wfNameFromTable).toHaveText(wfName);
        }
        catch(e){
            console.log("Wf name doesn't match");
            process.exit(0);
        }
    }
    async validateUserNameFromTable(userName :string){
        if(!this._userNameFromTable){
            throw new Error(
                "Couldn't find the User name in the table"
            )
        }
        try{
            await expect(this._userNameFromTable).toHaveText(userName);
        }
        catch(e){
            console.log("User name doesn't match");
            process.exit(0);
        }
    }

    async fillAnswer(task_question:string, answer :string){
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//input`).fill(answer);
    }
    async selectFromDropdown(task_question:string ,optionToBeSelected : string){
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//button`).click();
        await this.page.locator(`//div[@role='option']//span[text()='${optionToBeSelected}']`).click();
    }
    async selectFromRadioButton(task_question:string, optionToBeSelected:string){
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//span[@role='radio']//span[text()='${optionToBeSelected}']`).click();
    }
    async selectFromCheckbox(task_question:string, optionToBeSelected:string){
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//label[@role='checkbox' and text()='${optionToBeSelected}']`).click();
    }
    async selectDate(task_question:string, date :string){
        let bool = dateFormatValidation(date);
        if(bool==false){
            throw new Error ("Date format doesn't match")
        }
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//input`).fill(date);

    }

    async selectattachment(task_question :string, filePath :string){
        await this.page.setInputFiles(`//label[@for='${task_question}']/following-sibling::button//input[@type="file"]`, filePath);
    }
    async selectCurrrencyType(task_question:string , currencyType: string){
        await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//button`).click();
        if(currencyType.length!==3){
            throw new Error ("Enter currency in three letter uppercase format")
        }
        try{
            await this.page.locator(`//div//span[text()='${currencyType}']`).click();
        }
        catch(e){
            throw new Error("Currency type doesn't exist")
        }        
    }
    async selectUserFromDropdown(task_question: string , username : string){
        try{
            await this.page.locator(`//label[@for='${task_question}']/following-sibling::div//span[text()='${username}']`).click();
        }
        catch(e){
            throw new Error("Couldn't find the user from the dropdown");
        }
    }

}