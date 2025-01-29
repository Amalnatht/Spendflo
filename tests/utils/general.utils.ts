import { Page, Locator, expect, Response } from '@playwright/test';

  export function getFormattedDateTime() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Months are 0-based, so add 1
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours().toString().padStart(2, '0');  // Ensure 2 digits
    let minutes = currentDate.getMinutes().toString().padStart(2, '0');  // Ensure 2 digits
    let seconds = currentDate.getSeconds().toString().padStart(2, '0');  // Ensure 2 digits
    
    return `${month}/${date}/${year} ${hours}:${minutes}:${seconds}`;
  }
  
  export function generateRandomText(length:number){
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }



  export async function draganddrop(source : Locator ,target : Locator ,page:Page){
    await page.waitForTimeout(5000);
    let sourceBox = await source.boundingBox();
    let targetBox = await target.boundingBox();
    
    
    if (sourceBox && targetBox) {
      const sourceCenterX = sourceBox.x + sourceBox.width / 2;
      const sourceCenterY = sourceBox.y + sourceBox.height / 2;
      const targetCenterX = targetBox.x + targetBox.width / 2;
      const targetCenterY = targetBox.y + targetBox.height / 2;
    
      // Move to the source center and start the drag
      await page.mouse.move(sourceCenterX, sourceCenterY);
      await page.mouse.down();
    
    
    
      // Move in steps to simulate the drag smoothly
      const steps = 7;
      for (let i = 1; i <= steps; i++) {
          const x = sourceCenterX + ((targetCenterX - sourceCenterX) / steps) * i;
          const y = sourceCenterY + ((targetCenterY - sourceCenterY) / steps) * i;
          await page.mouse.move(x, y);
          await page.waitForTimeout(50);  // Small delay between steps
      }
    
      // Release the mouse button at the target location
      await page.mouse.up();
    
      console.log("Drag and drop happened");
    }
    
    else {
      // Log an error or handle the case where boundingBox is null
      console.error('Either the source or target element is not visible or interactable.');
    }
    
    await page.waitForTimeout(3000);
    }