import { Page, Locator, expect, Response } from '@playwright/test';
import { RequestCreationPage } from '../Pages/request.page';

export class HomePageRequestValidation extends RequestCreationPage{
    constructor(page:Page){
        super(page);
    }
    async navigateToHomePage(){
        if(super.url.includes("app.spendflo")){
            await super.page.goto("https://app.spendflo.com");
        }
        else if(super.url.includes("test.spendflo")){
            await super.page.goto("https://test.spendflo.com")
        }
        else{
            throw new Error("Something went wrong with navigation to home page")
        }
    }

    async vendorCardValidations(vendorName: string, taskname: string, username: string, wfname : string,  ){
        
        // let url = super.page.url();
        // this.requestIdFromUrl = url;
        // this.requestIdFromUrl;
        
        // await this.setrequestNoFromColumn();
        // this.requestno;
     // ********************** This should be called from the place where you are creating request

        await this.setVendorCardInHomePage(vendorName);
        this.validateVendorCardHomePage;  //  check the vendor card exists in the home page requests section

        await this.setVendorNameFromCard();
        await this.validateVendorNameHomePage(vendorName);

        await this.setTaskNameFromCard();
        await this.validateTaskNameFromHomePage(taskname);

        await this.setUserNameFromCard();
        await this.validateUserNameFromHomePage(username);

        await this.setWfNameFromCard();
        await this.validateWfNameFromHomePage(wfname);

    }

}







export class RequestListingValidations extends RequestCreationPage{
    constructor(page:Page){
        super(page);
    }
    async navigateToRequestListingPage(){
        if(super.url.includes("app.spendflo")){
            await super.page.goto("https://app.spendflo.com/v2/requests");
        }
        else if(super.url.includes("test.spendflo")){
            await super.page.goto("https://test.spendflo.com/v2/requests")
        }
        else{
            throw new Error("Something went wrong with navigation to request listing page")
        }
    }

    async rowValidationsRequestListing(vendorName: string, taskname: string, username: string, wfname : string,requestername : string ){
        
        // let url = super.page.url();
        // this.requestIdFromUrl = url;
        // this.requestIdFromUrl;
        
        // await this.setrequestNoFromColumn();
        // this.requestno;
     // ********************** This should be called from the place where you are creating request

        await this.setVendorNameFromTable();
        this.vendorNameFromTable;
        await this.validateVendorNameFromTable(vendorName);

        await this.setRequesterNameFromTable();
        this.requesterNameFromTable;
        await this.validateRequesterNameFromTable(requestername);

        await this.setTaskNameFromTable();
        this.taskNameFromTable;
        await this.validateTaskNameFromTable(taskname);

        // await this.

        await this.setUserNameFromCard();
        await this.validateUserNameFromHomePage(username);

        await this.setWfNameFromCard();
        await this.validateWfNameFromHomePage(wfname);

    }

}