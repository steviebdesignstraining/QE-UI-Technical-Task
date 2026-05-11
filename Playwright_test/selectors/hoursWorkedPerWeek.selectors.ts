/**
 * Selectors for Hours Worked Per Week input
 * Used on Calculate Holiday Entitlement page
 */

export const hoursWorkedPerWeekSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'Number of hours worked per week?' },
  
  // Hours input
  hoursInput: { role: 'textbox', name: 'Number of hours worked per week?' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h1:has-text("Number of hours worked per week?")',
  hoursInputLocator: 'input[name="response"]',
} as const;

export type HoursWorkedPerWeekSelectorKey = keyof typeof hoursWorkedPerWeekSelectors;