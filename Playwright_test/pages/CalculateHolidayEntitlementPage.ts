import { Page, Locator } from '@playwright/test';
import { IrregularHoursPage } from './IrregularHoursPage';
import { LeaveYearPage } from './LeaveYearPage';
import { HoursPayPeriodPage } from './HoursPayPeriodPage';
import { DaysWorkedPerWeekPage } from './DaysWorkedPerWeekPage';
import { WorkOutHolidayPage } from './WorkOutHolidayPage';
import { EmploymentStartDatePage } from './EmploymentStartDatePage';
import { HoursWorkedPerWeekPage } from './HoursWorkedPerWeekPage';
import { calculateHolidayEntitlementSelectors } from '../selectors/calculateHolidayEntitlement.selectors';

export class CalculateHolidayEntitlementPage {
  readonly page: Page;
  readonly irregularHours: IrregularHoursPage;
  readonly leaveYear: LeaveYearPage;
  readonly hoursPayPeriod: HoursPayPeriodPage;
  readonly daysWorkedPerWeek: DaysWorkedPerWeekPage;
  readonly workOutHoliday: WorkOutHolidayPage;
  readonly employmentStartDate: EmploymentStartDatePage;
  readonly hoursWorkedPerWeek: HoursWorkedPerWeekPage;
  readonly startNowButton: Locator;
  readonly pageHeading: Locator;
  readonly agriculturalWorkerLink: Locator;
  readonly holidayEntitlementLink: Locator;
  readonly nightWorkingLink: Locator;
  readonly sundayWorkingLink: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Initialize components
    this.irregularHours = new IrregularHoursPage(page);
    this.leaveYear = new LeaveYearPage(page);
    this.hoursPayPeriod = new HoursPayPeriodPage(page);
    this.daysWorkedPerWeek = new DaysWorkedPerWeekPage(page);
    this.workOutHoliday = new WorkOutHolidayPage(page);
    this.employmentStartDate = new EmploymentStartDatePage(page);
    this.hoursWorkedPerWeek = new HoursWorkedPerWeekPage(page);
    
    // Initialize locators using selectors
    const s = calculateHolidayEntitlementSelectors;
    this.pageHeading = page.getByRole(s.pageHeading.role as any, { name: s.pageHeading.name });
    this.startNowButton = page.getByRole(s.startNowButton.role as any, { name: s.startNowButton.name });
    this.agriculturalWorkerLink = page.getByRole(s.agriculturalWorkerLink.role as any, { name: s.agriculturalWorkerLink.name });
    this.holidayEntitlementLink = page.getByRole(s.holidayEntitlementLink.role as any, { name: s.holidayEntitlementLink.name });
    this.nightWorkingLink = page.getByRole(s.nightWorkingLink.role as any, { name: s.nightWorkingLink.name });
    this.sundayWorkingLink = page.getByRole(s.sundayWorkingLink.role as any, { name: s.sundayWorkingLink.name });
  }

  /**
   * Navigate to the Calculate Holiday Entitlement page
   */
  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  /**
   * Click the Start now button
   */
  async clickStartNow(): Promise<void> {
    await this.startNowButton.click();
  }

  /**
   * Get the page heading text
   */
  async getHeadingText(): Promise<string> {
    return await this.pageHeading.textContent() || '';
  }

  /**
   * Navigate to agricultural worker holiday entitlement page
   */
  async navigateToAgriculturalWorker(): Promise<void> {
    await this.agriculturalWorkerLink.click();
  }

  /**
   * Navigate to holiday entitlement information page
   */
  async navigateToHolidayEntitlement(): Promise<void> {
    await this.holidayEntitlementLink.click();
  }

  /**
   * Navigate to night working hours information page
   */
  async navigateToNightWorking(): Promise<void> {
    await this.nightWorkingLink.click();
  }

  /**
   * Navigate to Sunday working information page
   */
  async navigateToSundayWorking(): Promise<void> {
    await this.sundayWorkingLink.click();
  }

  /**
   * Verify page is loaded correctly
   */
  async isLoaded(): Promise<boolean> {
    try {
      await this.pageHeading.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}
