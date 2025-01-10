const BasePage = require('./base.page');

// InventoryPage class manages inventory-related interactions and inherits from BasePage.
class InventoryPage extends BasePage {
    constructor(page) {
        super(page); // Call the parent constructor.
        this.addToCartButton = '[data-test*="add-to-cart"]'; // Selector for add-to-cart buttons.
        this.removeFromCartButton = '[data-test*="remove"]'; // Selector for remove-from-cart buttons.
        this.cartBadge = '[data-test="shopping-cart-badge"]'; // Selector for cart quantity badge.
        this.cartIcon = '#shopping_cart_container'; // Selector for the cart icon.
    }

    // Check if the inventory page is fully loaded by verifying required elements.
    // Override
    async isPageLoaded() {
        const selectors = [this.addToCartButton];
        for (let selector of selectors) {
            try {
                await this.page.waitForSelector(selector); // Wait for the element to appear.
            } catch (error) {
                console.error(`InventoryPage.isPageLoaded() failed to find element: ${selector}`);
                return false;
            }
        }
        return true; // All elements are loaded.
    }

    // Add an item to the cart. If itemName is provided, add that specific item; otherwise, add the first available item.
    async addItemToCart(itemName = null) {
        // If a specific item is provided, locate it
        if (itemName) {
            const itemSelector = this.addToCartButton.substring(-2) + `-${itemName}"]`; // removing "] to add itemName in the middle of the addToCartButton value
            const addButton = this.page.locator(itemSelector);

            if (await addButton.count() === 0) {
                throw new Error(`Item "${itemName}" not found on the inventory page.`);
            }
            await addButton.click();
        } else {
            // Add the first available item if item name was not provided
            const firstAddToCartButton = this.page.locator(this.addToCartButton).first();

            if (await firstAddToCartButton.count() === 0) {
                throw new Error('No items available to add to cart.');
            }
            await firstAddToCartButton.click();
        }
    }

    // Remove an item from the cart. If itemName is provided, remove that specific item; otherwise, remove the first available item.
    async removeItemFromCart(itemName = null) {
        // If a specific item is provided, locate it
        if (itemName) {
            const itemSelector = this.removeFromCartButton.substring(-2) + `-${itemName}"]`; // removing "] to add itemName in the middle of the removeFromCartButton value
            const removeButton = this.page.locator(itemSelector);

            if (await removeButton.count() === 0) {
                throw new Error(`Item "${itemName}" not found on the inventory page.`);
            }
            await removeButton.click();
        } else {
            // Add the first available item if no item name is provided
            const firstRemoveFromCartButton = this.page.locator(this.removeFromCartButton).first();

            if (await firstRemoveFromCartButton.count() === 0) {
                throw new Error('No items available to remove from cart.');
            }
            await firstRemoveFromCartButton.click();
        }
    }

    // Retrieve the number of items in the cart from the cart badge.
    async getCartQuantity() {
        const cartBadge = this.page.locator(this.cartBadge);

        // Check if the cart badge exists - if zero items are in the cart, it doesnt show the badge.
        if (await cartBadge.count() === 0) {
            // Check if the cart icon is visible
            if (!(await this.page.isVisible(this.cartIcon))) {
                throw new Error('Cart icon not visible.');
            }
            return 0; // Cart is empty if the badge is not visible.
        } else if (await cartBadge.count() > 1) { // There should be always only one badge with number of items in the cart.
            throw new Error('Multiple cart badges found.');
        }

        // Get the text content and convert it to a number
        const quantityText = await cartBadge.textContent();
        const quantity = parseInt(quantityText, 10); // Parse text and convert to decimal int.

        if (isNaN(quantity)) {
            throw new Error('Failed to parse cart quantity from cart badge.');
        }

        return quantity;
    }

    // Click cart icon
    async goToCart() {
        await this.page.click(this.cartIcon);
    }
}

// Export the InventoryPage class for use in tests or other modules.
module.exports = InventoryPage;
