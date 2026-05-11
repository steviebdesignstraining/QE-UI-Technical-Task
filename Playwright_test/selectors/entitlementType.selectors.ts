/**
 * Selectors for Entitlement Type selection
 * Used on Calculate Holiday Entitlement page
 */

export const entitlementTypeSelectors = {
  // Section header
  sectionHeader: { role: 'heading', name: 'What type of entitlement do you want to calculate?' },
  
  // Alternative header for entitlement based on question
  entitlementBasedHeader: { role: 'heading', name: 'Is the holiday entitlement based on:' },
  
  // Radio buttons
  daysWorkedPerWeek: { role: 'radio', name: 'days worked per week' },
  hoursWorkedPerWeek: { role: 'radio', name: 'hours worked per week' },
  annualisedHours: { role: 'radio', name: 'annualised hours' },
  compressedHours: { role: 'radio', name: 'compressed hours' },
  shiftWorker: { role: 'radio', name: 'shifts' },
  
  // Locator alternatives
  sectionHeaderLocator: 'h2:has-text("What type of entitlement do you want to calculate?")',
  entitlementBasedHeaderLocator: 'h1:has-text("Is the holiday entitlement based on:")',
  daysWorkedPerWeekLocator: 'input[value="days-worked-per-week"]',
  hoursWorkedPerWeekLocator: 'input[value="hours-worked-per-week"]',
  annualisedHoursLocator: 'input[value="annualised-hours"]',
  compressedHoursLocator: 'input[value="compressed-hours"]',
  shiftWorkerLocator: 'input[value="shift-worker"]',
} as const;

export type EntitlementTypeSelectorKey = keyof typeof entitlementTypeSelectors;