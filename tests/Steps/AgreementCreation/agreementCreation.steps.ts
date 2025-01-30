import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { AgreementCreationPage } from "../../Pages/agreements.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";
import { getEnvironmentUrl } from "../../utils/environment.utils";


setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let users : Users = usersData;

let loginPage : LoginPage;
let loginUtils : LoginUtils;
let agreementCreation : AgreementCreationPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
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
    return agreementCreation.navigatetoAgreementsPage();  
})

Then ("User selects Others-Contract option for contract creation",async function()
{
    await agreementCreation.chooseAgreementType("Contract", "Others");
    await page.getByText("Add agreement manually").click();
})

Then("User enters Vendor details",async function()
{
    return agreementCreation.enterVendorDetails();
})

Then("User fills Agreement details",async function()
{
    return agreementCreation.fillAgreementDetails();
})

Then("User creates Line-item",async function()
{
    return agreementCreation.addLineItemOthers();
})

Then("User saves the Agreement",async function()
{
    return agreementCreation.saveAgreementDetails();
})

After(async function () {
  await browser.close();
});