const config = {
    URL: 'https://www.saucedemo.com',
    invalidTestData: [
        { username: 'standard_user', password: '', expectedErrorMessage: 'Epic sadface: Password is required' },
        { username: '', password: 'invalid_password', expectedErrorMessage: 'Epic sadface: Username is required' },
        { username: '', password: '', expectedErrorMessage: 'Epic sadface: Username is required' },
        { username: 'standard_user', password: 'invalid_password', expectedErrorMessage: 'Epic sadface: Username and password do not match any user in this service' },
        { username: 'locked_out_user', password: 'secret_sauce', expectedErrorMessage: 'Epic sadface: Sorry, this user has been locked out.' },
        { username: 'invalid_user', password: 'invalid_password', expectedErrorMessage: 'Epic sadface: Username and password do not match any user in this service' }
      ],
    checkoutDetails: {
      firstName: "Michal",
      lastName: "Nalevanko",
      zipCode: "04011"
    }
}

module.exports = config;