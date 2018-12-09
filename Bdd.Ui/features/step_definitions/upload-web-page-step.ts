import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { UploadWebPageDialogPage } from "../pages/upload-web-page";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);
let uploadWebPageDialog: UploadWebPageDialogPage = new UploadWebPageDialogPage();

Then(/Import web page dialog is shown/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(uploadWebPageDialog.uploadWebPageDialog)).then(
        () => {
            expect(uploadWebPageDialog.uploadWebPageDialog.isPresent()).to.eventually.be.true.and.notify(
                () => {
                    callback();
                }
            );
        }
    );
}
);

Given(/I put web page '(.*)' to dialog/, (webPage: string, callback: CallbackStepDefinition) => {
    uploadWebPageDialog.webPageInput.clear().then(
        () => {
            uploadWebPageDialog.setImportWebPage(webPage).then(
                () => {
                    callback();
                }
            );
        }
    );
});

When(/I check that url is valid/, (callback: CallbackStepDefinition) => {
    expect(uploadWebPageDialog.importButton.isEnabled()).to.eventually.equal(true).then(
        () => {
            callback();
        }
    );
});

Then(/I import web page/, (callback: CallbackStepDefinition) => {
    uploadWebPageDialog.importClick().then(
        () => {
            callback();
        }
    );
});

Then(/I close import web page dialog/, (callback: CallbackStepDefinition) => {
    uploadWebPageDialog.cancelClick().then(
        () => {
            callback();
        }
    );
});