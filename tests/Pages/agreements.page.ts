import { Page, Locator, expect, Response } from '@playwright/test';
import { generateRandomText,dates } from '../utils/Loginutils/agreements.utils';

export class AgreementCreationPage {
    page: Page;

    // Navigation and Initial Actions
    private navBarvendorManagementButton: Locator;
    private navBaragreementsTab: Locator;
    private addAgreementButton: Locator;
    private othersOption: Locator;

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
    //private addAgreementManually : String;

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

    async navigatetoAgreementsPage():Promise<void>{
        await this.navBarvendorManagementButton.click();
        await this.navBaragreementsTab.click();

    }

    async chooseAgreementType():Promise<void>{
        await this.addAgreementButton.click()
        await this.othersOption.click();
    }

    async enterVendorDetails():Promise<void>{
        await this.vendorNameInput.fill(generateRandomText(5));
        await this.addVendorDropdownButton.click();
        const vendorEmail= "www.example.com";
        await this.vendorWebsiteInput.pressSequentially(vendorEmail);
        await this.page.getByText("Add Vendor").click();
        await this.saveAndContinueButton.click();
    }

    async fillAgreementDetails():Promise<void>{
        const {startDate, startMinusOne}= dates();
        await this.startDateInput.fill(startDate);
        await this.endDateInput.fill(startMinusOne);
        //contracted cost and FQ input
        await this.costInput.fill("1000");
        await this.firstQuoteInput.fill("1500");
        //Payment terms dropdown
        await this.paymentTermsDropdownButton.click();
        await this.paymentTermsNet30Option.click();
        //Billing frequency dropdown
        await this.billingFrequencyDropdownButton.click();
        await this.billingFrequencyMonthlyOption.click();
        //Agreement owner addition
        await this.agreementOwnerInput.pressSequentially("Huda One");
        await this.agreementOwnerSelect.click();
    }

     async saveAgreementDetails():Promise<void>{
        await this.saveAndContinueButton.click();
        await this.continueToViewAgreementButton.click();
     }

     async addLineItemOthers():Promise<void>{
        await this.addLineItemButton.click();
        //Line-item creation
        const offeringName= generateRandomText(5);
        await this.offeringNameInput.fill(offeringName);
        await this.createOfferingButton.click();
        await this.addOfferingButton.click();

        //Line-item details
        await this.numberOfUnitsInput.fill('10');
        await this.offeringCost.fill('100');
        await this.lineItemTypeDropdownButton.click();
        await this.lineItemEa.click();
     }


}
