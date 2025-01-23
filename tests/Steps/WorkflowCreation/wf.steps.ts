import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";

setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let users : Users = usersData;

let loginPage : LoginPage;
let loginUtils : LoginUtils

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
  loginUtils = new LoginUtils(loginPage);
});

Given("Superadmin {string} logs in and switches to {string} organization",  async function(user : string, orgname : string){
    const userDetails = users[user];
    await loginUtils.loginAsUser(userDetails.email,userDetails.password,orgname)
})

Then("User navigates to settings workflows page",async function(){
    const settingsbutton = await page.locator('//img[@alt="GearUnfilled"]');
await settingsbutton.click();
const workflows = await page.getByText('Workflows');
await workflows.click();
})