var homePage = require('../pages/homePage.js');
var loginPage = require('../pages/loginPage.js');
var browserView = require('../pages/browserView.js');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;


module.exports = function () {
    // toolbar
    this.When(/^I click Add folder button$/, function (callback) {
        browserView.scrollUp();
        var newFolderBtn = browserView.toolbar.addFolder;
        expect(newFolderBtn.isDisplayed()).to.eventually.be.true;
        newFolderBtn.click();
        expect(browserView.dialogbox.dialogWindow.isDisplayed()).to.eventually.be.true.notify(callback);
    });

    this.When(/^click Delete button$/, function (callback) {
        browserView.scrollUp();
        browserView.toolbar.deleteFolder.click();
        expect(browserView.dialogbox.dialogWindow.isDisplayed()).to.eventually.be.true.notify(callback);

    });

    this.When(/^click Rename button$/, function () {
        browserView.scrollUp();
        browserView.toolbar.renameFolder.click();
    });

    this.When(/^click Move button$/, function (callback) {
        browserView.scrollUp();
        browserView.toolbar.moveFolder.click();
        browser.driver.sleep(1500);
        expect(browserView.dialogbox.dialogWindow.isDisplayed()).to.eventually.be.true.notify(callback);

    });

    //dialogbox

    this.When(/^enter valid folder name "([^"]*)"$/, function (foldername) {
        browserView.dialogbox.foldernameInput.sendKeys(foldername)
            .then(function () {
                browserView.dialogbox.createBtn.getAttribute('ng-reflect-disabled')
                    .then(function (result) {
                        // console.log('name exist:', result);
                        if (result == 'true') {
                            browserView.dialogbox.foldernameInput.sendKeys('_' + Math.random())
                        }
                    })
            })
    });

    this.When(/^click Create button$/, function () {
        browserView.dialogbox.createBtn.click()
        browser.driver.sleep(1000)
        // below we can check number of tiles after creating new folder
        // .then(function () {
        //     element.all(by.css('.tile-title')).count().then(function (count) {
        //         // console.log('folder count with added:', count);
        //     });
        // });
    });

    this.When(/^confirm deleting$/, function () {
        browserView.dialogbox.deleteBtn.click()
    });

    // Moving Dialog Window

    this.When(/^I move to "([^"]*)" directory$/, function (arg) {
        browserView.scrollUp();
        browser.driver.sleep(100)
        var newdestination = element(by.cssContainingText('.move-item', arg))
        newdestination.click();
    });

    this.When(/^I move to TEST_F1 from TEST_F2  directory$/, function () {
        //browserView.scrollUp();
        var back = browserView.dialogbox.moveNavigationBack;
        back.click().then(function () {
            browser.driver.sleep(1500);
            //check is not working here: expect(browserView.dialogbox.moveNavigationTitle).to.eventually.be.equal('drafts').notify(callback);
        })
        var newdestination = browserView.dialogbox.moveTo("TEST_F1");
        newdestination.click();
    });

    this.When(/^Confirm moving to selected folder$/, function () {
        browserView.dialogbox.moveBtn.click()
    });


    this.Then(/^"([^"]*)" folder is shown$/, function (foldername, callback) {
        browser.driver.sleep(1000);
        var tileNames = browserView.tilesNameList();
        expect(tileNames).to.eventually.include(foldername).notify(callback);
    });

    this.Then(/^"([^"]*)" folder is not showing any more$/, {
        timeout: 61 * 1000
    }, function (foldername, callback) {
        browser.sleep(1000);
        var tileNames = browserView.tilesNameList();
        expect(tileNames).to.not.eventually.include(foldername).notify(callback);
    });

    this.Then(/^Check if "([^"]*)" folder already exist and create if not$/, {
        timeout: 61 * 1000
    }, function (foldername, callback) {
        var tileNames = browserView.tilesNameList();
        tileNames.then(function (arr) {
            if (arr.includes(foldername)) {
                console.log('folder already exist')
                callback();
            } else {
                console.log('folder do not exist')
                browserView.scrollUp();
                expect(element(by.css('.view-toolbar')).$('div[ngbtooltip="Create new folder"]').isDisplayed()).to.eventually.be.true;
                browserView.toolbar.addFolder.click();
                browserView.dialogbox.foldernameInput.sendKeys(foldername)
                browserView.dialogbox.createBtn.click()
                    .then(function () {
                        browser.driver.sleep(1000)
                        var tileNames2 = browserView.tilesNameList();
                        expect(tileNames2).to.eventually.include(foldername).notify(callback);
                    })
            }
        })
        //expect(tileNames).to.not.eventually.include(foldername).notify(callback);
    });

    // Next steps were used for debugging 
    this.When(/^I remember folder names$/, function () {
        browserView.tileNames = [];
        browserView.getTiles().then(function (names) {
            names.forEach(function (name) {
                browserView.tileNames.push(name);
            });
        });
    });

    this.Then(/^I count items at step "([^"]*)"$/, {
        timeout: 61 * 1000
    }, function (stepNo, callback) {
        console.log('Counting at stepNo ', stepNo);
        browser.driver.sleep(1000).then(function () {
            element.all(by.css('.tile-title')).count().then(function (count) {
                // console.log('stepNo = ', stepNo);
                console.log('count = ', count);
                //console.log($`Step ${stepNo}, cnt2 = ${count}`);
            }).then(function () {
                callback()
            });
        });
    });

    // Navigation steps

    this.Given(/^I go in the main directory$/, function (callback) {
        browserView.scrollUp();
        browserView.breadcrumbs.draftsDir.click()
        expect(browser.getCurrentUrl()).to.eventually.contain('/#/organize').notify(callback)
    });

    this.When(/^I open   "([^"]*)" directory$/, function (foldername, callback) {
        browserView.scrollUp();
        browserView.breadcrumbs.draftsDir.click()
        browserView.tileByName(foldername).click();
        browser.actions().doubleClick().perform();
        expect(browserView.breadcrumbs.openFolder.getText()).to.eventually.be.equal(foldername.toUpperCase()).notify(callback)

    });

    this.When(/^I navigate in "([^"]*)" directory$/, function (foldername, callback) {
        browserView.scrollUp();
        browserView.breadcrumbs.openDir(foldername).click()
        expect(browserView.breadcrumbs.openFolder.getText()).to.eventually.be.equal(foldername.toUpperCase()).notify(callback)

    });

    this.When(/^I select folder "([^"]*)"$/, function (foldername) {
        browser.driver.sleep(1000)
        var folder = browserView.tileByName(foldername)
        //  expect(folder.isPresent()).to.eventually.be.true.notify(callback)
        folder.click();
    });

    this.When(/^open the folder$/, function () {
        browser.actions().doubleClick().perform();
    });

    this.Then(/^I am inside the folder "([^"]*)" directory$/, {
        timeout: 1 * 2000
    }, function (foldername, callback) {
        browserView.scrollUp();
        expect(browserView.breadcrumbs.openFolder.getText()).to.eventually.equal(foldername).notify(callback);
        expect(browser.getCurrentUrl()).to.eventually.contain(foldername).notify(callback)

    });

    this.When(/^I add "([^"]*)" text to folder name$/, function (renametext) {
        var el = element(by.css('input[ng-reflect-model="TEST_F2_SUB2"]'));
        el.sendKeys(renametext);
    });

    this.When(/^click outside the folder$/, function () {
        browserView.clickOutside()
    });

    // Grid view 
    this.When(/^I select display tile view$/, function () {
        browserView.scrollUp();
        browserView.toolbar.tilesView.click()
    });

    this.When(/^I select display grid view$/, function () {
        browserView.scrollUp();
        browserView.toolbar.gridView.click()
    });

    this.Then(/^files are presented as tiles$/, function (callback) {
        var el = element(by.css('.tile-view')).all(by.tagName('sds-tile'))
        expect(el.count()).to.eventually.be.above(2).notify(callback)
    });

    this.Then(/^files are presented in a grid view$/, function (callback) {
        var tableView = element(by.css('.tile-view')).element(by.css('.table-view-content'))
        expect(tableView.isPresent()).to.eventually.be.true.notify(callback)

    })



    // // other

    // this.Given(/^I wait for all info messages to be gone$/, function () {
    //     browser.driver.executeScript('window.scrollTo(0,0)');
    //     browser.driver.sleep(15000);
    // });

    // this.Given(/^I turn off ignoreBrowserSync$/, function (callback) {
    //     browser.ignoreSynchronization = false;
    //     callback();
    // });
}