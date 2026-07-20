# Playwright Test Automation

End-to-end test automation framework built with Playwright and TypeScript.

This project demonstrates cross-browser UI automation for the SauceDemo e-commerce application using maintainable Page Object Model design and continuous integration with GitHub Actions.

## Test Coverage

| Feature | Scenario |
|---|---|
| Login | Login with valid credentials |
| Login | Display error for invalid credentials |
| Shopping Cart | Add and verify a product |
| Checkout | Complete an end-to-end order |

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Page Object Model
- GitHub Actions
- Chromium, Firefox and WebKit

## Project Structure

```text
playwright-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── cart.page.ts
│   ├── checkout.page.ts
│   ├── inventory.page.ts
│   └── login.page.ts
├── tests/
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── login.spec.ts
├── playwright.config.ts
├── package.json
└── README.md
```

## Prerequisites

Install:

- Node.js
- npm
- Git

## Installation

Clone the repository and install dependencies:

```bash
git clone REPOSITORY_URL
cd playwright-automation
npm ci
npx playwright install
```

## Running Tests

Run all tests across Chromium, Firefox and WebKit:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright UI mode:

```bash
npm run test:ui
```

Run tests in debug mode:

```bash
npm run test:debug
```

View the latest HTML report:

```bash
npm run report
```

## Continuous Integration

GitHub Actions automatically runs the complete cross-browser test suite for every push and pull request to the `main` branch.

The Playwright HTML report is uploaded as a workflow artifact and retained for 30 days.

## Author

Huda Luna