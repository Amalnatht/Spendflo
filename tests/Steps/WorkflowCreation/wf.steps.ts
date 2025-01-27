import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import { LoginUtils } from "../../utils/Loginutils/login.utils";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";
import { getEnvironmentUrl } from "../../utils/environment.utils";
import * as utils from "../../utils/generalutils";

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
   await utils.handleTestExecution("Superadmin logs in to env and switches to org", async () => {
    const url = getEnvironmentUrl(env);
    loginPage = new LoginPage(page, url);
    loginUtils = new LoginUtils(loginPage);
    const userDetails = users[user];
    return await loginUtils.loginAsSuperadmin(userDetails.email,userDetails.password,orgname)
   })
})

Then("User navigates to settings workflows page",async function(){
    await utils.handleTestExecution("User navigates to settings workflows page", async () => {
      try{
        const settingsbutton = page.locator('//img[@alt="GearUnfilled"]');
        await settingsbutton.click();
        const workflows = page.getByText('Workflows');
        await workflows.click();
        return true;
      }
      catch(error){
        return false;
      }
    });
})