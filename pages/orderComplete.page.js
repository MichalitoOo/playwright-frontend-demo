const BasePage = require('./base.page');

// OrderCompletePage class manages cart-related interactions and inherits from BasePage.
class OrderCompletePage extends BasePage {
    constructor(page) {
        super(page); // Call the parent constructor.
        this.orderCompleteMessage = '.complete-header';
    }

    // Check if the order completion message is visible on the page.
    async isOrderCompleteMessageDisplayed() {
        return await this.page.isVisible(this.orderCompleteMessage);
    }

    // Retrieve the text content of the order completion message.
    async getOrderCompleteMessage() {
        return await this.page.textContent(this.orderCompleteMessage);
    }
}

// Export the OrderCompletePage class for use in tests or other modules.
module.exports = OrderCompletePage;
