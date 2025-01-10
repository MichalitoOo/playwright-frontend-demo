# Front-End Test Automation Project

This project is a front-end test automation framework designed to validate the functionality of the [SauceDemo](https://www.saucedemo.com/) application in [Playwright](https://playwright.dev/). The tests ensure the end-to-end functionality of key features like user login, cart management, and completing orders. 

## Features
- Page Object Model (POM) for maintainable and scalable test code.
- Environment configuration via `.env` files.
- Detailed assertions and validation for UI elements and workflows.

## Prerequisites

Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [Playwright](https://playwright.dev/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and configure it with SauceDemo credentials:
   ```env
   APP_USERNAME=<your-username>
   APP_PASSWORD=<your-password>
   ```

## Project Structure

```plaintext
.
├── pages
│   ├── base.page.js        # Base class for common methods
│   ├── login.page.js       # Login page interactions
│   ├── inventory.page.js   # Inventory page interactions
│   ├── cart.page.js        # Cart page interactions
│   ├── checkout.page.js    # Checkout page interactions
│   └── ordercomplete.page.js # Order completion page interactions
├── tests
│   ├── login.test.js           # Tests for user login
│   ├── cart-operations.test.js # Tests for cart operations
│   └── complete-order.test.js  # End-to-end test for completing an order
├── testData.js             # Test data and application constants
├── playwright.config.js    # Playwright configuration
├── package.json            # Node.js dependencies
├── README.md               # Project documentation
└── .env                    # Environment variables (excluded from version control)
```

### Test Data
The `testData.js` file centralizes application constants such as URLs, endpoints, and reusable data.

## Running Tests

1. Run all tests:
   ```bash
   npx playwright test
   ```

2. Run a specific test file:
   ```bash
   npx playwright test tests/complete-order.test.js
   ```

3. Debug a test:
   ```bash
   npx playwright test --debug
   ```

