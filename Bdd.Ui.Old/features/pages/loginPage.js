'use strict';
var homePage = require('../pages/homePage.js');

module.exports = {
    usernameField: element(by.id('username')),
    passwordField: element(by.id('password')),
    loginBtn: element.all(by.id('localLoginBtn')),
    logoutConfirmBtn: element(by.buttonText('OK')),
    logoutHeader: $('.page-header'),

    logIn: function (username, password) {
        homePage.menuLinks.loginLink.click();
        this.usernameField.sendKeys(username);
        this.passwordField.sendKeys(password);

        this.loginBtn.click();
        browser.driver.getCurrentUrl().then(function (text) {
            if (text.includes('identity.your-company.com/core/connect/authorize')) {
                console.log('confirmation is needed')
                var allowBtn = element(by.buttonText('Yes, Allow'));
                allowBtn.click();
            } 
        })
        browser.IgnoreSynchronization = false;
    }
}