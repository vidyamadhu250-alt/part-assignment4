const { test, expect } = require('@playwright/test');

test('Flight purchase on BlazeDemo', async ({ page }) => {

    // Step 1: Open BlazeDemo and search for flights
    await page.goto('https://blazedemo.com/');

    const departure = page.locator('select[name="fromPort"]');
    const destination = page.locator('select[name="toPort"]');

    await departure.selectOption({ label: 'Boston' });
    await destination.selectOption({ label: 'New York' });

    // Verify departure and destination
    await expect(departure).toHaveValue('Boston');
    await expect(destination).toHaveValue('New York');

    await page.getByRole('button', { name: 'Find Flights' }).click();

    // Step 2: Locate and select Lufthansa
    const lufthansaRow = page.locator('table tbody tr').filter({
        hasText: 'Lufthansa'
    });

    await expect(lufthansaRow).toHaveCount(1);
    await expect(lufthansaRow).toContainText('Lufthansa');

    await lufthansaRow.getByRole('button', {
        name: 'Choose This Flight'
    }).click();

    // Step 3: Verify purchase page navigation
    await expect(page).toHaveURL(/purchase/i);
    await expect(page).toHaveTitle(/purchase/i);

    // Step 4: Verify flight details
    await expect(
        page.getByText('Airline: United', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Flight Number: UA954', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Price: 400', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Arbitrary Fees and Taxes: 514.76', {
            exact: true
        })
    ).toBeVisible();

    await expect(
        page.getByText('Total Cost: 914.76', { exact: true })
    ).toBeVisible();

    // Step 5: Fill passenger and payment details
    await page.getByLabel('Name', { exact: true })
        .fill('Playwright JS');

    await page.getByLabel('Address', { exact: true })
        .fill('Bangalore');

    await page.getByLabel('State', { exact: true })
        .fill('Karnataka');

    await page.locator('select')
        .selectOption({ label: 'American Express' });

    await page.getByLabel('Credit Card Number', { exact: true })
        .fill('556622337788');

    await page.getByLabel('Year', { exact: true })
        .fill('2025');

    await page.getByLabel('Name on Card', { exact: true })
        .fill('Playwright By Microsoft');

    // Verify the entered form values
    await expect(
        page.getByLabel('Name', { exact: true })
    ).toHaveValue('Playwright JS');

    await expect(
        page.getByLabel('Address', { exact: true })
    ).toHaveValue('Bangalore');

    await expect(
        page.getByLabel('State', { exact: true })
    ).toHaveValue('Karnataka');

    await expect(
        page.getByLabel('Credit Card Number', { exact: true })
    ).toHaveValue('556622337788');

    await expect(
        page.getByLabel('Year', { exact: true })
    ).toHaveValue('2025');

    await expect(
        page.getByLabel('Name on Card', { exact: true })
    ).toHaveValue('Playwright By Microsoft');

    // Step 6: Check Remember me
    const rememberMe = page.getByLabel('Remember me');

    await rememberMe.check();
    await expect(rememberMe).toBeChecked();

    // Step 7: Purchase the flight
    await page.getByRole('button', {
        name: 'Purchase Flight'
    }).click();

    await expect(page).toHaveURL(/confirmation/i);

    // Step 8: Verify confirmation page and capture Order ID
    await expect(
        page.getByRole('heading', {
            name: 'Thank you for your purchase today!'
        })
    ).toBeVisible();

    /*const orderIdRow = page.getByRole('row').filter({
        has: page.getByRole('cell', {
            name: 'Id',
            exact: true
        })
    });

    await expect(orderIdRow).toHaveCount(1);

    const orderId = (
        await orderIdRow.locator('td').nth(1).innerText()
    ).trim();

    // Verify Order ID is not null, empty, or whitespace
    expect(orderId).not.toBeNull();
    expect(orderId).not.toBe('');
    expect(orderId).toMatch(/\S/);

    // Print the generated Order ID
    console.log('Generated Order ID:', orderId);*/

    const orderIdRow = page.getByRole('row').filter({
    has: page.getByRole('cell', {
        name: 'Id',
        exact: true
    })
});

await expect(orderIdRow).toHaveCount(1);

// Extract the Order ID
const orderId = (
    await orderIdRow.locator('td').nth(1).innerText()
).trim();

// Validate the Order ID
expect(orderId).not.toBeNull();
expect(orderId).not.toBe('');
expect(orderId).toMatch(/\S/);

// Print the Order ID
console.log('Generated Order ID:', orderId);

});
