import { browser, by, element, ElementArrayFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { HomePageObject } from '../pages/home-page';
import { LoginPage } from '../pages/login-page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(240 * 1000);

const homePage: HomePageObject = new HomePageObject();
const loginPage: LoginPage = new LoginPage();

Given(/^I go to the site$/, (callback: CallbackStepDefinition) => {
    browser.get('/').then(
        () => {
            callback();
        }
    );
});

When(/go to login page/, { timeout: 100 * 1000 }, (callback: CallbackStepDefinition) => {

    const EC = protractor.ExpectedConditions;
    browser.refresh().then(
        () => {
            browser.wait(EC.elementToBeClickable(element.all(by.css('.e2e-login-item')).get(0))).then(
                () => {
                    element.all(by.css('.e2e-login-item')).get(0).click().then(
                        () => {
                            return callback();
                        }
                    );
                }
            );

        }
    );
}
);

When(/login as a test user/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.waitForAngularEnabled(false).then(
        () => {
            browser.wait(EC.urlContains('auth/realms/OSDR')).then(
                () => {
                    expect(browser.getCurrentUrl()).to.eventually.includes('auth/realms/OSDR').then(
                        () => {
                            loginPage.inputUserNamePassword('testlogin', '1234').then(
                                () => {
                                    browser.sleep(5 * 1000).then(() => {
                                        browser.waitForAngularEnabled(true).then(
                                            () => {
                                                return callback();
                                            });
                                    });
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}
);


/**
 * Remove after v1.0 is moved to PROD
 */

When(/I login to PROD/, (callback: CallbackStepDefinition)  => {

    const EC = protractor.ExpectedConditions;
    browser.waitForAngularEnabled(false).then(
        () => {
            browser.refresh();
            browser.wait(EC.urlContains('identity.your-company.com/core/login')).then(
                () => {
                    browser.refresh();
                    expect(browser.getCurrentUrl()).to.eventually.includes('identity.your-company.com/core/login').then(
                        () => {
                            browser.refresh();
                            loginPage.inputUserNamePassword('e2e_test', 'qqq123').then(
                                () => {
                                    browser.waitForAngularEnabled(true).then(
                                        () => {
                                            return callback();
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );

        }
    );
});

Then(/^I should see '(.*)' on the Home page$/, { timeout: 60 * 1000 }, (stringInDoubleQuotes: string, callback: CallbackStepDefinition) => {
    browser.sleep(3000).then(
        () => {
            browser.refresh().then(
                () => {
                    expect(homePage.dropDownUserProfileButton.getText()).to.eventually.equal(stringInDoubleQuotes).then(
                        () => {
                            return callback();
                        }
                    );
                }
            );
        }
    );
});

When(/^I logout from site$/, { timeout: 30 * 1000 }, (callback: CallbackStepDefinition) => {

    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(homePage.dropDownUserProfileButton)).then(
        () => {
            homePage.dropDownUserProfileButton.click().then(
                () => {
                    browser.wait(EC.elementToBeClickable(homePage.logoutLink), 5000).then(
                        () => {
                            homePage.logoutLink.click().then(
                                () => {
                                    browser.sleep(5 * 1000).then(
                                        () => {
                                            expect(element(by.css('.e2e-login-item')).getText()).to.eventually.includes('Login').then(
                                                () => {
                                                    return callback();
                                                }
                                            );
                                        }, (error) => {
                                            throw Error('Cannot Logout');
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
});

Then(/^I am on logout page$/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.refresh().then(
        () => {
            expect(element(by.cssContainingText('e2e-login-item', 'Login')).isDisplayed()).to.eventually.equal(true).and.notify(
                () => {
                    return callback();
                }
            );
        }
    );
});


Then(/I go to main page/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    browser.wait(browser.get('/')).then(
        () => {
            browser.wait(EC.elementToBeClickable(homePage.loginLink)).then(
                () => {
                    callback();
                }
            );
        }
    );
}
);
