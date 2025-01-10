const BasePage = require('./base.page');

// CheckoutPage class manages checkout-related interactions and inherits from BasePage.
class CheckoutPage extends BasePage {
    constructor(page) {
        super(page); // Call the parent constructor.
        this.firstNameField = 'input[data-test="firstName"]';
        this.lastNameField = 'input[data-test="lastName"]';
        this.postalCodeField = 'input[data-test="postalCode"]';
        this.continueButton = 'input[data-test="continue"]';
        this.finishButton = 'button[data-test="finish"]';
    }

    // Enter the user details required for checkout.
    async enterCheckoutDetails(firstName, lastName, postalCode) {
        await this.page.fill(this.firstNameField, firstName);
        await this.page.fill(this.lastNameField, lastName);
        await this.page.fill(this.postalCodeField, postalCode);
    }

    // Complete the checkout process by clicking the continue and finish buttons.
    async completeCheckout() {
        await this.page.click(this.continueButton);
        await this.page.click(this.finishButton);
    }
}

// Export the CheckoutPage class for use in tests or other modules.
module.exports = CheckoutPage;