import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { InfoBoxComponent } from '../pages/info-boxes-page';
import { OrganizePage } from '../pages/opranize-page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const EC = protractor.ExpectedConditions;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

const infoBox: InfoBoxComponent = new InfoBoxComponent();
const organizePage: OrganizePage = new OrganizePage();

Given(/I check if key '(.*)' is presented/, (key: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(infoBox.infoBoxConent)).then(
        () => {
            expect(infoBox.getItemWithKey(key).isDisplayed()).to.eventually.equal(true).then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error(`Expected '${key}' as a key, but nothing found`);
                }
            );
        }
    );
});

Given(/I check if value '(.*)' is presented/, (value: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(infoBox.infoBoxConent)).then(
        () => {
            expect(infoBox.getItemWithValue(value).isDisplayed()).to.eventually.equal(true).then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error(`Expected '${value}' as a value, but nothing found`);
                }
            )
        }
    )
})

Given(/I want to open first record/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(infoBox.firstRecord), 10 * 1000, 'Records are not Visible').then(
        () => {
            browser.actions().doubleClick(infoBox.firstRecord).perform().then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('Could not Open First Record');
                }
            );
        }
    );
});
