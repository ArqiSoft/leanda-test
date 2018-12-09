var homePage = require('../pages/homePage.js');
var loginPage = require('../pages/loginPage.js');

//var homePage = new HomePage();
//var loginPage = new LoginPage();

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function () {

    // Log In Step-by-Step

    this.Given(/^I go to "([^"]*)"$/, function (site) {
        // 
        browser.get(site);
    });

    this.Given(/^I go to the site$/, function () {
        // baseUrl is taken from protractor.conf.js file
        browser.get(browser.baseUrl);
    });

    this.When(/^I am on the login page$/, function () {
        homePage.menuLinks.loginLink.click();
    });

    this.When(/^I fill the username with "([^"]*)"$/, function (text) {
        loginPage.usernameField.sendKeys(text)
    });

    this.When(/^I fill the password with "([^"]*)"$/, function (text) {
        loginPage.passwordField.sendKeys(text);
    });

    this.When(/^I click button$/, function () {
        loginPage.loginBtn.click();
    });

    this.Then(/^I should see "([^"]*)" on the Home page$/, {
        timeout: 60 * 1000
    }, function (text, callback) {
        expect(homePage.menuLinks.loginLink.getText()).to.eventually.equal(text)
            .and.notify(callback);
    });

    //Log In  in one step
    this.When(/^login as a test user$/, function () {
        loginPage.logIn('test1', 'qqq123');
    });

    //Log Out Step-by-Step

    this.When(/^User click Log Out link$/, function () {

        homePage.menuLinks.homeLink.click();
        homePage.menuLinks.logoutLink.click().then(function () {
            // console.log('logging out');
            browser.driver.sleep(1000)
        })
    });

    this.When(/^User confirm log out decision$/, function () {
        var el = loginPage.logoutConfirmBtn;
        el.click();
    });
    // another aproach of Log Out
    this.When(/^User click Log Out$/, function () {

        var EC = protractor.ExpectedConditions
        homePage.menuLinks.homeLink.click();
        homePage.menuLinks.logoutLink.click().then(function () {
            var confirmBtn = loginPage.logoutConfirmBtn;
            browser.driver.wait(EC.visibilityOf(confirmBtn), 1000).then(
                function () {
                    confirmBtn.click()
                }
            )
        })
    });

    this.Then(/^Log out confirmation should appear$/, function (callback) {
        var header = loginPage.logoutHeader
        expect(header.getText()).to.eventually.include('You are now logged out')
            .and.notify(callback);
    });
}