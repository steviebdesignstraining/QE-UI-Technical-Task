/**
 * General selectors used across multiple pages
 */

export const generalSelectors = {
  // Error message
  errorMessage: 'p.gem-c-error-message.govuk-error-message',
  
  // Start again link
  startAgain: 'a.govuk-link:has-text("Start again")',
  
  // Accept cookies button
  acceptCookies: 'button[data-accept-cookies="true"]',
  
  // Reject cookies button
  rejectCookies: 'button[data-reject-cookies="true"]',
  
  // View cookies link
  viewCookies: 'a.govuk-link:has-text("View cookies")',
  
// Change links in summary list (target change links within summary list rows)
  changeLink: 'a.govuk-link',

  // Change irregular hours link (specific XPath for leave year page)
  changeIrregularHours: '//dd[@class=\'govuk-summary-list__actions\']//a[@class=\'govuk-link\']',

  // Continue button (shared across all pages)
  continueButton: { role: 'button', name: 'Continue' },

  // Continue button locator alternative (text-based)
  continueLocator: 'button:has-text("Continue")',
} as const;

export type GeneralSelectorKey = keyof typeof generalSelectors;
