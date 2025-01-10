require('dotenv').config(); // Import env variables

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page.js'); // Import LoginPage
const InventoryPage = require('../pages/inventory.page.js'); // Import InventoryPage
const { URL } = require('../testData.js'); // Import URL

// Get credentials from environment variables
const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;

// Setup: Login before each test
test.beforeEach(async ({ page }) => {
    // Ensure credentials are available
    if (!USERNAME || !PASSWORD) {
        throw new Error('Environment variables APP_USERNAME or APP_PASSWORD are not set. Please check your .env file.');
    }

    const loginPage = new LoginPage(page);
    await page.goto(URL);

    // Log in to the app
    await loginPage.performLogin(USERNAME, PASSWORD);

    // Assert successful login
    const inventoryPage = new InventoryPage(page);
    const isLoaded = await inventoryPage.isPageLoaded();
    expect(isLoaded).toBe(true);
});

// Test: Add item to cart
test('Add item to cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Retrieve the initial cart quantity
    const initialQuantity = await inventoryPage.getCartQuantity();

    // Add the first available item to the cart
    await inventoryPage.addItemToCart();

    // Retrieve the updated cart quantity
    const updatedQuantity = await inventoryPage.getCartQuantity();

    // Assert cart quantity update
    expect(updatedQuantity).toBe(initialQuantity + 1);
});

// Test: Remove item from cart
test('Remove item from cart', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    // Retrieve the initial cart quantity
    const initialQuantity = await inventoryPage.getCartQuantity();

    // Add the first two available items to the cart
    await inventoryPage.addItemToCart();
    await inventoryPage.addItemToCart();

    // Retrieve the updated cart quantity
    let updatedQuantity = await inventoryPage.getCartQuantity();

    // Assert cart quantity update
    expect(updatedQuantity).toBe(initialQuantity + 2);

    // Remove one item from the cart
    await inventoryPage.removeItemFromCart();

    // Retrieve the updated cart quantity
    updatedQuantity = await inventoryPage.getCartQuantity();

    // Assert cart quantity update
    expect(updatedQuantity).toBe(initialQuantity + 1);

    // Remove another item from the cart
    await inventoryPage.removeItemFromCart();

    // Retrieve the updated cart quantity
    updatedQuantity = await inventoryPage.getCartQuantity();

    // Assert cart quantity update
    expect(updatedQuantity).toBe(initialQuantity);
});
