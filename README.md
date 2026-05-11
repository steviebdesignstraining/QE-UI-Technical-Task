# 🚀 Stephen Bennett's QA Automation Project

[](https://github.com/steviebdesignstraining/waracle_takehome_Test/actions/workflows/main.yml/badge.svg)

## 👋 Introduction

![Stephen_.png](https://github.com/steviebdesignstraining/waracle_takehome_Test/raw/main/Stephen_.png)

Hi there\! Before we blast off into the code-verse, I want to introduce myself. My name is **Stephen Bennett**, and I've been immersed in the world of testing for over **12 years**. I genuinely enjoy the development space and bringing a positive, optimistic, and adaptable spirit to any team. I'm sociable and thrive in diverse environments, working well with all personalities.

First off, I absolutely **loved** completing this take-home test\! I got a bit carried away and ended up building **two** automation frameworks: one with **Playwright**. 

Let's dive into what I've accomplished\!

-----

## 🎯 Project Overview

This project showcases automating a public-facing UK Government webpage, 'Calculate your holiday entitlement'. Please write a working automated UI test suite.

You have autonomy on this task; the only remits are that you keep to the language and tools we have mentioned, that you provide a working solution, and clear instructions on how to build and execute your solution.

We are looking for a demonstration of your technical skills, your ability to write a clear working solution that can be shared, and your 'tester mindset'. We would like to see evidence of:

- Maintainable Code
- Readable Code
- Scalable Code
- Best Practices

The URL for 'Calculate your holiday entitlement': https://www.gov.uk/calculate-your-holiday-entitlement

### 🔍 Scope of Automation

My automated tests cover positive and negative scenarios utilising the POM (Page Object Model).


The tests are meticulously implemented **Playwright with Typescript**, adhering to best practices in automation and QA. 

🔗 **Calculate your holiday entitlement**: [[https://www.gov.uk/calculate-your-holiday-entitlement]]

-----

## 📋 Manual Test Plan

As mentioned, I've created a detailed **manual test plan** that outlines the key user flows, cases, and scenarios that have been automated. This plan ensures that all critical functionalities of the gov website are thoroughly tested and serves as a blueprint for the automated scripts.

📖 **View the Test Plan / Bug report**: [(https://www.notion.so/MaPS-QE-UI-Technical-Task-35b40221abc0807081c8d63fee58f6ed?source=copy_link))

-----

## 🛠️ Setup Instructions

A comprehensive end-to-end testing framework built with Playwright for UI testing of the UK Government's "Calculate your holiday entitlement" service.

## 🛠️ Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/moneyadviceservice/QE-UI-Technical-Task.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd QE-UI-Technical-Task/Playwright_test
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

## Running Tests

| Command                      | Description                                    |
| :--------------------------- | :--------------------------------------------- |
| `npm test`                   | Run all tests                                  |
| `npm run test:ui`            | Run tests in UI mode (interactive)             |
| `npm run test:headed`        | Run tests in headed mode (see browser)         |
| `npm run test:debug`         | Run tests in debug mode                        |
| `npm run test:chromium`      | Run tests in Chromium browser                    |
| `npm run test:firefox`       | Run tests in Firefox browser                     |
| `npm run test:webkit`        | Run tests in WebKit browser                      |
| `npm run test:all`           | Run tests across all browsers                    |
| `npm run test:report`        | View HTML test report                            |
| `npm run typecheck`          | Run TypeScript type checking                     |
| `npm run lint`               | Lint the test code                               |

## Test Report

After running tests, view the HTML report:

```bash
npm run test:report
```

The report will be available in `playwright-report/` directory.

## Project Structure

```
Playwright_test/
├── pages/           # Page Object Models (POM)
├── selectors/       # Centralized selectors and locators
├── tests/           # Test specifications
├── test_data/       # Test data files
├── utils/           # Utility functions and helpers
├── playwright-report/  # HTML test reports (generated)
├── test-results/    # Test results and artifacts (generated)
├── .env             # Environment variables
├── package.json     # Project dependencies and scripts
├── playwright.config.ts  # Playwright configuration
└── tsconfig.json    # TypeScript configuration
```

## ✨ Features & Best Practices

- **TypeScript Support**: Full TypeScript implementation with robust type checking
- **Page Object Model (POM)**: A maintainable and scalable test architecture
- **Centralized Selectors**: All selectors in dedicated files for easy maintenance
- **Environment Configuration**: Flexible test environments via `.env`
- **Dynamic Calculation Validation**: Tests validate results against business logic
- **Accessibility Testing**: axe-core integration for accessibility checks
- **Multiple Test Scenarios**: Covers irregular hours, part-year workers, and error handling
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Ortoni Report**: Custom HTML reporting with test history

## Environment Variables (.env)

| Variable   | Description                    | Default                                    |
|------------|--------------------------------|--------------------------------------------|
| BASE_URL   | Base URL for tests             | https://www.gov.uk/calculate-your-holiday-entitlement |
| HEADLESS   | Run tests in headless mode     | true                                       |
| SLOWMO     | Slow down operations (ms)      | 0                                          |
| TIMEOUT    | Test timeout (ms)              | 30000                                      |

## 🚀 CI/CD Pipeline and Report Dashboard

```bash
# View test reports
npm run test:report
```

The framework integrates with GitHub Actions. Push to the repository to trigger automated test runs.

## ♿ Accessibility Testing

Accessibility testing is integrated using `@axe-core/playwright`. The framework follows WCAG 2.1 guidelines and includes checks for:

- Image alternative text
- Form labels and ARIA attributes
- Color contrast ratios
- Keyboard navigation

See the main repository README for 24 identified accessibility issues in the bonus task.

## Troubleshooting

1. Always check test execution videos and screenshots in `test-results/`
2. Review console output for detailed error messages
3. Validate your environment configuration in the `.env` file
4. Ensure all dependencies are properly installed (`npm install`)

-----

## 📋 Best Practices Summary

1. **Page Object Model**: For a highly maintainable and scalable test structure
2. **TypeScript**: Ensures type safety and provides a superior developer experience
3. **Centralized Selectors**: All selectors in dedicated files for easy maintenance
4. **Dynamic Calculation Validation**: Tests validate results against business logic
5. **Environment Configuration**: Offers flexibility for different testing environments
6. **Comprehensive Error Handling**: Robust management of test failures
7. **Cross-browser Testing**: Ensures broad compatibility
8. **Thorough Documentation**: Provides clear setup and usage guides
