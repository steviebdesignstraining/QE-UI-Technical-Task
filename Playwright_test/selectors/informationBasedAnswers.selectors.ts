/**
 * Selectors for Information Based Answers section
 * Used on Calculate Holiday Entitlement results page
 */

export const informationBasedAnswersSelectors = {
  // Page header
  pageHeader: { role: 'heading', name: 'Calculate holiday entitlement:' },
  informationHeader: { role: 'heading', name: 'Information based on your answers' },
  
  // Body text content
  bodyText: 'div.govuk-govspeak',
  statutoryEntitlementText: 'div.govuk-govspeak p:has-text("The statutory entitlement for this pay period is")',
  statutoryEntitlementPartYearText: 'div.govuk-govspeak p:has-text("The statutory entitlement is")',
  
  // Alternative selector for part-year workers that's more specific
  statutoryEntitlementPartYearTextAlt: 'p:has-text("statutory entitlement is")',
  
  // Summary list container
  summaryList: 'dl.govuk-summary-list',
  
  // Summary list rows
  summaryRow: 'div.govuk-summary-list__row',
  
  // Summary list keys (question texts)
  summaryKey: 'dt.govuk-summary-list__key',
  
  // Summary list values (answers)
  summaryValue: 'dd.govuk-summary-list__value',
  
  // Specific summary items
  irregularHoursSummary: {
    key: 'dt:has-text("Does the employee work irregular hours or for part of the year?")',
    value: 'dd:has-text("Yes")',
    changeLink: 'a.govuk-link:has-text("Change")',
  },
  
  leaveYearSummary: {
    key: 'dt:has-text("When does the leave year start?")',
    value: 'dd:has-text("5 April 2026")',
    changeLink: 'a.govuk-link:has-text("Change")',
  },
  
  hoursPayPeriodSummary: {
    key: 'dt:has-text("How many hours has the employee worked in the pay period?")',
    value: 'dd:has-text("14")',
    changeLink: 'a.govuk-link:has-text("Change")',
  },
  
  // Locator alternatives
  pageHeaderLocator: 'h1:has-text("Calculate holiday entitlement:")',
  informationHeaderLocator: 'h1:has-text("Information based on your answers")',
} as const;

export type InformationBasedAnswersSelectorKey = keyof typeof informationBasedAnswersSelectors;
