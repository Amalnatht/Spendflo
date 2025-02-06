import { Page, Locator, expect, Response } from '@playwright/test';
import { generateRandomText,dates } from '../utils/agreements.utils';
import { NullLiteral } from 'typescript';

export class AgreementCreationPage {
    page: Page;

    // Navigation and Initial Actions
    private navBarvendorManagementButton: Locator;
    private navBaragreementsTab: Locator;
    private addAgreementButton: Locator;
    private othersOption: Locator;
    private subscriptionOption: Locator;
    private contractOption: Locator;

    // Uploading Document for Contract Creation
    private fileInput: Locator;
    private continueButton: Locator;
    private createProductAndVendorURL: string;

    // Vendor Details
    private vendorNameInput: Locator;
    private addVendorDropdownButton: Locator;
    private vendorWebsiteInput: Locator;
    private addVendorButton: Locator;
    private saveAndContinueButton: Locator;
    private vendorEmail: string;
    private addAgreementManually :  Locator;

    // Agreement Details
    private startDateInput: Locator;
    private endDateInput: Locator;
    private costInput: Locator;
    private firstQuoteInput: Locator;
    private paymentTermsDropdownButton: Locator;
    private paymentTermsNet30Option: Locator;
    private billingFrequencyDropdownButton: Locator;
    private billingFrequencyMonthlyOption: Locator;
    private agreementOwnerInput: Locator;
    private agreementOwnerSelect: Locator;
    private contractedCost :string;
    private firstQuote:string;

    // Line Item Details
    private addLineItemButton: Locator;
    private lineItemTypeDropdownButton: Locator;
    private licenseInfoOption: Locator;
    private offeringNameInput: Locator;
    private addOfferingButton: Locator;
    private createOfferingButton : Locator;
    private planInput: Locator;
    private offeringCost :Locator;
    private pricingModelDropdownButton: Locator;
    private userBasedPerSeatOption: Locator;
    private checkboxRole: Locator;
    private lineItemEa :Locator;
    private numberOfUnitsInput: Locator;
    private unitCostInput: Locator;
    private unitTypeDropdownButton: Locator;
    private userTypeOption: Locator;
    private periodDropdownButton: Locator;
    private perMonthOption: Locator;
    private numberOfUnitsValue:string;
    private offeringCostValue:string;


    // Second Line Item Details
    private secondLineItemTypeDropdownButton: Locator;
    private secondLineItemtypeSelection: Locator;
    private secondLicenseLineItemSelection: Locator;
    private secondLicensePerSeatOption: Locator;
    private descriptionInput: Locator;
    private secondPlanInputLicense: Locator;
    private pricingDetailsSecondDropdown: Locator;
    private pricingModelFixedOption: Locator;
    private pricingModelUnitBasedOption: Locator;
    private thresholdInput: Locator;
    private amountInput: Locator;
    private unitTypeDropdownSecondButton: Locator;
    private userTypeSecondOption: Locator;
    private periodDropdownSecondButton: Locator;
    private perMonthSecondOption: Locator;

    // Final Actions
    private finalSaveAndContinueButton: Locator;
    private continueToViewAgreementButton: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation and Initial Actions
        this.navBarvendorManagementButton = page.locator("//h5[text()='Vendor Management']");
        this.navBaragreementsTab = page.locator("//h5[text()='Agreements']");
        this.addAgreementButton = page.locator("//p[text()='+ Add Agreement']");
        this.othersOption= page.locator("//span[text()='Others']");
        this.subscriptionOption= page.locator("//span[text()='Subscription']");
        this.contractOption= page.locator("//span[text()='Contract']");

        // Uploading Document for Contract Creation
        this.fileInput = page.locator("input[type='file']");
        this.continueButton = page.locator("//button[contains(text(),'Continue')]");
        this.createProductAndVendorURL = "https://app.spendflo.com/create/product-and-vendor-v2";

        // Vendor Details
        this.vendorNameInput = page.locator("//input[@name='Vendor Name']");
        this.addVendorDropdownButton = page.locator("//button//span//p");
        this.vendorWebsiteInput = page.locator("//input[@placeholder='Enter URL']");
        this.addVendorButton = page.locator("//p[text()='Add Vendor']");
        this.saveAndContinueButton = page.locator("//p[text()='Save & Continue']");
        this.vendorEmail="www.example.com";
        this.addAgreementManually= page.locator("//p[text()='Add agreement manually']");

        // Agreement Details
        this.startDateInput = page.locator("//input[@id='startDate']");
        this.endDateInput = page.locator("//input[@id='endDate']");
        this.costInput = page.locator("//input[@name='cost']");
        this.firstQuoteInput = page.locator("//input[@name='firstQuote']");
        this.paymentTermsDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[3]");
        this.paymentTermsNet30Option = page.locator("//span[text()='Net 30']");
        this.billingFrequencyDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[4]");
        this.billingFrequencyMonthlyOption = page.locator("//span[text()='Monthly']");
        this.agreementOwnerInput = page.locator("//input[@name='Agreement Owner']");
        this.agreementOwnerSelect = page.locator("//span[text()='Huda One']");
        this.contractedCost="1000";
        this.firstQuote="1500";
        // Line Item Details
        this.addLineItemButton = page.locator("//p[text()='+ Add Line Item']");
        this.lineItemTypeDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[6]");
        this.lineItemEa =page.locator('//span[text()="Ea"]');
        this.licenseInfoOption = page.locator("//span[text()='License Info']");
        this.offeringNameInput = page.locator("//input[@name='Offering Name']");
        this.createOfferingButton =page.locator("//button//span//p");
        this.addOfferingButton = page.locator("//p[text()='Add Offering']");
        this.offeringCost = page.locator('(//input[@name="cost"])[2]');
        this.planInput = page.locator("//input[@name='plan']");
        this.pricingModelDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[7]");
        this.userBasedPerSeatOption = page.locator("//span[text()='User-based: Per Seat']");
        this.checkboxRole = page.locator("//span[@role='checkbox']");
        this.numberOfUnitsInput = page.locator("//input[@name='numberOfUnits']");
        this.unitCostInput = page.locator("(//input[@name='cost'])[2]");
        this.unitTypeDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[8]");
        this.userTypeOption = page.locator("//span[text()='User']");
        this.periodDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[9]");
        this.perMonthOption = page.locator("//span[text()='Per Month']");
        this.numberOfUnitsValue ="10";
        this.offeringCostValue="100";

        // Second Line Item Details
        this.secondLineItemTypeDropdownButton = page.locator("(//button[@aria-haspopup='listbox'])[10]");
        this.secondLineItemtypeSelection = page.locator("//span[text()=`${secondLineItemType}`]");
        this.secondLicenseLineItemSelection = page.locator("(//span[text()=`${secondLineItemType}]`)[2]");
        this.secondLicensePerSeatOption = page.locator('(//span[text()="User-based: Per Seat"])[2]');
        this.descriptionInput = page.locator("//input[@name='description']");
        this.secondPlanInputLicense = page.locator('(//input[@name="plan"])[2]');
        this.pricingDetailsSecondDropdown = page.locator('(//button[@aria-haspopup="listbox"])[11]');
        this.pricingModelFixedOption = page.locator("//span[text()='Fixed']");
        this.pricingModelUnitBasedOption = page.locator("//span[text()='Fixed: Unit Based']");
        this.thresholdInput = page.locator("//input[@name='threshold']");
        this.amountInput = page.locator("(//input[@name='amount'])[2]");
        this.unitTypeDropdownSecondButton = page.locator("(//button[@aria-haspopup='listbox'])[12]");
        this.userTypeSecondOption = page.locator("(//span[text()='User'])[2]");
        this.periodDropdownSecondButton = page.locator("(//button[@aria-haspopup='listbox'])[13]");
        this.perMonthSecondOption = page.locator("(//span[text()='Per Month'])[2]");

        // Final Actions
        this.finalSaveAndContinueButton = page.locator("//p[text()='Save & Continue']");
        this.continueToViewAgreementButton = page.locator("//p[text()='Continue to view Agreement']");
    }

    async clickVendorManagementTab():Promise<void |null >{
        return this.navBarvendorManagementButton.click();

    }

    async navigateToAgreementsPage():Promise<void | null>{
        await this.navBaragreementsTab.click();
    }

    async addAgreements():Promise<void | null>{
        await this.addAgreementButton.click();

    }

    async clickOthersOption():Promise<void>{
        return this.othersOption.click();
    }

    async clickSubscriptionOption():Promise<void>{
        return this.subscriptionOption.click();
    }

    async clickContractOption():Promise<void>{
        return this.contractOption.click();
    }

    async clickAddAgreementManually():Promise<void>{
        return this.addAgreementManually.click();
    }

    async enterVendorName():Promise<void>{
        await this.vendorNameInput.fill(generateRandomText(5));
        await this.addVendorDropdownButton.click();
    }

    async enterVendorEmail():Promise<void | null>{
        return this.vendorWebsiteInput.pressSequentially(this.vendorEmail);
    }

    async addVendor():Promise<void |null>{
        return this.page.getByText("Add Vendor").click();

    }

    async clickSaveAndContinue():Promise<void |null>{
        return this.saveAndContinueButton.click();
    }

    async enterStartDate(): Promise<void> {
        const { startDate } = dates();
        await this.startDateInput.fill(startDate);
    }
    
    async enterEndDate(): Promise<void> {
        const { startMinusOne } = dates();
        await this.endDateInput.fill(startMinusOne);
    }
    
    async enterContractedCost(): Promise<void|null> {
        return this.costInput.fill(this.contractedCost);
    }
    
    async enterFirstQuote(): Promise<void|null> {
        return this.firstQuoteInput.fill(this.firstQuote);
    }
    
    async selectPaymentTerms(): Promise<void> {
        await this.paymentTermsDropdownButton.click();
        await this.paymentTermsNet30Option.click();
    }
    
    async selectBillingFrequency(): Promise<void> {
        await this.billingFrequencyDropdownButton.click();
        await this.billingFrequencyMonthlyOption.click();
    }
    
    async enterAgreementOwner(): Promise<void> {
        await this.agreementOwnerInput.pressSequentially("Huda One");
        await this.agreementOwnerSelect.click();
    }

     async saveAgreementDetails():Promise<void>{
        await this.saveAndContinueButton.click();
        await this.continueToViewAgreementButton.click();
     }

     async clickAddLineItemButton(): Promise<void> {
        await this.addLineItemButton.click();
    }
    
    async enterOfferingName(): Promise<string> {
        const offeringName = generateRandomText(5);
        await this.offeringNameInput.fill(offeringName);
        return offeringName; // Returning in case it's needed elsewhere
    }
    
    async clickCreateOfferingButton(): Promise<void> {
        await this.createOfferingButton.click();
    }
    
    async clickAddOfferingButton(): Promise<void> {
        await this.addOfferingButton.click();
    }
    
    async enterNumberOfUnits(): Promise<void> {
        await this.numberOfUnitsInput.fill(this.numberOfUnitsValue);
    }
    
    async enterOfferingCost(): Promise<void> {
        await this.offeringCost.fill(this.offeringCostValue);
    }
    
    async selectLineItemType(): Promise<void> {
        await this.lineItemTypeDropdownButton.click();
        await this.lineItemEa.click();
    }

    async clickContinueToViewAgreement(): Promise<void>{
        return this.continueToViewAgreementButton.click();
    }


}
