import { Page, Locator } from '@playwright/test';
import { daysWorkedPerWeekSelectors } from '../selectors/daysWorkedPerWeek.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class DaysWorkedPerWeekPage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly daysInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = daysWorkedPerWeekSelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    this.daysInput = page.getByRole(s.daysInput.role as any, { name: s.daysInput.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
  }

  /**
   * Fill in the days worked per week input
   * @param days - Number of days worked per week
   */
  async fillDays(days: string | number): Promise<void> {
    await this.daysInput.fill(days.toString());
  }

  /**
   * Click the Continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Submit the days worked per week form
   * @param days - Number of days worked per week
   */
  async submitDays(days: string | number): Promise<void> {
    await this.fillDays(days);
    await this.clickContinue();
  }

  /**
   * Get the value from days input
   */
  async getDaysValue(): Promise<string> {
    return await this.daysInput.inputValue() || '';
  }

  /**
   * Verify component is visible (including header)
   */
  async isVisible(): Promise<boolean> {
    try {
      await this.sectionHeader.waitFor({ state: 'visible', timeout: 2000 });
      await this.daysInput.waitFor({ state: 'visible', timeout: 2000 });
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

  /**
   * Verify the input has the expected value
   */
  async hasValue(expectedDays: string | number): Promise<boolean> {
    const actual = await this.getDaysValue();
    return actual === expectedDays.toString();
  }
}
