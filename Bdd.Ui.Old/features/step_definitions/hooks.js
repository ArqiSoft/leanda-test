var homePage = require('../pages/homePage.js');
var loginPage = require('../pages/loginPage.js');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;


var myHooks = function () {
    // this.BeforeFeature(function (event, callback) {
    //     console.log('before feature hook');
    //     callback();
    // })

    this.AfterFeature(function (event, callback) {
       // console.log('after feature hook');
        var EC = protractor.ExpectedConditions
        homePage.menuLinks.homeLink.click();
        var header = loginPage.logoutHeader

        homePage.menuLinks.logoutLink.click().then(function () {
            var confirmBtn = loginPage.logoutConfirmBtn;
            browser.driver.wait(EC.visibilityOf(confirmBtn), 1000).then(
                function () {
                    confirmBtn.click()
                }
            )
        })
        expect(header.getText()).to.eventually.include('You are now logged out')
            .and.notify(callback);
    })
}
module.exports = myHooks