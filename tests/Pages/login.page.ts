import { Page, Locator, expect, Response } from '@playwright/test';

export class LoginPage {
    private baseUrl: string;
    private page: Page;
    private emailField: Locator;
    private passwordField: Locator;
    private continueButton: Locator;
    private siginButton: Locator;
    private skipforNowButton: Locator;
    private pendoguideCloseButton: Locator;
    private orgNameLocatorFromNavbar: Locator;
    private orgName: string | null;
    private orgSearch: Locator;
    private orgToBeSwitchedTo : string;

    // Header locators for assertions
    private myTasksHeader: Locator;
    private commentsFeedHeader: Locator;
    private myRequestsHeader: Locator;
    private upcomingRenewalsHeader: Locator;

    constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = baseUrl;
        this.emailField = page.locator('//input[@name="identifier"]');
        this.passwordField = page.locator('//input[@name="password"]');
        this.continueButton = page.locator(`'button:has-text("Continue")'`);
        this.siginButton = page.locator('button:has-text("Sign in")');
        this.skipforNowButton = page.getByText('Skip for now');
        this.pendoguideCloseButton = page.locator('//div[@id="pendo-base"]//button[@aria-label="Close"]');
        this.orgNameLocatorFromNavbar = page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
        this.orgName = "";
        this.orgSearch = page.locator("//input[@name='orgsearch']");

        this.myTasksHeader = page.locator('//h4[text()="My Tasks"]');
        this.commentsFeedHeader = page.locator('//h4[text()="Comments Feed"]');
        this.myRequestsHeader = page.locator('//h4[text()="My Requests"]');
        this.upcomingRenewalsHeader = page.locator('//h4[text()="Upcoming Renewals"]');

        this.orgToBeSwitchedTo="";
    }

    async getPage():Promise <Page>{
        return this.page;
    }

    async addWaitforThePage(milliseconds : number){
        return this.page.waitForTimeout(milliseconds)
    }
    
    async waitForPageToLoad(){
        return (await this.getPage()).waitForLoadState("domcontentloaded");
    }

    async navigateToSpendflo():Promise<Response | null>{
        return this.page.goto(this.baseUrl);
    }

    async enterEmailAndContinue(email:string){
        await this.emailField.fill(email);
        await this.emailField.press("Enter");
    }

    async enterPasswordandSignin(password:string){
        await this.passwordField.fill(password);
        await this.siginButton.click();
    }

    async clickOnskipForNowButton():Promise <void>{
        await this.skipforNowButton.waitFor({ state: 'visible', timeout: 10000 });
        return this.skipforNowButton.click();
    }

    async clickOnpendoGuideCloseButton():Promise <void>{
        await this.pendoguideCloseButton.waitFor({ state: 'visible', timeout: 10000 });
        return this.pendoguideCloseButton.click();
    }


    async checkIforgNameisdisplayed():Promise<boolean>{
        return await this.orgNameLocatorFromNavbar.count() > 0
    }

    async fetchTheOrgNameFromNavBar(): Promise<string | null>{
        return this.orgNameLocatorFromNavbar.textContent();
    }

    async assignValuetothisOrgvariable(){
        this.orgName = await this.fetchTheOrgNameFromNavBar();
    }

    async clickOnOrgNameBoxFromTheNavbar(){
        return this.orgNameLocatorFromNavbar.click();
    }

    async fillTheOrgTobeSwithcedtoFromNavbar(orgtobeswitchedto:string){
       this.orgToBeSwitchedTo = orgtobeswitchedto;
       return this.orgSearch.fill(orgtobeswitchedto);
    }

    async clickOnTheOrgTobeSwitchedToFromNavbar(){
       return this.page.locator(`//button/p[text()='${this.orgToBeSwitchedTo}']`).click();

    }

    async getOrgNameValue():Promise<string | null>{
       return this.orgName
    }
    
    getEnv(){
        if(this.baseUrl.includes("app")){
            return "app"
        }
        else{
            return "test"
        }
    }

    getBaseUrl(){
        return this.baseUrl;
    }

    getTaskHeader(){
        return this.myTasksHeader;
    }

    getCommentsFeedHeader(){
        return this.commentsFeedHeader
    }
    
    getMyRequestHeader(){
        return this.myRequestsHeader;
    }

    getUpcomingRenewalsHeader(){
        return this.upcomingRenewalsHeader;
    }

}