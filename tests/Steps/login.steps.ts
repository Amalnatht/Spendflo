import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";
import { LoginPage } from "../Pages/Login.page";

setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let userDetails : {email:string ,pwd : string } = { email: '', pwd: '' };
let loginPage : LoginPage;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
  loginPage = new LoginPage(page);
});

Given("User navigates to Login page", async () => {
    await loginPage.NavigatetoSpendflo();
});

When("User Enters details and clicks on Sign in with credentials from row {int}", async function (this:any, rowIndex: Number, dataTable:DataTable) {


  const selectedRow = dataTable.rows()[Number(rowIndex)  - 1]; // Convert to 0-based index
  userDetails = {
    email: selectedRow[0],
    pwd: selectedRow[1],
  };

  await loginPage.enterEmailandContinue(userDetails.email);
  await loginPage.enterPasswordandSigin(userDetails.pwd);
});

When("Click on skip for now if visible", async function () {
  await loginPage.checkforskipfornowbuttonandclick();
});


Then("User should be signed in", async function(){  
    await expect(page).toHaveURL("https://app.spendflo.com/");
})

When("Check if pendo is visible and close it", async function(){  
    await loginPage.checkforpendoGuideandClose();
})


Then("Switch organization if it's not spendfloone or testorg to {string}",async function(orgname:string){
      await loginPage.fetchTheOrgnamefromNavBar();
      await loginPage.switchToDesiredorg(orgname);

})

After(async function () {
  await browser.close();
});
