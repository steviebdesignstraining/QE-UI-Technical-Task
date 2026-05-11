/**
 * Utility functions for calculating UK statutory holiday entitlement
 * Based on GOV.UK guidance: https://www.gov.uk/holiday-entitlement-rights
 * 
 * Key rules:
 * - Full-time workers: 5.6 weeks (28 days) paid holiday per year
 * - Part-time/irregular hours: Pro-rata based on hours worked
 * - Maximum statutory cap: 28 days (5.6 weeks)
 * - Rounding: Round up to nearest hour if entitlement is 0.5 or more
 * - Rolled-up holiday pay allowed for irregular/part-year workers
 */

export interface CalculationInputs {
  irregularOrPartYear: boolean;
  leaveYearStart: Date;
  hoursInPayPeriod: number;
  employmentStartDate?: Date; // For part-year calculations
  daysWorkedPerWeek?: number; // For days-based calculations
  weeksPerYear?: number; // Default 52
  daysPerWeek?: number; // For regular workers (legacy)
  hoursPerWeek?: number; // For regular workers (legacy)
}

export interface CalculationResult {
  annualEntitlementWeeks: number;
  annualEntitlementDays: number;
  annualEntitlementHours: number;
  payPeriodEntitlement: number;
  maxEntitlement: number; // 28 days or equivalent in hours
  isCapped: boolean;
  yearFraction: number; // Fraction of year worked (for part-year workers)
  weeksRemainingInYear?: number; // Weeks remaining in leave year (for part-year workers)
}

/**
 * Calculate statutory holiday entitlement based on UK rules
 * @param inputs - Calculation inputs
 * @returns Calculation result with all values
 */
export function calculateStatutoryEntitlement(inputs: CalculationInputs): CalculationResult {
  const {
    irregularOrPartYear,
    hoursInPayPeriod,
    employmentStartDate,
    leaveYearStart,
    daysWorkedPerWeek,
    weeksPerYear = 52,
    daysPerWeek = 5, // Standard full-time week (for backward compatibility)
  } = inputs;

  // Standard full-time day (8 hours) - used for cap calculation
  const hoursPerDay = 8;
  
  // Statutory entitlement: 5.6 weeks per year (GOV.UK guidance)
  const statutoryWeeksPerYear = 5.6;
  const maxDaysPerYear = 28; // Cap: 5.6 weeks × 5 days = 28 days max
  
  // Calculate the fraction of the leave year worked (for part-year calculations)
  let yearFraction = 1; // Default to full year
  let weeksRemainingInYear = 52; // Default to full year
  if (employmentStartDate && leaveYearStart) {
    const employmentStart = employmentStartDate;
    const leaveYearStartDate = leaveYearStart;
    
    // If employment starts after the leave year begins, calculate partial year
    if (employmentStart > leaveYearStartDate) {
      const leaveYearEnd = new Date(leaveYearStartDate);
      leaveYearEnd.setFullYear(leaveYearEnd.getFullYear() + 1);
      
      const totalLeaveYearMs = leaveYearEnd.getTime() - leaveYearStartDate.getTime();
      const workedMs = leaveYearEnd.getTime() - employmentStart.getTime();
      yearFraction = Math.max(0, workedMs / totalLeaveYearMs);
      
      // Calculate weeks remaining in leave year from employment start date
      // GOV.UK method: count weeks from start date inclusive, rounding up partial weeks
      const msPerWeek = 7 * 24 * 60 * 60 * 1000;
      const weeksFromStart = workedMs / msPerWeek;
      // GOV.UK includes the week containing the employment start date
      weeksRemainingInYear = Math.ceil(weeksFromStart) + 1;
    }
    // If employment starts before or on the leave year start, it's a full year
  }
  
  // Calculate annual entitlement in hours based on working pattern
  let annualEntitlementHours: number;
  let effectiveDaysPerWeek: number;
  
  const weeklyHours = hoursInPayPeriod || (daysPerWeek * hoursPerDay);
  
  // For part-year workers: use GOV.UK method - weeks remaining × weekly entitlement
  // For full-year workers: use standard annual calculation
  if (weeksRemainingInYear < 52) {
    const weeklyEntitlementHours = weeklyHours * statutoryWeeksPerYear / weeksPerYear;
    annualEntitlementHours = weeklyEntitlementHours * weeksRemainingInYear;
  } else {
    annualEntitlementHours = weeklyHours * statutoryWeeksPerYear * yearFraction;
  }
  
  // If daysWorkedPerWeek is provided, use it for day calculations
  effectiveDaysPerWeek = daysWorkedPerWeek || (weeklyHours / hoursPerDay);
  
  // Apply maximum cap: 28 days = 224 hours (based on 8-hour days)
  const maxEntitlementHours = maxDaysPerYear * hoursPerDay;
  const isCapped = annualEntitlementHours > maxEntitlementHours;
  
  if (isCapped) {
    annualEntitlementHours = maxEntitlementHours;
  }
  
  // Calculate pay period entitlement (per week)
  const payPeriodEntitlement = annualEntitlementHours / weeksPerYear;
  
  // Rounding according to GOV.UK: round up to nearest whole hour if fractional part >= 0.5
  const roundedPayPeriodEntitlement = Math.floor(payPeriodEntitlement + 0.5);
  
  // Calculate annual days based on effective days per week
  const annualEntitlementDays = Math.min(effectiveDaysPerWeek * statutoryWeeksPerYear * yearFraction, maxDaysPerYear);
  
  return {
    annualEntitlementWeeks: statutoryWeeksPerYear,
    annualEntitlementDays,
    annualEntitlementHours: annualEntitlementHours,
    payPeriodEntitlement: roundedPayPeriodEntitlement,
    maxEntitlement: maxEntitlementHours,
    isCapped,
    yearFraction,
    weeksRemainingInYear,
  };
}

/**
 * Format entitlement for display
 */
export function formatEntitlement(hours: number): string {
  if (hours % 1 === 0) {
    return `${Math.round(hours)} hours`;
  }
  return `${hours.toFixed(1)} hours`;
}

/**
 * Calculate expected statutory entitlement text for the UI
 * Returns the number as it would appear in "The statutory entitlement for this pay period is X hours."
 */
export function getExpectedStatutoryEntitlement(inputs: CalculationInputs): string {
  const result = calculateStatutoryEntitlement(inputs);
  return result.payPeriodEntitlement.toString();
}

