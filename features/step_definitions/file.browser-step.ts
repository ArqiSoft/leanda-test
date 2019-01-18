import { browser, by, element, protractor, $, ExpectedConditions } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { OrganizePage } from '../pages/opranize-page';
import { environment } from '../../config/environment';
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const dropFile = require('./drop-file.js');

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(300 * 1000);

const EC = protractor.ExpectedConditions;
const organizePage: OrganizePage = new OrganizePage();

When(/I want to upload file from '(.*)' '(.*)' directory/,
    { timeout: 400 * 1000 }, (pathToFile: string, fileName: string, callback: CallbackStepDefinition) => {

        const path = require('path');
        const fileToUpload1 = pathToFile;
        const absolutePath = path.resolve(__dirname, fileToUpload1);

        const inputFile = element(by.css('input[type=file]'));

        browser.wait(EC.or(EC.presenceOf(inputFile), EC.visibilityOf(inputFile)), 30 * 1000, `${inputFile} is not Presented or Visible`).then(
            () => {
                inputFile.sendKeys(absolutePath);
                browser.sleep(5000).then(callback);
            }
        );
    });


Then(/I check that '(.*)' file is added/, (fileName: string, callback: CallbackStepDefinition) => {

    const new_tile = element((by.cssContainingText('.tile-view .tile .tile-text', fileName)));
    browser.wait(EC.visibilityOf(new_tile), 20 * 1000, 'File Was Not Added').then(
        () => {
            return callback();
        }
    );
});

When(/I want to open file '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    const new_tile = organizePage.getTileByName(folderName);

    browser.wait(EC.visibilityOf(new_tile), 10 * 1000, 'File Is Not Visible').then(
        () => {
            new_tile.click().then(
                () => {
                    browser.actions().doubleClick(new_tile).perform().then(
                        () => {
                            return callback();
                        },
                        (error) => {
                            throw Error(`Could not Double Click on ${new_tile}`);
                        }
                    );
                }
            );
        }
    );
});

Then(/I check that file has two records/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(getTileById(0)), 5 * 1000, 'Record #1 is not visibile').then(() => {
        browser.wait(EC.visibilityOf(getTileById(1)), 5 * 1000, 'Record #2 is not visibile').then(() => {
            return callback();
        });
    });
});

function getTileById(id: number) {
    return element.all(by.css('.tile')).get(id);
}

When(/I check that image preview exist on file page/, (callback: CallbackStepDefinition) => {

    const middleImage = element(by.css('.e2e-middle-preview'));
    const largeImage = element(by.css('.e2e-image-full-preview'));

    browser.wait(EC.visibilityOf(middleImage), 15 * 1000).then(
        () => {
            middleImage.click();
            browser.wait(EC.visibilityOf(largeImage), 15 * 1000).then(
                () => {
                    return callback();
                },
                (error) => {
                    return callback(error);
                }
            );
        }
    );
});


When(/I go to preview page/, (callback: CallbackStepDefinition) => {
    const middleImage = element(by.css('.e2e-middle-preview'));
    const largeImage = element(by.css('.e2e-image-full-preview'));

    browser.actions().click(middleImage).perform().then(
        () => {
            browser.wait(EC.visibilityOf(largeImage), 15 * 1000).then(
                () => {
                    return callback();
                }
            );
        }
    );
});


When(/I check that preview image exist/, (callback: CallbackStepDefinition) => {
    expect($('.e2e-image-full-preview').isPresent()).to.eventually.equal(true).then(callback());
});


Then(/I check that preview image does not exist/, (callback: CallbackStepDefinition) => {
    expect($('.e2e-image-full-preview').isPresent()).to.eventually.equal(false).then(callback());
});

Then(/I check that preview of file type '(.*)' exist/, { timeout: 30 * 1000 }, (type: string, callback: CallbackStepDefinition) => {

    browser.driver.getCurrentUrl().then(url => {
        let selector = '';
        if (type === 'CSV') {
            selector = '.e2e-csv-preview';
        } else if (type === 'PDF') {
            selector = '.e2e-pdf-preview';
        } else if (type === 'JPG' || type === 'GIF' || type === 'PNG') {
            selector = '.e2e-image-full-preview';
        }
        browser.wait(ExpectedConditions.visibilityOf($(selector)), 10 * 1000).then(() => {
            expect($(selector).isDisplayed()).to.eventually.equal(true).then(callback());
        });
    });
});

Then(/I am waiting for SDF to be uploaded/, (callback: CallbackStepDefinition) => {
    browser.sleep(50 * 1000).then(() => {
        return callback();
    });
});

Then(/I download file from file view/, (callback: CallbackStepDefinition) => {

    const button = element(by.css('.e2e-download-file'));
    browser.wait(EC.elementToBeClickable(button)).then(
        () => {
            button.click().then(callback);
        }
    );
});

Then(/I download file '(.*)'/, { timeout: 30 * 1000 }, (fileName: string, callback: CallbackStepDefinition) => {
    const downloadElement = element(by.css('.e2e-download-file'));

    browser.wait(EC.elementToBeClickable(downloadElement)).then(
        () => {
            downloadElement.click().then(
                () => {

                    const fs = require('fs');
                    browser.driver.sleep(2000).then(function () {
                        const downloadFilesArray = fs.readdirSync('downloads/');

                        for (let i = 0; i < downloadFilesArray.length; i++) {
                            if (downloadFilesArray[i].includes(fileName)) {
                                return callback();
                            }
                        }
                        callback(fileName + ' was not downloaded');
                    });
                }
            );
        }
    );
});


Then(/I close preview page/, (callback: CallbackStepDefinition) => {
    const closeElement = element(by.css('.e2e-show-records'));
    closeElement.click().then(
        () => {
            expect(browser.getCurrentUrl()).to.eventually.includes('/file/').and.notify(
                () => {
                    return callback();
                }
            );
        }
    );
});

// ***********************
//
// Feature Computation 
//
// ***********************

Then(/I click '(.*)' button/, (buttonName: string, callback: CallbackStepDefinition) => {
    const button = element(by.buttonText(buttonName));

    expect(button.isDisplayed()).to.eventually.equal(true).and.notify(
        () => {
            button.click().then(
                () => {
                    return callback();
                }
            );
        }
    );

});

Given(/I go to the feature page/, (callback: CallbackStepDefinition) => {
    browser.get('/features').then(
        () => {
            expect(element(by.cssContainingText('h2', 'Features Computation')).isDisplayed())
                .to.eventually.equal(true).and.notify(() => callback());
        }
    );
});

Then(/I am waiting for CSV preview to appear/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(element(by.css('table'))), 1 * 10000, 'CSV Preview is not Visible').then(() => callback());
});
