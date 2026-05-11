import { Page, Locator } from '@playwright/test';
import { irregularHoursSelectors } from '../selectors/irregularHours.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class IrregularHoursPage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly yesRadio: Locator;
  readonly noRadio: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = irregularHoursSelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    this.yesRadio = page.getByRole(s.yesRadio.role as any, { name: s.yesRadio.name });
    this.noRadio = page.getByRole(s.noRadio.role as any, { name: s.noRadio.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
  }

  /**
   * Select "Yes" for irregular hours
   */
  async selectYes(): Promise<void> {
    await this.yesRadio.click();
  }

  /**
   * Select "No" for irregular hours
   */
  async selectNo(): Promise<void> {
    await this.noRadio.click();
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Answer the irregular hours question and proceed
   * @param hasIrregularHours - true for Yes, false for No
   */
  async answerAndContinue(hasIrregularHours: boolean): Promise<void> {
    if (hasIrregularHours) {
      await this.selectYes();
    } else {
      await this.selectNo();
    }
    await this.clickContinue();
  }

  /**
   * Verify Yes radio is selected
   */
  async isYesSelected(): Promise<boolean> {
    return await this.yesRadio.isChecked();
  }

  /**
   * Verify No radio is selected
   */
  async isNoSelected(): Promise<boolean> {
    return await this.noRadio.isChecked();
  }

  /**
   * Verify component is visible (including header)
   */
  async isVisible(): Promise<boolean> {
    try {
      await this.sectionHeader.waitFor({ state: 'visible', timeout: 2000 });
      await this.yesRadio.waitFor({ state: 'visible', timeout: 2000 });
      await this.noRadio.waitFor({ state: 'visible', timeout: 2000 });
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
