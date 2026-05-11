import { test, expect } from "@playwright/test";
import { CalculateHolidayEntitlementPage } from "../pages/CalculateHolidayEntitlementPage";
import { InformationBasedAnswersPage } from "../pages/InformationBasedAnswersPage";
import { GeneralPage } from "../pages/GeneralPage";
import { EntitlementTypePage } from "../pages/EntitlementTypePage";
import {
  validAnswers,
  validAnswersSets,
  expectedResults,
} from "../test_data/valid.data";
import { calculateStatutoryEntitlement } from "../utils/calculations";

/**
 * Helper function to parse a date string like "5 April 2026" into day, month, year
 */
function parseDate(dateString: string): {
  day: number;
  month: number;
  year: number;
} {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const parts = dateString.split(" ");
  const day = parseInt(parts[0], 10);
  const monthName = parts[1];
  const year = parseInt(parts[2], 10);
  const month = months.indexOf(monthName) + 1;

  return { day, month, year };
}

test.describe.configure({ mode: "serial" });
test.describe("Calculate Holiday Entitlement Page", () => {
  let holidayPage: CalculateHolidayEntitlementPage;
  let infoPage: InformationBasedAnswersPage;
  let generalPage: GeneralPage;
  let entitlementTypePage: EntitlementTypePage;

  test.beforeEach(async ({ page }) => {
    holidayPage = new CalculateHolidayEntitlementPage(page);
    infoPage = new InformationBasedAnswersPage(page);
    generalPage = new GeneralPage(page);
    entitlementTypePage = new EntitlementTypePage(page);
    // Navigate to the specific holiday entitlement calculator URL
    await page.goto("https://www.gov.uk/calculate-your-holiday-entitlement");

    // Accept cookies if the banner is present
    if (await generalPage.acceptCookies.isVisible()) {
      await generalPage.clickAcceptCookies();
      await page.waitForLoadState("networkidle");
    }
  });

  test("calculate holiday entitlement correctly for valid inputs with irregular hours", async ({
    page,
  }) => {
    // 1. Navigate to calculator URL (handled by beforeEach)

    // 2. Verify page title
    const mainHeading = await holidayPage.getHeadingText();
    expect(mainHeading).toContain("Calculate holiday entitlement");

    // 3. Click Start now
    await holidayPage.clickStartNow();

    // 4. Verify page title - Does the employee work irregular hours or for part of the year?
    const irregularHoursHeader =
      await holidayPage.irregularHours.getHeaderText();
    expect(irregularHoursHeader).toContain(
      "Does the employee work irregular hours or for part of the year?",
    );

    // 5. Select yes
    await holidayPage.irregularHours.selectYes();

    // 6. Click continue
    await holidayPage.irregularHours.clickContinue();

    // 7. Verify page title - When does the leave year start?
    const leaveYearHeader = await holidayPage.leaveYear.getHeaderText();
    expect(leaveYearHeader).toContain("When does the leave year start?");

    // 8. Enter Day / month / Year as numerical values from valid.data.ts
    const { day, month, year } = parseDate(validAnswers.leaveYearStart);
    await holidayPage.leaveYear.fillDate(day, month, year);

    // 9. Click continue
    await holidayPage.leaveYear.clickContinue();

    // 10. Verify page title - How many hours has the employee worked in the pay period?
    const hoursHeader = await holidayPage.hoursPayPeriod.getHeaderText();
    expect(hoursHeader).toContain(
      "How many hours has the employee worked in the pay period?",
    );

    // 11. Enter hoursPayPeriod into input field
    await holidayPage.hoursPayPeriod.fillHours(validAnswers.hoursPayPeriod);

    // 12. Click Continue
    await holidayPage.hoursPayPeriod.clickContinue();

    // 13. Calculate and validate the result dynamically
    // Calculate expected value using the same business logic as the calculator
    const calculationInputs = {
      irregularOrPartYear: true,
      leaveYearStart: new Date(year, month - 1, day),
      hoursInPayPeriod: validAnswers.hoursPayPeriod,
    };

    const expectedResult = calculateStatutoryEntitlement(calculationInputs);

    // Verify the information page is displayed
    const isInfoPageLoaded = await infoPage.isLoaded();
    expect(isInfoPageLoaded).toBeTruthy();

    // Extract the statutory entitlement value from the UI
    const actualEntitlement = await infoPage.getStatutoryEntitlementValue();

    // Assert that the UI result matches our dynamically calculated expected value
    expect(actualEntitlement).toBe(
      expectedResult.payPeriodEntitlement.toString(),
    );

    // Additional validation: verify the summary shows correct answers
    const irregularHoursAnswer = await infoPage.getAnswerFor(
      "Does the employee work irregular hours or for part of the year?",
    );
    expect(irregularHoursAnswer).toBe("Yes");

    const leaveYearAnswer = await infoPage.getAnswerFor(
      "When does the leave year start?",
    );
    expect(leaveYearAnswer).toBe(validAnswers.leaveYearStart);

    const hoursAnswer = await infoPage.getAnswerFor(
      "How many hours has the employee worked in the pay period?",
    );
    // The UI may display hours as "14.0" instead of "14" - parse and compare as numbers
    const hoursValue = parseFloat(hoursAnswer || "0");
    expect(hoursValue).toBe(validAnswers.hoursPayPeriod);
  });

  test("calculate holiday entitlement correctly for valid inputs for part of the year", async ({
    page,
  }) => {
    const {
      day: empDay,
      month: empMonth,
      year: empYear,
    } = parseDate(validAnswersSets.partYearWorker.employmentStartDate);
    const {
      day: leaveDay,
      month: leaveMonth,
      year: leaveYear,
    } = parseDate(validAnswersSets.partYearWorker.leaveYearStart);

    const testDaysWorkedPerWeek =
      validAnswersSets.partYearWorker.daysWorkedPerWeek;
    const testHoursPerWeek = validAnswersSets.partYearWorker.hoursPayPeriod;

    // 1. Navigate to calculator URL (handled by beforeEach)

    // 2. Verify page title
    const mainHeading = await holidayPage.getHeadingText();
    expect(mainHeading).toContain("Calculate holiday entitlement");

    // 3. Click Start now
    await holidayPage.clickStartNow();

    // 4. Verify page title - Does the employee work irregular hours or for part of the year?
    const irregularHoursHeader =
      await holidayPage.irregularHours.getHeaderText();
    expect(irregularHoursHeader).toContain(
      "Does the employee work irregular hours or for part of the year?",
    );

    // 5. Select no
    await holidayPage.irregularHours.selectNo();

    // 6. Click continue
    await holidayPage.irregularHours.clickContinue();

    // 7. Verify page title - Is the holiday entitlement based on:
    const entitlementHeader =
      await entitlementTypePage.getEntitlementBasedHeaderText();
    expect(entitlementHeader).toContain("Is the holiday entitlement based on:");

    // 8. Select one option - hours worked per week
    await entitlementTypePage.selectHoursWorkedPerWeek();

    // 9. Click continue
    await entitlementTypePage.clickContinue();

    // 10. Verify page title - Do you want to work out holiday:
    const workOutHolidayHeader =
      await holidayPage.workOutHoliday.getHeaderText();
    expect(workOutHolidayHeader).toContain("Do you want to work out holiday:");

    // 11. Select one option - for someone starting part way through a leave year
    await holidayPage.workOutHoliday.selectStarting();

    // 12. Click continue
    await holidayPage.workOutHoliday.clickContinue();

    // 13. Verify page title - What was the employment start date?
    const employmentStartDateHeader =
      await holidayPage.employmentStartDate.getHeaderText();
    expect(employmentStartDateHeader).toContain(
      "What was the employment start date?",
    );

    // 14. Enter employment start date
    await holidayPage.employmentStartDate.fillDate(empDay, empMonth, empYear);

    // 15. Click continue
    await holidayPage.employmentStartDate.clickContinue();

    // 16. Verify page title - When does the leave year start?
    const leaveYearHeader = await holidayPage.leaveYear.getHeaderText();
    expect(leaveYearHeader).toContain("When does the leave year start?");

    // 17. Enter leave year start date
    await holidayPage.leaveYear.fillDate(leaveDay, leaveMonth, leaveYear);

    // 18. Click continue
    await holidayPage.leaveYear.clickContinue();

    // 19. Verify page title - Number of hours worked per week
    const hoursWorkedPerWeekHeader =
      await holidayPage.hoursWorkedPerWeek.getHeaderText();
    expect(hoursWorkedPerWeekHeader).toContain(
      "Number of hours worked per week?",
    );

    // 20. Enter numerical value in input field
    await holidayPage.hoursWorkedPerWeek.fillHours(testHoursPerWeek);

    // 21. Click continue
    await holidayPage.hoursWorkedPerWeek.clickContinue();

    // 22. Verify page title - Number of days worked per week?
    const daysWorkedPerWeekHeader =
      await holidayPage.daysWorkedPerWeek.getHeaderText();
    expect(daysWorkedPerWeekHeader).toContain(
      "Number of days worked per week?",
    );

    // 23. Enter numerical value in input field
    await holidayPage.daysWorkedPerWeek.fillDays(testDaysWorkedPerWeek);

    // 24. Click continue
    await holidayPage.daysWorkedPerWeek.clickContinue();

    // 25. Verify page title - Information based on your answers
    const isInfoPageLoaded = await infoPage.isLoaded();
    expect(isInfoPageLoaded).toBeTruthy();

    // 26. Calculate point and validate against UI
    const calculationInputs = {
      irregularOrPartYear: false,
      leaveYearStart: new Date(leaveYear, leaveMonth - 1, leaveDay),
      employmentStartDate: new Date(empYear, empMonth - 1, empDay),
      hoursInPayPeriod: testHoursPerWeek,
      daysWorkedPerWeek: testDaysWorkedPerWeek,
    };

    const expectedResult = calculateStatutoryEntitlement(calculationInputs);

    // Extract the statutory entitlement value from the UI (annual entitlement for part-year workers)
    const actualEntitlement = await infoPage.getAnnualEntitlementValue();

    // Assert that the UI annual entitlement matches our calculated annual entitlement
    expect(parseFloat(actualEntitlement)).toBeCloseTo(
      expectedResult.annualEntitlementHours,
      1,
    );

    // Additional validation: verify the summary shows correct answers
    const irregularHoursAnswer = await infoPage.getAnswerFor(
      "Does the employee work irregular hours or for part of the year?",
    );
    expect(irregularHoursAnswer).toBe("No");

    const workOutHolidayAnswer = await infoPage.getAnswerFor(
      "Do you want to work out holiday:",
    );
    expect(workOutHolidayAnswer).toContain("for someone starting");

    const employmentStartDateAnswer = await infoPage.getAnswerFor(
      "What was the employment start date?",
    );
    expect(employmentStartDateAnswer).toBe(
      validAnswersSets.partYearWorker.employmentStartDate,
    );

    const leaveYearAnswer = await infoPage.getAnswerFor(
      "When does the leave year start?",
    );
    expect(leaveYearAnswer).toBe(
      validAnswersSets.partYearWorker.leaveYearStart,
    );

    const hoursAnswer = await infoPage.getAnswerFor(
      "Number of hours worked per week?",
    );
    const hoursValue = parseFloat(hoursAnswer || "0");
    expect(hoursValue).toBe(testHoursPerWeek);

    const daysAnswer = await infoPage.getAnswerFor(
      "Number of days worked per week?",
    );
    const daysValue = parseFloat(daysAnswer || "0");
    expect(daysValue).toBe(testDaysWorkedPerWeek);
  });

  test("Allow user to change answers and start again", async ({ page }) => {
    // 1. Navigate to calculator URL (handled by beforeEach)

    // 2. Verify page title
    const mainHeading = await holidayPage.getHeadingText();
    expect(mainHeading).toContain("Calculate holiday entitlement");

    // 3. Click Start now
    await holidayPage.clickStartNow();

    // 4. Verify page title - Does the employee work irregular hours or for part of the year?
    const irregularHoursHeader =
      await holidayPage.irregularHours.getHeaderText();
    expect(irregularHoursHeader).toContain(
      "Does the employee work irregular hours or for part of the year?",
    );

    // 5. Select yes
    await holidayPage.irregularHours.selectYes();

    // 6. Click continue
    await holidayPage.irregularHours.clickContinue();

    // 7. Verify page title - When does the leave year start?
    const leaveYearHeader = await holidayPage.leaveYear.getHeaderText();
    expect(leaveYearHeader).toContain("When does the leave year start?");

    // 8. Enter Day / month / Year as numerical values from valid.data.ts
    const { day, month, year } = parseDate(validAnswers.leaveYearStart);
    await holidayPage.leaveYear.fillDate(day, month, year);

    // 9. Click continue
    await holidayPage.leaveYear.clickContinue();

    // 10. Verify page title - How many hours has the employee worked in the pay period?
    const hoursHeader = await holidayPage.hoursPayPeriod.getHeaderText();
    expect(hoursHeader).toContain(
      "How many hours has the employee worked in the pay period?",
    );

    // 11. Enter hoursPayPeriod into input field
    await holidayPage.hoursPayPeriod.fillHours(validAnswers.hoursPayPeriod);

    // 12. Click Continue
    await holidayPage.hoursPayPeriod.clickContinue();

    // 13. Verify information page is displayed
    const isInfoPageLoaded = await infoPage.isLoaded();
    expect(isInfoPageLoaded).toBeTruthy();

    // 14. Click change for How many hours has the employee worked in the pay period?
    await infoPage.clickChangeFor(
      "How many hours has the employee worked in the pay period?",
    );

    // 15. Change value in input to a different value than previously entered.
    const newHours = validAnswers.hoursPayPeriod + 5;
    await holidayPage.hoursPayPeriod.fillHours(newHours);

    // 16. Click continue
    await holidayPage.hoursPayPeriod.clickContinue();

    // 17. Click start again
    await generalPage.clickStartAgain();

    // 18. Verify page title - Calculate holiday entitlement
    const finalHeading = await holidayPage.getHeadingText();
    expect(finalHeading).toContain("Calculate holiday entitlement");
  });

  test("No answers provided for leave year start question", async ({
    page,
  }) => {
    // 1. Navigate to calculator URL (handled by beforeEach)

    // 2. Click Start now
    await holidayPage.clickStartNow();

    // 3. Select yes for irregular hours
    await holidayPage.irregularHours.selectYes();
    await holidayPage.irregularHours.clickContinue();

    // 4. Click continue without entering date
    await holidayPage.leaveYear.clickContinue();

    // 5. Verify error message is displayed on leave year page
    // The leave year page shows errors inline on the date inputs
    const dayInput = page.getByRole("textbox", { name: "Day" });
    await dayInput.waitFor({ state: "visible", timeout: 5000 });

    // Check that the page shows an error (validation error for date fields)
    const bodyText = (await page.locator("body").textContent()) || "";
    expect(bodyText).toContain("Error");

    // Scroll to ensure error is visible
    await dayInput.scrollIntoViewIfNeeded();
  });
});
