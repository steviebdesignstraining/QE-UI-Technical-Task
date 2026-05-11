/**
 * Selectors for Calculate Holiday Entitlement page
 * https://www.gov.uk/calculate-your-holiday-entitlement
 */

export const calculateHolidayEntitlementSelectors = {
  // Main heading
  pageHeading: { role: 'heading', name: 'Calculate holiday entitlement' },
  
  // Primary CTA button
  startNowButton: { role: 'button', name: 'Start now' },
  
  // Related links in the sidebar or footer
  agriculturalWorkerLink: { role: 'link', name: 'Calculate your agricultural worker holiday entitlement' },
  holidayEntitlementLink: { role: 'link', name: 'Holiday entitlement' },
  nightWorkingLink: { role: 'link', name: 'Night working hours' },
  sundayWorkingLink: { role: 'link', name: 'Sunday working' },
  
  // Locator alternatives
  pageHeadingLocator: 'heading[name="Calculate holiday entitlement"]',
  startNowButtonLocator: 'button:has-text("Start now")',
} as const;

export type CalculateHolidayEntitlementSelectorKey = keyof typeof calculateHolidayEntitlementSelectors;
