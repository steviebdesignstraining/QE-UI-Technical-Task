import { Page, Locator } from '@playwright/test';
import { leaveYearSelectors } from '../selectors/leaveYear.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class LeaveYearPage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly dayInput: Locator;
  readonly monthInput: Locator;
  readonly yearInput: Locator;
  readonly continueButton: Locator;
  readonly startAgainLink: Locator;
  readonly changeIrregularHoursLink: Locator;

  constructor(page: Page) {
    this.page = page;
    // GOV.UK uses h1 for the question heading
    const s = leaveYearSelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    // GOV.UK uses textboxes with accessible names (not placeholders)
    this.dayInput = page.getByRole(s.dayInput.role as any, { name: s.dayInput.name });
    this.monthInput = page.getByRole(s.monthInput.role as any, { name: s.monthInput.name });
    this.yearInput = page.getByRole(s.yearInput.role as any, { name: s.yearInput.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
    this.startAgainLink = page.getByRole(s.startAgainLink.role as any, { name: s.startAgainLink.name });
    this.changeIrregularHoursLink = page.locator(g.changeIrregularHours);
  }

  /**
   * Fill in the day input
   * @param day - Day value (1-31)
   */
  async fillDay(day: string | number): Promise<void> {
    await this.dayInput.fill(day.toString());
  }

  /**
   * Fill in the month input
   * @param month - Month value (1-12)
   */
  async fillMonth(month: string | number): Promise<void> {
    await this.monthInput.fill(month.toString());
  }

  /**
   * Fill in the year input
   * @param year - Year value (e.g., 2024)
   */
  async fillYear(year: string | number): Promise<void> {
    await this.yearInput.fill(year.toString());
  }

  /**
   * Fill in the complete date
   * @param day - Day value
   * @param month - Month value
   * @param year - Year value
   */
  async fillDate(day: string | number, month: string | number, year: string | number): Promise<void> {
    await this.fillDay(day);
    await this.fillMonth(month);
    await this.fillYear(year);
  }

  /**
   * Click the Continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Click the Start again link
   */
  async clickStartAgain(): Promise<void> {
    await this.startAgainLink.click();
  }

  /**
   * Click the Change irregular hours answer link
   */
  async clickChangeIrregularHours(): Promise<void> {
    await this.changeIrregularHoursLink.click();
  }

  /**
   * Submit the leave year form
   * @param day - Day value
   * @param month - Month value
   * @param year - Year value
   */
  async submitLeaveYear(day: string | number, month: string | number, year: string | number): Promise<void> {
    await this.fillDate(day, month, year);
    await this.clickContinue();
  }

  /**
   * Get values from all inputs
   */
  async getValues(): Promise<{ day: string; month: string; year: string }> {
    return {
      day: await this.dayInput.inputValue(),
      month: await this.monthInput.inputValue(),
      year: await this.yearInput.inputValue(),
    };
  }

  /**
   * Verify all date inputs are visible
   */
  async isVisible(): Promise<boolean> {
    try {
      await this.sectionHeader.waitFor({ state: 'visible', timeout: 2000 });
      await this.dayInput.waitFor({ state: 'visible', timeout: 2000 });
      await this.monthInput.waitFor({ state: 'visible', timeout: 2000 });
      await this.yearInput.waitFor({ state: 'visible', timeout: 2000 });
      await this.continueButton.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify the form is pre-filled with expected values
   */
  async hasValues(day: string | number, month: string | number, year: string | number): Promise<boolean> {
    const values = await this.getValues();
    return values.day === day.toString() && 
           values.month === month.toString() && 
           values.year === year.toString();
  }

  /**
   * Get section header text
   */
  async getHeaderText(): Promise<string> {
    return await this.sectionHeader.textContent() || '';
  }
}
