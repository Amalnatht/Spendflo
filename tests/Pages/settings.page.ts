import { Page, Locator, expect, Response } from '@playwright/test';

export class SettingsPage {
    private page: Page;
    private settingsbutton: Locator;
    private woflowsSection: Locator;


    constructor(page: Page) {
        this.page = page;
        this.settingsbutton = page.locator('//img[@alt="GearUnfilled"]');
        this.woflowsSection = page.getByText('Workflows');
    }


    async navigateToWorkflowsSection(): Promise<void> {
        await this.settingsbutton.click();
        await this.woflowsSection.click();
    }

    
}