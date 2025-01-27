import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";
import { getEnvironmentUrl } from "../../utils/environment.utils";

setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser; 

let users : Users = usersData;

let loginPage : LoginPage;
let loginUtils : LoginUtils

Before(async function () {
  browser = await chromium.launch({ headless: false   });
  const context = await browser.newContext();
  page = await context.newPage();

});

Given("Superadmin {string} logs in to {string} and switches to {string} organization",  async function(user : string, env : string ,orgname : string){
    const url = getEnvironmentUrl(env);
    loginPage = new LoginPage(page, url);
    loginUtils = new LoginUtils(loginPage);
    const userDetails = users[user];
    await loginUtils.loginAsSuperadmin(userDetails.email,userDetails.password,orgname)
})

// Given("User {string} logs in to {string}",  async function(user : string , env : string){
//   const userDetails = users[user];
//   const url = getEnvironmentUrl(env);
//   loginPage = new LoginPage(page, url);
//   loginUtils = new LoginUtils(loginPage);
//   await loginUtils.loginAsUser(userDetails.email,userDetails.password)
// })

Then("User navigates to settings workflows page",async function(){
    const settingsbutton = page.locator('//img[@alt="GearUnfilled"]');
    await settingsbutton.click();
    const workflows = page.getByText('Workflows');
    await workflows.click();
})