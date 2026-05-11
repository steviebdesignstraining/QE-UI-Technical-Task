import { Page, Locator } from '@playwright/test';
import { informationBasedAnswersSelectors } from '../selectors/informationBasedAnswers.selectors';
import { generalSelectors } from '../selectors/general.selectors';

export class InformationBasedAnswersPage {
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly informationHeader: Locator;
  readonly bodyText: Locator;
  readonly statutoryEntitlementText: Locator;
  readonly statutoryEntitlementPartYearText: Locator;
  readonly summaryList: Locator;
  readonly summaryRows: Locator;
  readonly summaryKeys: Locator;
  readonly summaryValues: Locator;
  readonly changeLinks: Locator;
  
  readonly irregularHoursSummary: {
    key: Locator;
    value: Locator;
    changeLink: Locator;
  };
  readonly leaveYearSummary: {
    key: Locator;
    value: Locator;
    changeLink: Locator;
  };
  readonly hoursPayPeriodSummary: {
    key: Locator;
    value: Locator;
    changeLink: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    const s = informationBasedAnswersSelectors;
    const g = generalSelectors;
    
    this.pageHeader = page.getByRole(s.pageHeader.role as any, { name: s.pageHeader.name });
    this.informationHeader = page.getByRole(s.informationHeader.role as any, { name: s.informationHeader.name });
    this.bodyText = page.locator(s.bodyText);
    this.statutoryEntitlementText = page.locator(s.statutoryEntitlementText);
    this.statutoryEntitlementPartYearText = page.locator(s.statutoryEntitlementPartYearTextAlt);
    this.summaryList = page.locator(s.summaryList);
    this.summaryRows = page.locator(s.summaryRow);
    this.summaryKeys = page.locator(s.summaryKey);
    this.summaryValues = page.locator(s.summaryValue);
    this.changeLinks = page.locator(g.changeLink);
    
    // Specific summary items
    this.irregularHoursSummary = {
      key: page.locator(s.irregularHoursSummary.key),
      value: page.locator(s.irregularHoursSummary.value),
      changeLink: page.locator(s.irregularHoursSummary.changeLink),
    };
    
    this.leaveYearSummary = {
      key: page.locator(s.leaveYearSummary.key),
      value: page.locator(s.leaveYearSummary.value),
      changeLink: page.locator(s.leaveYearSummary.changeLink),
    };
    
    this.hoursPayPeriodSummary = {
      key: page.locator(s.hoursPayPeriodSummary.key),
      value: page.locator(s.hoursPayPeriodSummary.value),
      changeLink: page.locator(s.hoursPayPeriodSummary.changeLink),
    };
  }

  /**
   * Navigate to information based answers page (typically after completing flow)
   */
  async navigate(): Promise<void> {
    await this.page.goto('/calculate-your-holiday-entitlement/y');
  }

  /**
   * Get the body text content (information section)
   */
  async getBodyText(): Promise<string> {
    return await this.bodyText.textContent() || '';
  }

/**
    * Get the statutory entitlement value from the body text
    * Returns the numeric value as string (e.g., "5")
    * Handles both formats:
    * - "The statutory entitlement for this pay period is 5 hours." (irregular hours)
    * - "The statutory entitlement is 72.4 hours holiday." (part-year)
    */
  async getStatutoryEntitlementValue(): Promise<string> {
    // Try standard format first (for irregular hours)
    const text = await this.statutoryEntitlementText.textContent() || '';
    const match = text.match(/is\s+(\d+(?:\.\d+)?)\s+hours/);
    if (match) {
      return match[1];
    }
    
    // Try part-year format (for workers starting part way through the year)
    const partYearText = await this.statutoryEntitlementPartYearText.textContent() || '';
    const partYearMatch = partYearText.match(/is\s+(\d+(?:\.\d+)?)\s+hours/);
    if (partYearMatch) {
      return partYearMatch[1];
    }
    
    return '';
  }

/**
    * Get the annual statutory entitlement for part-year workers
    * Returns the numeric value as string (e.g., "72.4")
    */
  async getAnnualEntitlementValue(): Promise<string> {
    // Try part-year format first
    const partYearText = await this.statutoryEntitlementPartYearText.textContent() || '';
    const partYearMatch = partYearText.match(/is\s+(\d+(?:\.\d+)?)\s+hours/);
    if (partYearMatch) {
      return partYearMatch[1];
    }
    
    // Fallback to standard format
    const text = await this.statutoryEntitlementText.textContent() || '';
    const match = text.match(/is\s+(\d+(?:\.\d+)?)\s+hours/);
    return match ? match[1] : '';
  }

  /**
   * Get all summary keys (questions)
   */
  async getSummaryKeys(): Promise<string[]> {
    const count = await this.summaryKeys.count();
    const keys: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.summaryKeys.nth(i).textContent();
      if (text) keys.push(text.trim());
    }
    return keys;
  }

  /**
   * Get all summary values (answers)
   */
  async getSummaryValues(): Promise<string[]> {
    const count = await this.summaryValues.count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await this.summaryValues.nth(i).textContent();
      if (text) values.push(text.trim());
    }
    return values;
  }

  /**
   * Get answer for a specific question
   * @param question - The question text
   */
  async getAnswerFor(question: string): Promise<string | null> {
    const rows = await this.summaryRows.all();
    for (const row of rows) {
      const keyLocator = row.locator('dt.govuk-summary-list__key');
      const valueLocator = row.locator('dd.govuk-summary-list__value');
      const keyText = await keyLocator.textContent();
      if (keyText && keyText.trim() === question) {
        const val = await valueLocator.textContent();
        return val?.trim() || null;
      }
    }
    return null;
  }

  /**
   * Click change link for a specific question
   * @param question - The question text
   */
  async clickChangeFor(question: string): Promise<void> {
    const rows = await this.summaryRows.all();
    for (const row of rows) {
      const keyLocator = row.locator('dt.govuk-summary-list__key');
      const keyText = await keyLocator.textContent();
      if (keyText && keyText.trim() === question) {
        const changeLink = row.locator('a.govuk-link:has-text("Change")');
        await changeLink.click();
        break;
      }
    }
  }

  /**
   * Verify irregular hours answer is displayed correctly
   */
  async verifyIrregularHoursAnswer(expected: string): Promise<boolean> {
    const actual = await this.irregularHoursSummary.value.textContent();
    return actual?.trim() === expected;
  }

  /**
   * Verify leave year start answer is displayed correctly
   */
  async verifyLeaveYearStartAnswer(expected: string): Promise<boolean> {
    const actual = await this.leaveYearSummary.value.textContent();
    return actual?.trim() === expected;
  }

  /**
   * Verify hours pay period answer is displayed correctly
   */
  async verifyHoursPayPeriodAnswer(expected: string | number): Promise<boolean> {
    const actual = await this.hoursPayPeriodSummary.value.textContent();
    return actual?.trim() === expected.toString();
  }

  /**
   * Verify statutory entitlement matches expected value
   */
  async verifyStatutoryEntitlement(expectedHours: string | number): Promise<boolean> {
    const actual = await this.getStatutoryEntitlementValue();
    return actual === expectedHours.toString();
  }

  /**
   * Verify page is loaded correctly
   */
  async isLoaded(): Promise<boolean> {
    try {
      await this.informationHeader.waitFor({ state: 'visible', timeout: 5000 });
      await this.summaryList.waitFor({ state: 'visible', timeout: 5000 });
      await this.bodyText.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get all displayed answers as an object
   */
  async getAllAnswers(): Promise<Record<string, string>> {
    const keys = await this.getSummaryKeys();
    const values = await this.getSummaryValues();
    const answers: Record<string, string> = {};
    keys.forEach((key, index) => {
      answers[key] = values[index] || '';
    });
    return answers;
  }

  /**
   * Get full body text content
   */
  async getInformationBodyText(): Promise<string> {
    return await this.bodyText.textContent() || '';
  }

  /**
   * Check if statutory entitlement text is visible
   */
  async hasStatutoryEntitlement(): Promise<boolean> {
    try {
      await this.statutoryEntitlementText.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }
}
