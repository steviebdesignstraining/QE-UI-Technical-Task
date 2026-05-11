# Playwright Test Suite

A comprehensive end-to-end testing framework built with Playwright for UI testing.

## Project Structure

```
Playwright_test/
├── fixtures/          # Test fixtures and setup data
├── pages/            # Page Object Models (POM)
├── selectors/        # Centralized selectors and locators
├── test_data/        # Test data files (JSON, CSV, etc.)
├── tests/            # Test specifications
├── utils/            # Utility functions and helpers
├── playwright-report/ # HTML test reports (generated)
├── test-results/     # Test results and artifacts (generated)
├── .env              # Environment variables (create from .env.example)
├── package.json      # Project dependencies and scripts
├── playwright.config.ts # Playwright configuration
├── tsconfig.json     # TypeScript configuration
└── README.md         # This file
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   ```bash
   cp .env .env.local  # Optional: create local overrides
   ```
   
   Edit `.env` file to set your test environment variables:
   - `BASE_URL`: The base URL of your application
   - `HEADLESS`: Run tests in headless mode (true/false)
   - `TIMEOUT`: Default timeout in milliseconds

### Running Tests

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests in debug mode
npm run test:debug

# Run tests for specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests across all browsers
npm run test:all

# View test report
npm run test:report
```

### Test Reports

After running tests, you can view the HTML report:

```bash
npm run test:report
```

The report will be available in `playwright-report/` directory.

## Writing Tests

### Test File Location

Place your test files in the `tests/` directory with `.spec.ts` extension.

Example: `tests/login.spec.ts`

### Using Page Objects

1. Create a page object in `pages/` directory:

```typescript
// pages/LoginPage.ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
```

2. Use the page object in your tests:

```typescript
// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('user@example.com', 'password123');
    
    expect(page.url()).toContain('/dashboard');
  });
});
```

### Using Fixtures

Fixtures are defined in `fixtures/` directory. They provide reusable test setup and teardown logic.

Example:

```typescript
// fixtures/auth.fixture.ts
import { test as baseTest } from '@playwright/test';

export const test = baseTest.extend<{
  authToken: string;
}>({
  authToken: async ({}, use) => {
    // Setup: get authentication token
    const token = await getAuthToken();
    await use(token);
    // Teardown: cleanup if needed
  },
});
```

### Centralized Selectors

Keep all selectors in `selectors/` directory for better maintainability:

```typescript
// selectors/selectors.ts
export const Selectors = {
  LOGIN_FORM: '#login-form',
  USERNAME_INPUT: '#username',
  PASSWORD_INPUT: '#password',
  SUBMIT_BUTTON: 'button[type="submit"]',
  ERROR_MESSAGE: '.error-message',
};
```

## Configuration

### Environment Variables

| Variable    | Description                          | Default                    |
|-------------|--------------------------------------|----------------------------|
| BASE_URL    | Base URL of the application          | http://localhost:3000     |
| HEADLESS    | Run tests in headless mode           | true                      |
| SLOWMO      | Slow down operations (ms)            | 0                         |
| TIMEOUT     | Test timeout in milliseconds         | 30000                     |
| API_BASE_URL| Base URL for API requests            | http://localhost:3000/api |

### Playwright Config

Key configurations in `playwright.config.ts`:

- `testDir`: Directory containing test files
- `fullyParallel`: Run tests in parallel
- `retries`: Number of retries for failed tests
- `reporter`: Test report format and location
- `use`: Default browser options (baseURL, trace, screenshot, etc.)
- `projects`: Browser configurations

## TypeScript Support

The project uses TypeScript for type safety. The `tsconfig.json` is configured for Playwright tests.

Run type checking:

```bash
npm run typecheck
```

## Linting

Lint your test code:

```bash
npm run lint
```

## Test Data

Store test data in `test_data/` directory as JSON, CSV, or other formats:

```json
// test_data/users.json
{
  "validUsers": [
    { "email": "user1@example.com", "password": "pass123" },
    { "email": "user2@example.com", "password": "pass456" }
  ]
}
```

Load test data in your tests:

```typescript
import users from '../test_data/users.json';
```

## Utilities

Common helper functions are placed in `utils/` directory:

- `helpers.ts`: General helper functions
- `api.ts`: API request helpers
- `assertions.ts`: Custom assertions

## Best Practices

1. **Page Object Pattern**: Use POM for better maintainability
2. **Avoid Hardcoded Selectors**: Use centralized selectors
3. **Use Fixtures**: For shared setup/teardown logic
4. **Keep Tests Independent**: Each test should be able to run alone
5. **Use Descriptive Names**: Test names should describe what they test
6. **Assert Properly**: Use Playwright's built-in assertions
7. **Handle Waits Properly**: Use auto-waiting, avoid fixed delays
8. **Clean Up**: Ensure tests don't leave residual state

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
```

## Troubleshooting

### Tests failing in CI but passing locally

- Check if `HEADLESS` is set correctly
- Ensure `BASE_URL` is accessible from CI
- Review retry settings in config

### Slow tests

- Use `--headed` to debug visually
- Check for unnecessary page navigations
- Use `expect.poll` for dynamic content

### Selector issues

- Use Playwright Inspector: `npx playwright test --debug`
- Generate selectors automatically with codegen
- Prefer user-facing attributes (data-testid, aria-label)

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

## License

ISC
