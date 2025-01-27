import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect, Locator } from "@playwright/test";
import { LoginPage } from "../../Pages/login.page";
import * as usersData from "../../../Data/login.data.json";
import { Users } from "../../../Data/login.data.interface";

setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let users: Users = usersData;

let loginPage: LoginPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page, "https://app.spendflo.com"); // Updated to include baseUrl
});

// Updated: Combined step for navigation and login
When("User navigates to Login page and logs in with credentials for user {string}", async function (user: string) {
  const userDetails = users[user];
  await loginPage.navigateAndLogin(userDetails.email, userDetails.password);
});

Then("User should be signed in", async function () {
  await loginPage.loginsuccessful();
  // const ss = await loginPage.page.screenshot({ path: 'screenshot.png' });
});

When("Close Featurewalkthrough if exists", async function () {
  await loginPage.checkforpendoGuideandClose();
});

Then("Switch organization to {string} if user is superadmin", async function (orgname: string) {
  let result = await loginPage.fetchTheOrgnamefromNavBar();
  if (result) {
    await loginPage.switchToDesiredorg(orgname);
  } else {
    console.log("User logged in as non superadmin");
  }
});

After(async function () {
  await browser.close();
});