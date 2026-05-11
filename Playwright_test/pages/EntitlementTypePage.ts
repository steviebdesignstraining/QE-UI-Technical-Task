import { Page, Locator } from '@playwright/test';
import { entitlementTypeSelectors } from '../selectors/entitlementType.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class EntitlementTypePage {
  readonly page: Page;
  readonly sectionHeader: Locator;
  readonly entitlementBasedHeader: Locator;
  readonly daysWorkedPerWeek: Locator;
  readonly hoursWorkedPerWeek: Locator;
  readonly annualisedHours: Locator;
  readonly compressedHours: Locator;
  readonly shiftWorker: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = entitlementTypeSelectors;
    const g = generalSelectors;
    this.sectionHeader = page.getByRole(s.sectionHeader.role as any, { name: s.sectionHeader.name });
    this.entitlementBasedHeader = page.getByRole(s.entitlementBasedHeader.role as any, { name: s.entitlementBasedHeader.name });
    this.daysWorkedPerWeek = page.getByRole(s.daysWorkedPerWeek.role as any, { name: s.daysWorkedPerWeek.name });
    this.hoursWorkedPerWeek = page.getByRole(s.hoursWorkedPerWeek.role as any, { name: s.hoursWorkedPerWeek.name });
    this.annualisedHours = page.getByRole(s.annualisedHours.role as any, { name: s.annualisedHours.name });
    this.compressedHours = page.getByRole(s.compressedHours.role as any, { name: s.compressedHours.name });
    this.shiftWorker = page.getByRole(s.shiftWorker.role as any, { name: s.shiftWorker.name });
    this.continueButton = page.getByRole(g.continueButton.role as any, { name: g.continueButton.name });
  }

  /**
   * Select "days worked per week"
   */
  async selectDaysWorkedPerWeek(): Promise<void> {
    await this.daysWorkedPerWeek.click();
  }

  /**
   * Select "hours worked per week"
   */
  async selectHoursWorkedPerWeek(): Promise<void> {
    await this.hoursWorkedPerWeek.click();
  }

  /**
   * Select "annualised hours"
   */
  async selectAnnualisedHours(): Promise<void> {
    await this.annualisedHours.click();
  }

  /**
   * Select "compressed hours"
   */
  async selectCompressedHours(): Promise<void> {
    await this.compressedHours.click();
  }

  /**
   * Select "shifts"
   */
  async selectShiftWorker(): Promise<void> {
    await this.shiftWorker.click();
  }

  /**
   * Click continue button
   */
  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  /**
   * Select an entitlement type and continue
   * @param type - The entitlement type to select
   */
  async selectAndContinue(type: 'days' | 'hours' | 'annualised' | 'compressed' | 'shift'): Promise<void> {
    switch (type) {
      case 'days':
        await this.selectDaysWorkedPerWeek();
        break;
      case 'hours':
        await this.selectHoursWorkedPerWeek();
        break;
      case 'annualised':
        await this.selectAnnualisedHours();
        break;
      case 'compressed':
        await this.selectCompressedHours();
        break;
      case 'shift':
        await this.selectShiftWorker();
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
      await this.daysWorkedPerWeek.waitFor({ state: 'visible', timeout: 2000 });
      await this.hoursWorkedPerWeek.waitFor({ state: 'visible', timeout: 2000 });
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
   * Get entitlement based header text
   */
  async getEntitlementBasedHeaderText(): Promise<string> {
    return await this.entitlementBasedHeader.textContent() || '';
  }
}