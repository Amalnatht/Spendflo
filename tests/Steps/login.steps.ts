import { Given, When, Then, Before, After, setDefaultTimeout, DataTable } from "@cucumber/cucumber";
import { chromium, Browser, Page, expect , Locator } from "@playwright/test";

setDefaultTimeout(60 * 5000);

let page: Page;
let browser: Browser;

let skipForNowButton: Locator; 
let pendopopup :  Locator;
let orgNameLocator : Locator;
let  orgNameNavbar : String | null;
let userDetails : {email:string ,pwd : string } = { email: '', pwd: '' };

Before(async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();
});

Given("User navigates to Login page", async () => {
  await page.goto("https://app.spendflo.com");
});

When("User Enters details and clicks on Sign in with credentials from row {int}", async function (this:any, rowIndex: Number, dataTable:DataTable) {


  const selectedRow = dataTable.rows()[Number(rowIndex)  - 1]; // Convert to 0-based index
  userDetails = {
    email: selectedRow[0],
    pwd: selectedRow[1],
  };

    const emailfield = page.locator('//input[@name="identifier"]');
    
    await emailfield.click();
    await emailfield.pressSequentially(userDetails.email);
    await emailfield.press('Enter');
    
    const pwdfield = page.locator('//input[@name="password"]');
    await pwdfield.click();
    await pwdfield.pressSequentially(userDetails.pwd);
    
    await page.locator('button:has-text("Sign in")').click();
});

When("Skip for now is visible", async function () {
    await page.waitForLoadState();
    await page.waitForTimeout(8000);
    skipForNowButton = await page.getByText('Skip for now');
});

Then("Click on Skip for now button", async function(){
    console.log(await skipForNowButton.count(),"count for skip for now")
    if (await skipForNowButton.count() > 0) {
      // If the button exists, check if it is enabled and then click it
      if (await skipForNowButton.isEnabled()) {
        await skipForNowButton.click();
        console.log('Skip for now button clicked successfully');
      } else {
        console.log('Skip for now button is not enabled');
      }
    } else {
      // If the button does not exist, skip the interaction
      console.log('Skip for now button does not exist. Continuing...');
    }
    await page.waitForTimeout(4000);

})

Then("User should be signed in", async function(){  
    await expect(page).toHaveURL("https://app.spendflo.com/");
    await page.waitForTimeout(5000);
})

When("Pendo guide is visible", async function(){  
    await page.waitForLoadState('domcontentloaded');
    //pendo guide
    // Wait for the popup to appear with a timeout
    await page.waitForTimeout(7000);
    pendopopup = await page.locator('//div[@id="pendo-base"]//button[@aria-label="Close"]');

})

Then("Close the Pendo guide", async function(){
    if (await pendopopup.count() > 0) { // Check if the element exists
        if (await pendopopup.isEnabled()) { // Check if the element is enabled
            await pendopopup.click();
            console.log('Pendo popup closed successfully');
        } else {
            console.log('Pendo popup is not enabled');
        }
        } else {
        console.log('Pendo popup is not present on the page');
        }
})

When("Organization name is spendflo",async function(){
    const rocketlocator = await page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
    if(await rocketlocator.count()>0){

    //check if the org is "test-org"
    await page.waitForTimeout(7000);
    orgNameLocator = await page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
    await page.waitForTimeout(5000);
    orgNameNavbar = await orgNameLocator.textContent();
    console.log(orgNameNavbar);
    }
})
Then ("Switch organization to {string}",async function(orgname:string){
    if(orgNameNavbar=="spendflo"){
        await page.locator("(//span[text()='spendflo'])[1]/ancestor::button").click();
        await page.locator("//input[@name='orgsearch']").fill(orgname);
        await page.locator(`//button/p[text()='${orgname}']`).click();
        await page.waitForTimeout(3000);
        }
    
        // Break if the org is not test-org
        await page.waitForTimeout(9000);
        orgNameLocator = await page.locator('//img[@alt="Rocket"]/ancestor::div[2]/preceding-sibling::div[1]//span');
        orgNameNavbar = await orgNameLocator.textContent();
        if(orgNameNavbar!==orgname){
        console.log("ERROR : org switch didn't happen!")
        process.exit(0);
        }
})

After(async function () {
  await browser.close();
});
