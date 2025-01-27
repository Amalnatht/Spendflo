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
    }

    /**
     * Combined method: Navigate to Spendflo, login, and handle "Skip for now" button
     */
    async navigateAndLogin(email: string, password: string): Promise<void> {
        // Navigate to the base URL
        await this.page.goto(this.baseUrl);

        // Fill in email and press Enter
        await this.emailField.fill(email);
        await this.emailField.press("Enter");

        // Fill in password and click "Sign in"
        await this.passwordField.fill(password);
        await this.siginButton.click();

        // Check and click "Skip for now" button if visible
        await this.page.waitForLoadState();
        try {
            await this.skipforNowButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.skipforNowButton.click();
        } catch (error) {
            // Gracefully handle if the button is not found
            return;
        }
    }

    async checkforpendoGuideandClose(): Promise<void> {
        await this.page.waitForLoadState('domcontentloaded');
        try {
            await this.pendoguideCloseButton.waitFor({ state: 'visible', timeout: 10000 });
            await this.pendoguideCloseButton.click();
        } catch (error) {
            return;
        }
    }

    async fetchTheOrgnamefromNavBar(): Promise<boolean> {
        try {
            if (await this.orgNameLocatorFromNavbar.count() > 0) {
                await this.page.waitForTimeout(5000);
                this.orgName = await this.orgNameLocatorFromNavbar.textContent();
                return true;
            }
        } catch (error) {
            console.log("Orgname not visible in the navbar", error);
        }
        return false;
    }

    async switchToDesiredorg(orgtobeswitchedto: string): Promise<void> {
        if (this.orgName !== "Spendfloone" && this.orgName !== "test-org") {
            await this.orgNameLocatorFromNavbar.click();
            await this.orgSearch.fill(orgtobeswitchedto);
            await this.page.locator(`//button/p[text()='${orgtobeswitchedto}']`).click();

            await this.page.waitForTimeout(4000);
            this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            while (!this.orgName) {
                await this.page.waitForTimeout(500);
                this.orgName = await this.orgNameLocatorFromNavbar.textContent();
            }

            if (this.orgName !== orgtobeswitchedto) {
                throw new Error("Organization switch Failed");
            }
        }
    }

    async loginsuccessful(): Promise<void> {
        await Promise.all([
            expect(this.page).toHaveURL(this.baseUrl),
            expect(this.page).toHaveTitle('Spendflo'),
            expect(this.myTasksHeader).toBeVisible(),
            expect(this.commentsFeedHeader).toBeVisible(),
            expect(this.myRequestsHeader).toBeVisible(),
            expect(this.upcomingRenewalsHeader).toBeVisible(),
        ]);
    }
}