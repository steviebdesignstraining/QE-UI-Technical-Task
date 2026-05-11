import { Page, Locator } from '@playwright/test';
import { generalSelectors } from '../selectors/general.selectors';

export class GeneralPage {
  readonly page: Page;
  readonly errorMessage: Locator;
  readonly startAgain: Locator;
  readonly acceptCookies: Locator;
  readonly rejectCookies: Locator;
  readonly viewCookies: Locator;
  readonly changeLinks: Locator;

  constructor(page: Page) {
    this.page = page;
    const s = generalSelectors;
    this.errorMessage = page.locator(s.errorMessage);
    this.startAgain = page.locator(s.startAgain);
    this.acceptCookies = page.locator(s.acceptCookies);
    this.rejectCookies = page.locator(s.rejectCookies);
    this.viewCookies = page.locator(s.viewCookies);
    this.changeLinks = page.locator(s.changeLink);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.errorMessage.textContent() || '';
  }

  /**
   * Check if error message is visible
   */
  async hasError(): Promise<boolean> {
    try {
      await this.errorMessage.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Click the Start again link
   */
  async clickStartAgain(): Promise<void> {
    await this.startAgain.click();
  }

  /**
   * Click the Accept cookies button
   */
  async clickAcceptCookies(): Promise<void> {
    await this.acceptCookies.click();
  }

  /**
   * Click the Reject cookies button
   */
  async clickRejectCookies(): Promise<void> {
    await this.rejectCookies.click();
  }

  /**
   * Click the View cookies link
   */
  async clickViewCookies(): Promise<void> {
    await this.viewCookies.click();
  }

/**
    * Click the Change link for irregular hours question
    */
  async clickChangeIrregular(): Promise<void> {
    const links = await this.changeLinks.all();
    if (links.length > 0) {
      await links[0].click();
    }
  }

/**
    * Click the Change link for leave year start question
    */
  async clickChangeYearStart(): Promise<void> {
    const links = await this.changeLinks.all();
    if (links.length > 1) {
      await links[1].click();
    }
  }

/**
     * Click the Change link for hours pay period question
     */
  async clickChangeHoursPayPeriod(): Promise<void> {
    const links = await this.changeLinks.all();
    // Find the change link associated with hours pay period (usually the 3rd row's change link)
    if (links.length >= 3) {
      await links[2].click();
    } else if (links.length > 0) {
      await links[links.length - 1].click();
    }
  }
}