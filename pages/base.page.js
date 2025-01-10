// BasePage class provides common functionalities for all page objects.
class BasePage {
  constructor(page) {
    this.page = page; // Store the Playwright page instance.
  }

  // Placeholder method to verify if a page is loaded. Must be implemented by child classes.
  async isPageLoaded() {
    throw new Error('isPageLoaded() must be implemented by the child class'); // Enforcing override in child classes.
  }
}

// Export the BasePage class for use in other files.
module.exports = BasePage;
