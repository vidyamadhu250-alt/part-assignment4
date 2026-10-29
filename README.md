Playwright Automation Testing Project

Project Overview

This project contains three automated testing exercises using Playwright and JavaScript.

Test Files

1. flightPurchase.spec.js

   - Automates a flight booking workflow.
   - Validates flight purchase and confirmation details.

2. loginLogout.spec.js

   - Tests login functionality on SauceDemo.
   - Verifies successful login and logout behavior.

3. loginValidation.spec.js

   - Tests login form validation.
   - Covers empty fields, email only, password only, and invalid credentials.

Technologies Used

- JavaScript
- Playwright Test
- Node.js
- Chromium

Installation

Install Node.js, then open a terminal in the project directory.

Install project dependencies:

npm install

Install the Chromium browser:

npx playwright install chromium

Run Tests

Run all tests:

npx playwright test

Run a specific test file:

npx playwright test tests/flightPurchase.spec.js

npx playwright test tests/loginLogout.spec.js

npx playwright test tests/loginValidation.spec.js

Run tests with the browser visible:

npx playwright test --headed

Run tests using Chromium:

npx playwright test --project=chromium

View the HTML Report

After test execution, generate and view the report:

npx playwright show-report


Repository

GitHub repository link: 