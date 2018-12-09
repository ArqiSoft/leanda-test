import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { OrganizePage } from '../pages/opranize-page';
import { throws } from 'assert';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let EC = protractor.ExpectedConditions;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

let organizePage: OrganizePage = new OrganizePage();

Then(/I check that '(.*)' counter is incremented/, (counterName: string, callback: CallbackStepDefinition) => {
    expect(element(by.css(organizePage.getEntityCounter(counterName))).isDisplayed()).to.eventually.equal(true).then(
        () => {
            element(by.css(organizePage.getEntityCounter(counterName))).getText().then(
                (text) => {
                    const counter = parseInt(text);
                    if (counter > 0) {
                        return callback();
                    } else {
                        throw Error(`${counterName} has not change`);
                    }
                }
            )
        }
    )
});

Given(/I select options required for creating model/, (callback: CallbackStepDefinition) => {

    expect(organizePage.modelDialogRequired.isDisplayed()).to.eventually.equal(true).then(
        () => {
            expect(organizePage.modelDialogOption.isDisplayed()).to.eventually.equal(true).then(
                () => {
                    expect(organizePage.modelDialogCheckBox.isDisplayed()).to.eventually.equal(true).then(
                        () => {
                            organizePage.modelDialogRequired.click().then(
                                () => {
                                    organizePage.modelDialogOption.click().then(
                                        () => {
                                            organizePage.modelDialogCheckBox.click().then(
                                                () => {
                                                    return callback();
                                                },
                                                (error) => {
                                                    throw Error(error);
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        }
    )
});

Given(/I click create button in model dialog/, (callback: CallbackStepDefinition) => {
    expect(organizePage.modelDialogSubmit.isDisplayed()).to.eventually.equal(true).then(
        () => {
            organizePage.modelDialogSubmit.click().then(
                () => {
                    browser.sleep(10 * 1000).then(
                        () => {
                            return callback();
                        },
                        (error) => {
                            throw Error(error);
                        }
                    )
                }
            )
        }
    )
})