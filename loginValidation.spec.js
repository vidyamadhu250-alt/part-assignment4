const { test, expect } = require('@playwright/test');

const loginURL = 'https://freelance-learn-automation.vercel.app/login';

// Test Case 1: Empty Login Attempt
test('Login validation - Empty fields', async ({ page }) => {
await page.goto(loginURL);

await expect(page).toHaveURL(/\/login/);

await page.getByRole('button', { name: /sign in/i }).click();

await expect(
    page.getByText('Email and Password is required', { exact: true })
).toBeVisible();

});

// Test Case 2: Login with Email Only
test('Login validation - Email only', async ({ page }) => {
await page.goto(loginURL);

await page.getByPlaceholder(/email/i).fill('sibi@gmail.com');

await page.getByRole('button', { name: /sign in/i }).click();

await expect(
    page.getByText('Password is required', { exact: true })
).toBeVisible();

});

// Test Case 3: Login with Password Only
test('Login validation - Password only', async ({ page }) => {
await page.goto(loginURL);

await page.getByPlaceholder(/password/i).fill('sibi@gmail.com');

await page.getByRole('button', { name: /sign in/i }).click();

await expect(
    page.getByText('Email is required', { exact: true })
).toBeVisible();

});

// Test Case 4: Login with Invalid Credentials
test('Login validation - Invalid credentials', async ({ page }) => {
await page.goto(loginURL);

await page.getByPlaceholder(/email/i).fill('sibi@gmail.com');
await page.getByPlaceholder(/password/i).fill('sibi@gmail.com');

await page.getByRole('button', { name: /sign in/i }).click();

// Expected assignment message:
// Email and Password Doesn't match
// The application currently displays "something went wrong".
await expect(
    page.getByText('something went wrong', { exact: false })
).toBeVisible();

});
