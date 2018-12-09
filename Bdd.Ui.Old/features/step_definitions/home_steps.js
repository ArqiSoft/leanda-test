var homePage = require('../pages/homePage.js');
var loginPage = require('../pages/loginPage.js');
var browserView = require('../pages/browserView.js');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function () {

    this.When(/^I click Upload and Organize panel$/, function () {
        homePage.capabilities.organizePanel.click();
    });

    this.Then(/^I should see browser window$/, function (callback) {
        browser.driver.sleep(1000);
        expect(browserView.dropZone.getText()).to.eventually.equal('Drop your files here')
            .notify(callback)
    });

    this.When(/^I click Home link in the menu$/, function () {
        homePage.menuLinks.homeLink.click()
    });

    this.Then(/^I navigate back to Home screen$/, function (callback) {
        expect(homePage.homeText.getText()).to.eventually.equal('ONE PLACE TO STORE')
        .notify(callback);
    });

    this.When(/^I click Share panel$/, function () {
        homePage.capabilities.sharePanel.click();
    });

    this.Then(/^I should see Share panel$/, function (callback) {
        callback(null, 'pending')
    });

    this.When(/^I click Annotate panel$/, function () {
        homePage.capabilities.annotatePanel.click()
    });

    this.Then(/^I should see Annotate panel$/, function (callback) {
        callback(null, 'pending');
    });

    this.When(/^I click Organize link in the menu$/, function () {
        homePage.menuLinks.organizeLink.click();
    });

    this.When(/^I click Profile link in the menu$/, function () {
        homePage.menuLinks.loginLink.click();
    });

    this.Then(/^I should see Profile page$/, function (callback) {
        callback(null, 'pending');
    });

}