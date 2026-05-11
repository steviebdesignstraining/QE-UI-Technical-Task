/**
 * Valid test data for Calculate Holiday Entitlement flow
 */

export interface ValidAnswers {
  irregularOrPartYear: string;
  leaveYearStart: string;
  employmentStartDate: string;
  hoursPayPeriod: number;
  daysWorkedPerWeek: number;
}

export const validAnswers: ValidAnswers = {
  irregularOrPartYear: 'Yes',
  leaveYearStart: '5 April 2026',
  employmentStartDate: '15 May 2026',
  hoursPayPeriod: 14,
  daysWorkedPerWeek: 3,
};

// Alternative valid data sets for parameterized tests
export const validAnswersSets = {
  default: validAnswers,
  weekendWorker: {
    irregularOrPartYear: 'Yes',
    leaveYearStart: '1 January 2026',
    employmentStartDate: '15 January 2026',
    hoursPayPeriod: 20,
    daysWorkedPerWeek: 4,
  },
  fullTimeRegular: {
    irregularOrPartYear: 'No',
    leaveYearStart: '6 April 2026',
    employmentStartDate: '1 January 2026',
    hoursPayPeriod: 40,
    daysWorkedPerWeek: 5,
  },
  // Edge case: 6-day worker (should hit 28 day cap)
  sixDayWorker: {
    irregularOrPartYear: 'Yes',
    leaveYearStart: '1 April 2026',
    employmentStartDate: '1 May 2026',
    hoursPayPeriod: 48, // 6 days × 8 hours = 48 hours/week
    daysWorkedPerWeek: 6,
  },
  // Part-time worker (3 days/week)
  partTimeThreeDays: {
    irregularOrPartYear: 'Yes',
    leaveYearStart: '1 March 2026',
    employmentStartDate: '15 March 2026',
    hoursPayPeriod: 24, // 3 days × 8 hours = 24 hours/week
    daysWorkedPerWeek: 3,
  },
  // Low hours worker
  lowHoursWorker: {
    irregularOrPartYear: 'Yes',
    leaveYearStart: '1 February 2026',
    employmentStartDate: '15 February 2026',
    hoursPayPeriod: 10,
    daysWorkedPerWeek: 2,
  },
  // High hours worker (but under cap)
   highHoursWorker: {
     irregularOrPartYear: 'Yes',
     leaveYearStart: '1 May 2026',
     employmentStartDate: '15 May 2026',
     hoursPayPeriod: 35,
     daysWorkedPerWeek: 5,
   },
   // Part-year worker (No to irregular hours, starting part way through leave year)
   partYearWorker: {
     irregularOrPartYear: 'No',
     leaveYearStart: '5 April 2026',
     employmentStartDate: '15 May 2026',
     hoursPayPeriod: 14,
     daysWorkedPerWeek: 3,
   },
};

/**
 * Expected calculation results for each test data set
 * Used for dynamic validation
 * 
 * Formula: (hoursPerWeek × 5.6) / 52 = weekly entitlement, rounded
 * Annual entitlement = hoursPerWeek × 5.6 (for full year)
 * Cap: max 28 days = 224 hours (based on 8-hour days)
 */
export const expectedResults = {
  // 14 hours/week → 14×5.6=78.4 → 78.4/52=1.5077 → round up = 2
  default: { payPeriodEntitlement: 2, annualEntitlementHours: 78.4 },
  // 20 hours/week → 20×5.6=112 → 112/52=2.1538 → round up = 2
  weekendWorker: { payPeriodEntitlement: 2, annualEntitlementHours: 112 },
  // 40 hours/week → 40×5.6=224 → 224/52=4.3077 → round up = 4
  fullTimeRegular: { payPeriodEntitlement: 4, annualEntitlementHours: 224 },
  // 48 hours/week → 48×5.6=268.8 → capped to 224 → 224/52=4.3077 → round up = 4
  sixDayWorker: { payPeriodEntitlement: 4, annualEntitlementHours: 224 }, // Capped at 28 days
  // 24 hours/week → 24×5.6=134.4 → 134.4/52=2.5846 → round up = 3
  partTimeThreeDays: { payPeriodEntitlement: 3, annualEntitlementHours: 134.4 },
  // 10 hours/week → 10×5.6=56 → 56/52=1.0769 → round up = 1
  lowHoursWorker: { payPeriodEntitlement: 1, annualEntitlementHours: 56 },
  // 35 hours/week → 35×5.6=196 → 196/52=3.7692 → round up = 4
  highHoursWorker: { payPeriodEntitlement: 4, annualEntitlementHours: 196 },
  // Regular worker starting part-way: 40 hours/week, but only working part of the year
  regularPartYear: { payPeriodEntitlement: 2, annualEntitlementHours: 224 },
// Part-year worker: 14 hours/week, starting 15 May 2026, leave year starts 5 April 2026
   // The GOV.UK calculator shows annual entitlement for part-year workers
   // GOV.UK method: weeks remaining × weekly entitlement
   // Weekly entitlement: 14 × 5.6 / 52 = 1.5077 hours
   // Weeks remaining: 48 (includes partial week from May 15 to Apr 4)
   // Annual entitlement: 1.5077 × 48 ≈ 72.4 hours
   partYearWorker: { payPeriodEntitlement: 1, annualEntitlementHours: 72.4 },
};
