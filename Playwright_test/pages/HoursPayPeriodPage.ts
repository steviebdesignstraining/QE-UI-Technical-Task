import { Page, Locator } from '@playwright/test';
import { hoursPayPeriodSelectors } from '../selectors/hoursPayPeriod.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class HoursPayPeriodPage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly hoursInput: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = hoursPayPeriodSelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    this.hoursInput = page.getByRole(s.hoursInput.role as any, { name: s.hoursInput.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
  }

  /**
   * Fill in the hours worked input
   * @param hours - Number of hours worked
   */
  async fillHours(hours: string | number): Promise<void> {
    await this.hoursInput.fill(hours.toString());
  }

  /**
   * Click the Continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Submit the hours pay period form
   * @param hours - Number of hours worked
   */
  async submitHours(hours: string | number): Promise<void> {
    await this.fillHours(hours);
    await this.clickContinue();
  }

  /**
   * Get the value from hours input
   */
  async getHoursValue(): Promise<string> {
    return await this.hoursInput.inputValue() || '';
  }

  /**
   * Verify component is visible (including header)
   */
  async isVisible(): Promise<boolean> {
    try {
      await this.sectionHeader.waitFor({ state: 'visible', timeout: 2000 });
      await this.hoursInput.waitFor({ state: 'visible', timeout: 2000 });
      await this.continueButton.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify the input has the expected value
   */
  async hasValue(expectedHours: string | number): Promise<boolean> {
    const actual = await this.getHoursValue();
    return actual === expectedHours.toString();
  }

  /**
   * Get section header text
   */
  async getHeaderText(): Promise<string> {
    return await this.sectionHeader.textContent() || '';
  }
}
