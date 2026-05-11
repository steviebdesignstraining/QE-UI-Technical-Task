# MaPS QE UI Technical Task

Your task is to create a functional automated UI test suite using Playwright with Typescript. 

There are no trick questions; we want to see your solution work, analyse your code structure, and understand your thought process.

## 📝 The Task - Part 1

On a public facing UK Government webpage 'Calculate your holiday entitlement', please write a working automated UI test suite. 

You have autonomy on this task, the only remits are that you keep to the language and tools we have mentioned, that you provide a working solution and clear instructions on how to build and execute your solution.

We are looking for a demonstration of your technical skills, your ability to write a clear working solution that can be shared, and your 'tester mindset'. We would like to see evidence of:
* Maintenable Code
* Readable Code
* Scalable Code
* Best Practices

The URL for 'Calculate your holiday entitlement': https://www.gov.uk/calculate-your-holiday-entitlement

## 🎢 The Task - Part 2 (bonus task)

At MaPS, we prioritise Accessibility. While we understand that not everyone may meet our understanding of the subject, we are eager to gauge your knowledge and awareness in this area.

Task two is to launch the basic web page we have created 'index.html' and provide us with a list of Accessibility issues/bugs you can find.

You can provide your list of answers anywhere you like, but tell us where you have put them. (e.g. within you README.md). Finally please provide at least one of them in the format of a Bug report. (doesn't have to be more then 1 in this format, the others can just be a quick list).

#### Page Launch Instructions

To launch the page locally, follow these simple steps:

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the application:
   ```bash
   npm start
   ```
3. Open your web browser and navigate to:
   ```bash
   http://localhost:8080/
   ```

## 🕗 Time Allocation

There's no strict time limit for completing this task before the specified deadline given, we don't expect an extensive number of tests, but a well-rounded selection is appreciated.

If you have the time and inclination, feel free to attempt Task 2 (bonus task), also provide any additional thoughts on your framework solution, with any further considerations you would take in to account if you had more time.

## 🐞 Task 2 - Accessibility Audit Findings

After running automated accessibility testing using axe-core and manual inspection on http://localhost:8080/, the following 24 accessibility and functionality issues were identified:

### Accessibility Issues Table

| Bug Description | Steps | Expected Result | Actual Result | Console Log Evidence |
|-----------------|-------|-----------------|---------------|---------------------|
| Missing DOCTYPE declaration | View page source | Document should start with `<!DOCTYPE html>` | First line is `<html>` without doctype | Manual code inspection |
| Missing `<title>` element | Navigate to page | Document should have a descriptive title | `<title>` element is missing from `<head>` | axe-core violation: `document-title` (impact: serious) |
| Missing `lang` attribute on `<html>` | Navigate to page | `<html>` should have `lang` attribute (e.g., `lang="en"`) | `<html>` element has no `lang` attribute | axe-core violation: `html-has-lang` (impact: serious) |
| Missing charset meta tag | View page source | `<meta charset="UTF-8">` should be present | No charset meta tag in document | Manual code inspection |
| Missing viewport meta tag | View on mobile | Should be responsive on mobile devices | No viewport meta tag found | Manual code inspection |
| Missing image alternative text | Navigate with screen reader | Image should have descriptive alt text | `<img>` element has no `alt` attribute | axe-core violation: `image-alt` (impact: critical) |
| Form input "Full name" lacks label | Focus with screen reader | Input should have programmatic label | Only placeholder text, no `<label>` element | Screen reader announces no label |
| Form input "Email" lacks label | Focus with screen reader | Input should have programmatic label | Only placeholder text, no `<label>` element | Screen reader announces no label |
| Textarea "Your message" lacks label | Focus with screen reader | Textarea should have programmatic label | Only placeholder text, no `<label>` element | Screen reader announces no label |
| Button has `type="button"` | Click submit | Button should submit the form | Button type is "button", not "submit" | `<button type="button">` |
| Form missing `action` attribute | Submit form | Form should define where to send data | `<form>` has no action attribute | `<form>` element has no action |
| Form missing `method` attribute | Submit form | Form method should be defined (GET/POST) | `<form>` has no method attribute | `<form>` element has no method |
| Missing H1 heading | Navigate with screen reader | Page should have H1 for main title | Only H2 present, no H1 | Document structure check |
| Emoji 🎉 in button may confuse screen readers | Navigate with screen reader | Text should be meaningful | Emoji announced as "party popper" | Manual code inspection |
| Inline onclick handler without function | Click button | Should have defined JavaScript function | `submitForm()` is called but likely undefined | Manual code inspection |
| No main landmark | Navigate with screen reader | Page should have `<main>` element | No main landmark or role="main" | Landmark navigation check |
| Missing skip navigation link | Keyboard navigation | Should have skip link for keyboard users | No skip navigation link found | Keyboard navigation test |
| Spelling error "Accesibility" | Read page content | Should say "Accessibility" | Typo present in H2 | Manual code inspection |
| Button may lack visible focus indicator | Tab to button | Focus should be clearly visible | :focus state may not show outline | CSS inspection |
| Fixed width layout not responsive | View on mobile | Layout should be responsive | Form uses fixed 800px width | CSS inspection |
| Input fields missing `name` attributes | Form submission | Fields need names for server-side processing | Inputs have no name attributes | Form data cannot be properly validated |
| Button type prevents form submission | Click Done button | Form should be submitable | Button type="button" prevents submission | User cannot submit the form |
| Inline onclick event handler | Click button | Should use proper event listeners | Inline JavaScript presents XSS risk | Security concern with inline handlers |
| No form validation constraints | Submit invalid data | Should validate email format | Email input has no pattern validation | Invalid data could be submitted |

---

### Bug Report Format (Critical Issue)

| Field | Details |
|-------|---------|
| **Bug ID** | A11Y-001 |
| **Title** | Missing image alternative text on robot image |
| **Severity** | Critical |
| **WCAG Reference** | WCAG 2.1 Level A, Success Criterion 1.1.1 (Non-text Content) |
| **Description** | The `<img>` element displaying the robot image lacks alternative text, which is essential for screen reader users to understand the content and purpose of the image. Without alt text, screen reader users will hear the filename "robot-3114245_1280.png" read aloud. |
| **Steps to Reproduce** | 1. Navigate to http://localhost:8080/ 2. Inspect the robot image element 3. Observe that the `alt` attribute is missing |
| **Expected Result** | The `<img>` element should have an `alt` attribute with descriptive text (e.g., `alt="Robot assistant icon"`) |
| **Actual Result** | `<img class="contact-image" src="images/robot-3114245_1280.png">` has no `alt` attribute |
| **Console Log Evidence** | axe-core output: `{ "id": "image-alt", "impact": "critical", "description": "Ensure <img> elements have alternative text or a role of none or presentation" }` |

---

## 📨 Presenting/Submitting Your Solution

Please download and email your solution from a private Github repository you have created and send the Zip back to us. Any issues please do get in touch with the recruiter you have been speaking with.
