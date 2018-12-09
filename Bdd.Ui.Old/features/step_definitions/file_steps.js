var homePage = require('../pages/homePage.js');
var loginPage = require('../pages/loginPage.js');
var browserView = require('../pages/browserView.js');
var fileView = require('../pages/fileView.js');


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;


module.exports = function () {

    this.When(/^I click on drop file zone$/, function () {
        browserView.dropZone.click()
    });

    //for one file
    this.When(/^I want to upload "([^"]*)" file$/, function (filePath) {

        var path = require('path');
        var fileToUpload1 = filePath;
        var absolutePath = path.resolve(__dirname, fileToUpload1);

        var inputFile = browserView.inputFile
        inputFile.sendKeys(absolutePath).then(function () {
            browser.driver.sleep(2000)
        })
    });

    // for Scenario Outline
    this.When(/^I want to upload file from \"([^\"]*)\" directory$/, function (arg) {

        var path = require('path');
        var fileToUpload1 = arg;
        var absolutePath = path.resolve(__dirname, fileToUpload1);

        var inputFile = browserView.inputFile
        inputFile.sendKeys(absolutePath).then(function () {
            browser.driver.sleep(2000)
        })
    });

    //-------------------------------------------------------
    // for one file
    this.Then(/^I check that "([^"]*)" file is shown$/, {
        timeout: 61 * 1000
    }, function (fileName, callback) {
        var fileNames = browserView.filesNameList();
        fileNames.then(function (text) {
            //  console.log(text)
        })
        expect(fileNames).to.eventually.include(fileName.toUpperCase()).notify(callback);
    });

    //for Scenario Outline: 
    this.Then(/^I check that \"([^\"]*)\" file is added$/, {
        timeout: 61 * 1000
    }, function (arg, callback) {
        var fileNames = browserView.filesNameList();
        fileNames.then(function (text) {
            console.log(text)
        })
        expect(fileNames).to.eventually.include(arg.toUpperCase()).notify(callback);
    });

    //--------------------------------------------------

    this.When(/^I select "([^"]*)" file$/, {
        timeout: 5 * 1000
    }, function (format) {
        browser.driver.sleep(1000)
        browserView.tileByName(format).click()
    });

    this.When(/^hold SHIFT key$/, function () {
        browser.actions().keyDown(protractor.Key.SHIFT).sendKeys().perform()
    });

    this.When(/^release SHIFT key$/, function () {
        browser.actions().keyUp(protractor.Key.SHIFT).sendKeys().perform()
    });
    this.When(/^I open "([^"]*)" file$/, function (fileName, callback) {
        browserView.scrollUp();
        browser.driver.sleep(500)
        browserView.tileByName(fileName).click()
        browser.actions().doubleClick().perform();
        var record = fileView.fileProperty.recordInfo;
        browser.wait(protractor.ExpectedConditions.visibilityOf(record, 1000))
        expect(browserView.breadcrumbs.openFolder.getText()).to.eventually.be.equal(fileName.toUpperCase()).notify(callback)
    });

    this.Then(/^I am inside the file "([^"]*)"$/, {
        timeout: 1 * 1000
    }, function (fileName, callback) {
        browserView.scrollUp();
        expect(browserView.breadcrumbs.openFolder.getText()).to.eventually.be.equal(fileName.toUpperCase()).notify(callback)
    });

    this.When(/^click download button$/, function () {
        browserView.scrollUp();
        browserView.toolbar.download.click();
    });

    this.When(/^click download file button$/, function () {
        browserView.scrollUp();
        fileView.upperToolbar.downloadBtn.click();
    });

    this.Then(/^"([^"]*)" file should be downloaded$/, function (name, callback) {
        var fs = require('fs');
        browser.driver.sleep(2000).then(function () {
            var downloadFilesArray = fs.readdirSync('downloads/')
            //console.log(downloadFilesArray);

            //expect(downloadFilesArray).to.include(name).notify(callback)

            for (i = 0; i < downloadFilesArray.length; i++) {
                if (downloadFilesArray[i].includes(name)) {
                    //console.log('inside if')
                    callback()
                }
            }
            callback(name + " was not downloaded")
        })
        browserView.clickOutside()


        // var filename = 'downloads/' + name;
        // browser.driver.sleep(3000)
        //     .then(function () {
        //         if (fs.existsSync(filename)) {
        //             //console.log('inside If')
        //             callback()
        //         } else {
        //             // console.log('inside else')
        //             callback(filename + " does not exist")
        //         }
        //     })

        // const fs = require('fs');
        //fs.readdir(testFolder, (err, files) => {
        //files.forEach(file => {
        // console.log(file);
        //});
        //})
    });

    this.When(/^rename file to "([^"]*)"$/, function (newName) {
        // var el = element(by.css('input[ng-reflect-model="Use Cases_Planning Grant.xlsx"]'));
        var el = element(by.xpath('//sds-tile/div/div/input'))
        el.clear().then(function () {
            el.sendKeys(newName);
        })
    });

    this.Then(/^I see file properties section$/, function (callback) {
        var record = fileView.fileProperty.recordInfo
        expect(record.isPresent()).to.eventually.be.true.notify(callback)
    });

    this.Then(/^I see file records section$/, function (callback) {
        var record = fileView.recordToolbar.records
        expect(record.isPresent()).to.eventually.be.true.notify(callback)
    });

    // Grid view 
    //tile view : view-type: '0';
    //grid view : view-type: '2';
    this.When(/^I select display file records as grid$/, function () {
        fileView.recordToolbar.recordsGridBtn.click();
    });

    this.When(/^I select display file records as tiles$/, function () {
        fileView.recordToolbar.recordsTileBtn.click();
    });

    this.Then(/^records are presented in a grid view$/, function (callback) {
        expect(fileView.recordViewType()).to.eventually.be.equal('2').notify(callback)
    })

    this.Then(/^records are presented in a tiles view$/, function (callback) {
        expect(fileView.recordViewType()).to.eventually.be.equal('0').notify(callback)
    })

    // Records Preview and Setting Properties

    this.Then(/^There are "([^"]*)" records properties shown$/, function (num, callback) {
        expect(fileView.recordPreview.columnCount()).to.eventually.be.equal(parseInt(num)).notify(callback)
    })

    this.Then(/^There are (\d+) for records properties shown$/, function (arg1, callback) {
        expect(fileView.recordPreview.columnCount()).to.eventually.be.equal(parseInt(arg1)).notify(callback)
    });

    this.When(/^I select first record$/, function () {
        var firstRecord = fileView.recordPreview.recordNum(0)
        browser.wait(protractor.ExpectedConditions.visibilityOf(firstRecord, 1000));
        firstRecord.click();
    });

    this.When(/^I click properties settings$/, function (callback) {
        fileView.recordToolbar.recordsSettingsBtn.click();
        expect(fileView.propertiesSettings.dialogBox.isPresent()).to.eventually.be.true.notify(callback);
    });

    this.Then(/^all Intrinsic properties are checked$/, function () {
        var intrinsicProp = fileView.propertiesSettings.intrpropChb
        // need better checking here
        intrinsicProp.getAttribute('ng-reflect-checked').then(function (text) {
            console.log(text)
        })
    });

    this.When(/^I change Settings properties to UnselectAll$/, function () {
        fileView.propertiesSettings.unselectAll();
        browser.driver.sleep(600);
    });

    this.When(/^I change Settings properties to SelectAll$/, function () {
        fileView.propertiesSettings.selectAll();
        browser.driver.sleep(600);
    });

    this.When(/^I change Settings properties to "([^"]*)"$/, function (arg1) {
        //    console.log(arg1);
        var arr = arg1.split(",")
        //  console.log(arr);
        fileView.propertiesSettings.unselectAllChb.click().then(function () {
            browser.driver.sleep(500);
            fileView.propertiesSettings.intrinsicPropertiesToggle.click().then(function () {
                    for (var i = 0; i < arr.length; i++) {
                        fileView.propertiesSettings.propertyChb(arr[i])
                    }
                })
                .then(function () {
                    fileView.propertiesSettings.applyBtn.click()
                    browser.driver.sleep(600)
                    //think how to replace browser sleep here
                });
        });
    });

    this.When(/^I select some$/, function () {
        fileView.propertiesSettings.unselectAllChb.click().then(function () {
            browser.driver.sleep(500);
            fileView.propertiesSettings.intrinsicPropertiesToggle.click().then(function () {
                fileView.propertiesSettings.propertyChb('InChIKey')
                fileView.propertiesSettings.propertyChb('MF')
                fileView.propertiesSettings.applyBtn.click()
            });
        });
        //expect(fileView.propertiesSettings.dialogBox.isPresent()).to.eventually.be.true.notify(callback);
    });

    this.When(/^I change Settings properties to $/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback(null, 'pending');
    });


    // CSV Mapping
    this.When(/^I click Mapping button$/, function () {
        fileView.upperToolbar.mappingBtn.click();
    });

    this.Then(/^Mapping screen is open$/, function (callback) {
        var mappingScreen = fileView.csvMapping.section
        expect(mappingScreen.isPresent()).to.eventually.be.true.notify(callback)
    })

    this.When(/^I map File field "([^"]*)" to "([^"]*)"$/, function (fileField, mappingField, callback) {
        var count0;
        var count1;
        var c1;
        //count columns before mapping
        fileView.csvMapping.countColumns().then(function (a) {
            count0 = a;
        })
        var c0 = fileView.csvMapping.countColumns()
        //mapping
        fileView.csvMapping.fileFieldDropdown.click();
        fileView.csvMapping.selectFileField(fileField)
        browser.driver.sleep(500)
        fileView.csvMapping.mappingDropdown.click();
        fileView.csvMapping.selectMappingField(mappingField)
            //count columns after mapping
            .then(function () {
                browser.driver.sleep(500)
                c1 = fileView.csvMapping.countColumns()
                fileView.csvMapping.countColumns().then(function (a) {
                        count1 = a;
                    })

                    // check that 2 columns are added (Links and Structure apperas at the begining)
                    .then(function () {
                        if ((count1 - count0) == 2) {
                            var column1 = fileView.csvMapping.getColumnName(0)
                            expect(column1).to.eventually.equal('Links').notify(callback)
                        } else {
                            callback((count1 - count0) + '   is not "2" ')
                        }
                    })
            })
    });

    this.When(/^Start Processing$/, function () {
        fileView.csvMapping.processBtn.click();
    })

    this.When(/^Wait untill Chemical element is presented$/, {
        timeout: 120 * 1000
    }, function (callback) {

        var EC = protractor.ExpectedConditions;
        var el = fileView.csvMapping.processingIcon
        browser.driver.wait(EC.invisibilityOf(el)).then(function () {
            expect(fileView.fileProperty.img.isPresent()).to.eventually.be.true.notify(callback)
        });

    })
}