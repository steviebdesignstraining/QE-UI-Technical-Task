/**
 * Selectors for Leave Year component
 * Used on Calculate Holiday Entitlement page
 */

export const leaveYearSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'When does the leave year start?' },
  
  // Date input fields
  dayInput: { role: 'textbox', name: 'Day' },
  monthInput: { role: 'textbox', name: 'Month' },
  yearInput: { role: 'textbox', name: 'Year' },
  
  // Start again link
  startAgainLink: { role: 'link', name: 'Start again' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h2:has-text("When does the leave year start?")',
  dayLocator: 'input[placeholder="Day"]',
  monthLocator: 'input[placeholder="Month"]',
  yearLocator: 'input[placeholder="Year"]',
  startAgainLocator: 'a:has-text("Start again")',
} as const;

export type LeaveYearSelectorKey = keyof typeof leaveYearSelectors;
