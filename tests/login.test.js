require('dotenv').config(); // Only required for local development to fetch credentials from .env

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page.js');
const InventoryPage = require('../pages/inventory.page.js');
const { URL, invalidTestData } = require('../testData.js');

// Get credentials from environment variables
const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;

// Test: Login with invalid credentials
for (const { username, password, expectedErrorMessage } of invalidTestData) {
  test(`Login with invalid credentials: ${username} / ${password}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(URL);

    // Perform login
    await loginPage.performLogin(username, password);

   // Assert error message is displayed
   expect(await loginPage.isErrorMessageDisplayed()).toBe(true);

    // Retrieve error message text
    const actualErrorMessage = await loginPage.getErrorMessage();

    // Assert the error message is as expected
    expect(await actualErrorMessage.trim()).toBe(expectedErrorMessage);
  });
}

// Test: Login with valid credentials
test('Login with valid credentials', async ({ page }) => {
  
  // Ensure credentials are available
  if (!USERNAME || !PASSWORD) {
    throw new Error('Environment variables APP_USERNAME or APP_PASSWORD are not set. Please check your .env file.');
  }

  console.log('USERNAME:', USERNAME);
  console.log('PASSWORD:', PASSWORD ? '****' : 'Not set');

  const loginPage = new LoginPage(page);
  await page.goto(URL);

  // Perform login
  await loginPage.performLogin(USERNAME, PASSWORD);

  // Assert successful login
  const inventoryPage = new InventoryPage(page);
  expect(await inventoryPage.isPageLoaded()).toBe(true);
});
