import { LoginPage } from "../../Pages/login.page";
import { Page, Locator, expect, Response } from '@playwright/test';
export class LoginUtils {
    private organization : string | null
    constructor(private loginpage: LoginPage) {
        this.organization = "";
    }


    async loginAsSuperadmin(email: string, password: string, orgname: string) {
        try {
            // Updated to use the new navigateAndLogin method
            await this.navigateAndLogin(email, password);
            await this.loginsuccessful();
            await this.checkforpendoGuideandClose();
            await this.fetchTheOrgnamefromNavBar();
            await this.switchToDesiredorg(orgname);
        } catch (error) {
            throw new Error(`Login as superadmin failed: ${error}`);
        }
    }

    async loginAsUser(email: string, password: string) {
        try {
            // Updated to use the new navigateAndLogin method
            await this.navigateAndLogin(email, password);
            await this.loginsuccessful();
            await this.checkforpendoGuideandClose();
        } catch (error) {
            throw new Error(`Login as Non-superadmin failed: ${error}`);
        }
    }

    //   Combined method: Navigate to Spendflo, login, and handle "Skip for now" button

    async navigateAndLogin(email: string, password: string): Promise<void> {
        await this.loginpage.navigateToSpendflo();
        await this.loginpage.enterEmailAndContinue(email);
        await this.loginpage.enterPasswordandSignin(password);


        // Check and click "Skip for now" button if visible
        await this.loginpage.waitForPageToLoad();
        try {
            this.loginpage.clickOnskipForNowButton();
        } catch (error) {
            // Gracefully handle if the button is not found
            return;
        }
    }



    async checkforpendoGuideandClose(): Promise<void> {
        await this.loginpage.waitForPageToLoad();
        try {
            this.loginpage.clickOnpendoGuideCloseButton();
        } catch (error) {
            return;
        }
    }



    async fetchTheOrgnamefromNavBar(): Promise<boolean> {
        try {
            if (await this.loginpage.checkIforgNameisdisplayed()) {
                await this.loginpage.addWaitforThePage(5000)
                this.organization = await this.loginpage.getOrgNameValue();
                return true;
            }
        } catch (error) {
            console.log("Orgname not visible in the navbar", error);
        }
        return false;
    }    


    async switchToDesiredorg(orgtobeswitchedto: string): Promise<void> {
        if(this.loginpage.getEnv()==="app"){

        if (await this.loginpage.getOrgNameValue() !== "Spendfloone" && await this.loginpage.getOrgNameValue() !== "test-org") {
            await this.loginpage.clickOnOrgNameBoxFromTheNavbar();
            await this.loginpage.fillTheOrgTobeSwithcedtoFromNavbar(orgtobeswitchedto);
            await this.loginpage.clickOnTheOrgTobeSwitchedToFromNavbar();

            await this.loginpage.addWaitforThePage(5000);
            this.organization = await this.loginpage.fetchTheOrgNameFromNavBar();
            while (!this.loginpage.getOrgNameValue()) {
                await this.loginpage.addWaitforThePage(5000);
                this.organization = await this.loginpage.fetchTheOrgNameFromNavBar();
            }
            if (await this.loginpage.getOrgNameValue() !== orgtobeswitchedto) {
                throw new Error("Organization switch Failed");
            }
        }

        }
        else {
            await this.loginpage.clickOnOrgNameBoxFromTheNavbar();
            await this.loginpage.fillTheOrgTobeSwithcedtoFromNavbar(orgtobeswitchedto);
            await this.loginpage.clickOnTheOrgTobeSwitchedToFromNavbar();

            await this.loginpage.addWaitforThePage(5000);
            this.organization = await this.loginpage.fetchTheOrgNameFromNavBar();
            while (!this.loginpage.getOrgNameValue()) {
                await this.loginpage.addWaitforThePage(5000);
                this.organization = await this.loginpage.fetchTheOrgNameFromNavBar();
            }
            if (await this.loginpage.getOrgNameValue() !== orgtobeswitchedto) {
                throw new Error("Organization switch Failed");
            }

        }
    } 


    async loginsuccessful(): Promise<void> {
        await Promise.all([
            expect(await this.loginpage.getPage()).toHaveURL(this.loginpage.getBaseUrl()),
            expect(await this.loginpage.getPage()).toHaveTitle('Spendflo'),
            expect(this.loginpage.getMyRequestHeader()).toBeVisible(),
            expect(this.loginpage.getCommentsFeedHeader()).toBeVisible(),
            expect(this.loginpage.getTaskHeader()).toBeVisible(),
            expect(this.loginpage.getUpcomingRenewalsHeader()).toBeVisible(),
        ]);
    }



    
}