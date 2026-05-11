/**
 * Selectors for Hours Pay Period component
 * Used on Calculate Holiday Entitlement page
 */

export const hoursPayPeriodSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'How many hours has the employee worked in the pay period?' },
  
  // Hours worked input
  hoursInput: { role: 'textbox', name: 'How many hours has the employee worked in the pay period?' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h2:has-text("How many hours has the employee worked in the pay period?")',
  hoursLocator: 'input[placeholder="How many hours has the employee worked in the pay period?"]',
  hoursInputGeneric: 'input[type="number"]',
} as const;

export type HoursPayPeriodSelectorKey = keyof typeof hoursPayPeriodSelectors;
