const BasePage = require('./base.page');

// CartPage class manages cart-related interactions and inherits from BasePage.
class CartPage extends BasePage {
    constructor(page) {
        super(page); // Call the parent constructor.
        this.cartItem = '.cart_item';
        this.checkoutButton = 'button[data-test="checkout"]';
    }

    // Retrieve the number of items currently in the cart.
    async getItemCount() {
        return (await this.page.$$(this.cartItem)).length; // get lenght of array containing all items in the cart
    }

	// Click the checkout button to proceed to the next step.
    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }
}

// Export the CartPage class for use in tests or other modules.
module.exports = CartPage;
