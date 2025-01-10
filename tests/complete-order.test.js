require('dotenv').config(); // Import env variables

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/login.page.js');
const InventoryPage = require('../pages/inventory.page.js');
const CartPage = require('../pages/cart.page.js');
const CheckoutPage = require('../pages/checkout.page.js');
const OrderCompletePage = require('../pages/orderComplete.page.js');
const { URL, checkoutDetails } = require('../testData.js'); // Import URL

// Get credentials from environment variables
const USERNAME = process.env.APP_USERNAME;
const PASSWORD = process.env.APP_PASSWORD;

// Setup: Login before each test
test.beforeEach(async ({ page }) => {
    if (!USERNAME || !PASSWORD) {
        throw new Error('Environment variables APP_USERNAME or APP_PASSWORD are not set. Please check your .env file.');
    }

    const loginPage = new LoginPage(page);
    await page.goto(URL);
    await loginPage.performLogin(USERNAME, PASSWORD);

    const inventoryPage = new InventoryPage(page);
    const isLoaded = await inventoryPage.isPageLoaded();
    expect(isLoaded).toBe(true);
});

// Test: Complete order for one item
test('Complete an order for one item', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderCompletePage = new OrderCompletePage(page);

    // Add item to cart
    await inventoryPage.addItemToCart();
    await inventoryPage.goToCart();

    // Validate item in cart
    expect(await cartPage.getItemCount()).toBeGreaterThan(0);

    // Proceed to checkout
    await cartPage.proceedToCheckout();

    // Fill in checkout details
    await checkoutPage.enterCheckoutDetails(checkoutDetails.firstName, checkoutDetails.lastName, checkoutDetails.zipCode);
    await checkoutPage.completeCheckout();

    // Assert order completion
    expect(await orderCompletePage.isOrderCompleteMessageDisplayed()).toBe(true);
    expect(await orderCompletePage.getOrderCompleteMessage()).toBe('Thank you for your order!');
});
