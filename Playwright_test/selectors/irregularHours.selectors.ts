/**
 * Selectors for Irregular Hours question component
 * Used on Calculate Holiday Entitlement page
 */

export const irregularHoursSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'Does the employee work irregular hours or for part of the year?' },
  
  // Radio buttons
  yesRadio: { role: 'radio', name: 'Yes' },
  noRadio: { role: 'radio', name: 'No' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h2:has-text("Does the employee work irregular hours or for part of the year?")',
  yesLocator: 'radio:has-text("Yes")',
  noLocator: 'radio:has-text("No")',
} as const;

export type IrregularHoursSelectorKey = keyof typeof irregularHoursSelectors;
