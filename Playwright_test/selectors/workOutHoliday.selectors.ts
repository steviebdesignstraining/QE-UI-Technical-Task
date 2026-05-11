/**
 * Selectors for Work Out Holiday selection
 * Used on Calculate Holiday Entitlement page
 */

export const workOutHolidaySelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'Do you want to work out holiday:' },
  
  // Radio buttons
  fullYear: { role: 'radio', name: 'for a full leave year' },
  starting: { role: 'radio', name: 'for someone starting part way through a leave year' },
  leaving: { role: 'radio', name: 'for someone leaving part way through a leave year' },
  startingAndLeaving: { role: 'radio', name: 'for someone starting and leaving part way through a leave year' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h1:has-text("Do you want to work out holiday:")',
  fullYearLocator: 'input[value="full-year"]',
  startingLocator: 'input[value="starting"]',
  leavingLocator: 'input[value="leaving"]',
  startingAndLeavingLocator: 'input[value="starting-and-leaving"]',
} as const;

export type WorkOutHolidaySelectorKey = keyof typeof workOutHolidaySelectors;