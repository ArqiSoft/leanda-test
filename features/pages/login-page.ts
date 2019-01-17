import {$, browser, by, element, ElementFinder, protractor} from 'protractor';
import { callbackify } from 'util';

export class LoginPage {

    usernameField: ElementFinder;
    passwordField: ElementFinder;
    loginBtn: ElementFinder;
    logoutConfirmBtn: ElementFinder;
    logoutHeader: ElementFinder;


    constructor() {
        this.usernameField = element(by.id('username'));
        this.passwordField = element(by.id('password'));
        this.loginBtn = element(by.id('kc-login'));
        this.logoutConfirmBtn = element(by.buttonText('OK'));
        this.logoutHeader = element.all(by.css('.page-header h1')).get(0);
    }

    inputUserNamePassword(username: string, password: string) {
        this.usernameField.sendKeys(username);
        this.passwordField.sendKeys(password);

        const EC = protractor.ExpectedConditions;
        if (username === 'e2e_test') {
            return browser.wait(EC.visibilityOf(element(by.buttonText('Login')))).then(
                () => {
                    element(by.buttonText('Login')).click().then(
                        () => {
                            browser.driver.getCurrentUrl().then(function (text) {
                                if (text.includes('identity.your-company.com/core/connect/authorize')) {
                                    console.log('confirmation is needed');
                                    const allowBtn = element(by.buttonText('Yes, Allow'));
                                    browser.refresh().then(
                                        () => {
                                            allowBtn.click();
                                        }
                                    );
                                }
                            });
                        }
                    );
                }
            );
        }
        // Waits for the element with id 'abc' to be present on the dom.
        return browser.wait(EC.visibilityOf(element(by.id('kc-login')))).then(
            () => {
                this.loginBtn.click();
            }
        );
    }
}
