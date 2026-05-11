/**
 * Selectors for Days Worked Per Week input
 * Used on Calculate Holiday Entitlement page
 */

export const daysWorkedPerWeekSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'Number of days worked per week?' },
  
  // Days input
  daysInput: { role: 'textbox', name: 'Number of days worked per week?' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h1:has-text("Number of days worked per week?")',
  daysInputLocator: 'input[name="response"]',
} as const;

export type DaysWorkedPerWeekSelectorKey = keyof typeof daysWorkedPerWeekSelectors;
