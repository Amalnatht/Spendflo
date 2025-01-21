import { Page, Locator } from 'playwright';

class LoginPage{
    private readonly baseUrl: string = 'https://app.spendflo.com';
    private page : Page;
    private emailField : Locator;
    private passwordField : Locator;
    private continueButton : Locator;
    private siginButton : Locator;
    private skipforNowButton : Locator;
    private pendoguideCloseButton : Locator;
    private orgNameLocatorFromNavbar : Locator;
    private orgName: string | null;
    private orgSearch : Locator;

    constructor(page : Page){
        this.page = page;
        this.emailField = page.locator('//input[@name="identifier"]');
        this.passwordField = page.locator('//input[@name="password"]');
        this.continueButton = page.locator(`'button:has-text("Continue")'`);
        this.siginButton = page.locator('button:has-text("Sign in")');
        this.skipforNowButton = page.getByText('Skip for now');
        this.pendoguideCloseButton = page.locator('//div[@id="pendo-base"]//button[@aria-label="Close"]');
        this.orgNameLocatorFromNavbar = page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
        this.orgName= "";
        this.orgSearch = page.locator("//input[@name='orgsearch']");
    }

    async NavigatetoSpendflo():Promise<void>{
        await this.page.goto(this.baseUrl);
    }

    async enterEmailandContinue(email:string):Promise<void>{
        await this.emailField.fill(email);
        await this.continueButton.click();
    }
    
    async enterPasswordandSigin(pwd:string):Promise<void>{
        await this.passwordField.fill(pwd);
        await this.siginButton.click();
    }

    async checkforskipfornowbuttonandclick():Promise<void>{

        let retries =  1;
        try{
            while(retries<=7){
                if (await this.skipforNowButton.count() > 0 ) {
                    await this.skipforNowButton.isEnabled();
                    await this.skipforNowButton.click();
                    return;
                }
                await this.page.waitForTimeout(500);
                retries++;
            }
            if (retries==7){
                throw new Error ("Skip for now not present")
            }
        }
        catch(error){
            throw error;
            return;
        }


    }

    async checkforpendoGuideandClose():Promise<void>{
        await this.page.waitForLoadState('domcontentloaded');
        if (await this.pendoguideCloseButton.count() > 0) { 
            if (await this.pendoguideCloseButton.isEnabled()) {
                await this.pendoguideCloseButton.click();
            } else {
                throw new Error ("Pendoguide present but not enabled")
            }
        }
    }

    async fetchTheOrgnamefromNavBar():Promise<void>{
        if(await this.orgNameLocatorFromNavbar.count()>0){
            this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            while(!this.orgName){
                await this.page.waitForTimeout(200);  
                this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            }
        }
    }

    async switchToDesiredorg(orgtobeswitchedto:string):Promise<void>{
        if(this.orgName!=="Spendfloone" && this.orgName!=="test-org"){
            await this.orgNameLocatorFromNavbar.click();
            await this.orgSearch.fill(orgtobeswitchedto);
            await this.page.locator(`//button/p[text()='${orgtobeswitchedto}']`).click();

            await this.page.waitForLoadState('load');
            this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            while(!this.orgName){
                await this.page.waitForTimeout(200);  
                this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            }
            
            if(this.orgName!==orgtobeswitchedto){
                throw new Error ("Organization switch Failed")
            }
            
        }
        
    }

}