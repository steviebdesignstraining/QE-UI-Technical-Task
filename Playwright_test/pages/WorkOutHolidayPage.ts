import { Page, Locator } from '@playwright/test';
import { workOutHolidaySelectors } from '../selectors/workOutHoliday.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class WorkOutHolidayPage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly fullYear: Locator;
  readonly starting: Locator;
  readonly leaving: Locator;
  readonly startingAndLeaving: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = workOutHolidaySelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    this.fullYear = page.getByRole(s.fullYear.role as any, { name: s.fullYear.name });
    this.starting = page.getByRole(s.starting.role as any, { name: s.starting.name });
    this.leaving = page.getByRole(s.leaving.role as any, { name: s.leaving.name });
    this.startingAndLeaving = page.getByRole(s.startingAndLeaving.role as any, { name: s.startingAndLeaving.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
  }

  /**
   * Select "for a full leave year"
   */
  async selectFullYear(): Promise<void> {
    await this.fullYear.click();
  }

  /**
   * Select "for someone starting part way through a leave year"
   */
  async selectStarting(): Promise<void> {
    await this.starting.click();
  }

  /**
   * Select "for someone leaving part way through a leave year"
   */
  async selectLeaving(): Promise<void> {
    await this.leaving.click();
  }

  /**
   * Select "for someone starting and leaving part way through a leave year"
   */
  async selectStartingAndLeaving(): Promise<void> {
    await this.startingAndLeaving.click();
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Select a work out holiday option and continue
   * @param option - The option to select
   */
  async selectAndContinue(option: 'full' | 'starting' | 'leaving' | 'both'): Promise<void> {
    switch (option) {
      case 'full':
        await this.selectFullYear();
        break;
      case 'starting':
        await this.selectStarting();
        break;
      case 'leaving':
        await this.selectLeaving();
        break;
      case 'both':
        await this.selectStartingAndLeaving();
        break;
    }
    await this.clickContinue();
  }

  /**
   * Verify component is visible (including header)
   */
  async isVisible(): Promise<boolean> {
    try {
      await this.sectionHeader.waitFor({ state: 'visible', timeout: 2000 });
      await this.fullYear.waitFor({ state: 'visible', timeout: 2000 });
      await this.continueButton.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get section header text
   */
  async getHeaderText(): Promise<string> {
    return await this.sectionHeader.textContent() || '';
  }
}