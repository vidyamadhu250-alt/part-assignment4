const { test, expect } = require('@playwright/test');

test('SauceDemo Login and Logout Verification', async ({ page }) => {

    // Step 1: Navigate to the SauceDemo login page
    await page.goto('https://www.saucedemo.com/v1/index.html');

    // Step 2: Enter login credentials
    await page.getByRole('textbox', { name: 'Username' })
        .fill('standard_user');

    await page.getByRole('textbox', { name: 'Password' })
        .fill('secret_sauce');

    // Step 3: Click the Login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Step 4: Verify successful login and inventory URL
    await expect(page).toHaveURL(/inventory\.html/);

    // Step 5: Verify inventory page is visible
    await expect(page.locator('.inventory_list')).toBeVisible();

    // Step 6: Open the hamburger menu
    await page.locator('.bm-burger-button button').click();

    // Step 7: Verify the menu opens and click Logout
    const logoutButton = page.getByText('Logout', { exact: true });

    await expect(logoutButton).toBeVisible();
    await logoutButton.click();

    // Step 8: Verify redirection to the login page
    // SauceDemo redirects to the root URL after logout
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Step 9: Verify the username field is visible
    await expect(
        page.getByRole('textbox', { name: 'Username' })
    ).toBeVisible();

    // Step 10: Verify the password field is visible
    await expect(
        page.getByRole('textbox', { name: 'Password' })
    ).toBeVisible();

    // Step 11: Verify the Login button is visible
    await expect(
        page.getByRole('button', { name: 'Login' })
    ).toBeVisible();

    console.log('Login and Logout test completed successfully.');

});