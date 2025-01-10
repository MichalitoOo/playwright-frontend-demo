const BasePage = require('./base.page.js');

// LoginPage class handles the login-related interactions and inherits from BasePage.
class LoginPage extends BasePage {
  constructor(page) {
    super(page); // Call the parent constructor.
    this.usernameField = '#user-name';
    this.passwordField = '#password';
    this.loginButton = '#login-button';
    this.errorMessage = '[data-test="error"]';
  }

  // Override
  async isPageLoaded() {
    const selectors = [this.usernameField, this.passwordField, this.loginButton];
    for (let selector of selectors) {
      try {
        await this.page.waitForSelector(selector); // Wait for the element to appear.
      } catch (error) {
        console.error(`LoginPage.isPageLoaded() failed to find element: ${selector}`);
        return false;
      }
    }
    return true; // All elements are loaded.
  }

  // Perform login by filling the username, password, and clicking the login button.
  async performLogin(username, password) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  // Check if the login error message is visible on the page.
  async isErrorMessageDisplayed() {
    return await this.page.isVisible(this.errorMessage);
}

  // Retrieve the error message text if present on the login page.
  async getErrorMessage() {
    const errorMessageLocator = this.page.locator(this.errorMessage);
    return await errorMessageLocator.textContent(); // Fetch the error message text.

    /*
    Alternative:
    return await this.page.textContent(this.errorMessage);

    Note: 
    Using locator as above is more future proof and it's best practise esp. if we need to 
    reuse the same locator for multiple actions like .isVisible() or .click() 
    */
  }
}

// Export the LoginPage class for use in tests or other modules.
module.exports = LoginPage;
