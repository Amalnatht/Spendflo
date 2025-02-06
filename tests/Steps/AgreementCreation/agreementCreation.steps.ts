import { Given, When, Then, Before, After,AfterAll, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { AgreementCreationPage } from "../../Pages/agreements.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";
import { getEnvironmentUrl } from "../../utils/environment.utils";
import fs from 'fs';
import { exec } from "child_process";


setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let users : Users = usersData;

let loginPage : LoginPage;
let loginUtils : LoginUtils;
let agreementCreation : AgreementCreationPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
   const context = await browser.newContext({
    recordVideo: { dir: 'videos/' }, // Save videos in the "videos" directory
  })
  //const context = await browser.newContext();
  page = await context.newPage();
  agreementCreation = new AgreementCreationPage(page);
});

// Given("User {string} logs in",  async function(user : string){
//   const userDetails = users[user];
//   await loginUtils.loginAsUser(userDetails.email,userDetails.password)
// })

Given("User {string} logs in to {string} org in {string}",  async function(user : string , org : string, env:string){
  const userDetails = users[user];
  const url = getEnvironmentUrl(env);
  loginPage = new LoginPage(page, url);
  loginUtils = new LoginUtils(loginPage);
  await loginUtils.loginAsUser(userDetails.email,userDetails.password)
})


Then("User navigates to Agreements page",async function()
{
    await agreementCreation.clickVendorManagementTab();
    await agreementCreation.navigateToAgreementsPage(); 
    await agreementCreation.addAgreements();
})

// Creating a Map to hold the combinations and corresponding functions
const agreementTypeMap = new Map<string, () => Promise<void>>();

// Initialize the Map with the options for the agreement type and category
agreementTypeMap.set("Contract-Others", async () => await agreementCreation.clickOthersOption());
agreementTypeMap.set("Subscription-Others", async () => {
    await agreementCreation.clickOthersOption();
    await agreementCreation.clickSubscriptionOption();
});
agreementTypeMap.set("Subscription-Software", async () => await agreementCreation.clickSubscriptionOption());
agreementTypeMap.set("Contract-Software", async () => await agreementCreation.clickContractOption());

When("User selects {string} - {string} option for Agreement creation", async function (agreementType: string, agreementCategory: string) {
    const key = `${agreementType}-${agreementCategory}`;
    console.log(`Executing action for key: ${key}`); // Debugging log
    const action = agreementTypeMap.get(key); // Retrieve the corresponding action

    if (action) {
        await action(); 
    } else {
        console.error(`No action found for the combination: ${key}`);
    }
});

Then("User continues to Agreement Creation",async function(){
  await agreementCreation.clickAddAgreementManually();
})

Then("User enters Vendor details",async function()
{
    await agreementCreation.enterVendorName();
    await agreementCreation.enterVendorEmail();
    await agreementCreation.addVendor();
    await agreementCreation.clickSaveAndContinue();
})

Then("User fills Agreement details",async function()
{
    await agreementCreation.enterStartDate();
    await agreementCreation.enterEndDate();
    await agreementCreation.enterContractedCost();
    await agreementCreation.enterFirstQuote();
    await agreementCreation.selectPaymentTerms();
    await agreementCreation.selectBillingFrequency();
    await agreementCreation.enterAgreementOwner();
})

Then("User creates Line-item",async function()
{
    await agreementCreation.clickAddLineItemButton();
    await agreementCreation.enterOfferingName();
    await agreementCreation.clickCreateOfferingButton();
    await agreementCreation.clickAddOfferingButton();
    await agreementCreation.enterNumberOfUnits();
    await agreementCreation.enterOfferingCost();
    await agreementCreation.selectLineItemType();
})

Then("User saves the Agreement",async function()
{
    await agreementCreation.clickSaveAndContinue();
    await agreementCreation.clickContinueToViewAgreement();
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
      console.log("video has been attached to the report")
    }

    await page.close();
  }

  if (browser) {
    await browser.close();
  }
});

AfterAll(async function () {
  exec("ts-node generateReporter.ts", (err, stdout, stderr) => {
    if (err) {
      console.error("Error generating HTML report:", err);
    } else {
      console.log("Cucumber HTML report generated successfully!");
    }
  });
})
