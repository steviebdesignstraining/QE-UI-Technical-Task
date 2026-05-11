/**
 * Selectors for Employment Start Date input
 * Used on Calculate Holiday Entitlement page
 */

export const employmentStartDateSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'What was the employment start date?' },
  
  // Date input fields
  dayInput: { role: 'textbox', name: 'Day' },
  monthInput: { role: 'textbox', name: 'Month' },
  yearInput: { role: 'textbox', name: 'Year' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h1:has-text("What was the employment start date?")',
  dayLocator: 'input[name="response[day]"]',
  monthLocator: 'input[name="response[month]"]',
  yearLocator: 'input[name="response[year]"]',
} as const;

export type EmploymentStartDateSelectorKey = keyof typeof employmentStartDateSelectors;