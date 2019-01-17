import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor, ExpectedConditions } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { NotificationsComponent } from '../pages/notifications-page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let EC = protractor.ExpectedConditions;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);
const notifComponent: NotificationsComponent = new NotificationsComponent();

Given(/I can see toast notification/, (callback: CallbackStepDefinition) => {
    browser.wait(ExpectedConditions.visibilityOf(notifComponent.toast.get(0)), 5 * 1000).then(() => {
        return callback();
    });
});

Given(/I click on notification panel icon/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.elementToBeClickable(notifComponent.notificationPanelIcon), 5 * 1000).then(
        () => {
            notifComponent.notificationPanelIcon.click().then(() => {
                return callback();
            });
        }
    )
});

Given(/I can see notification panel/, (callback: CallbackStepDefinition) => {
    expect(notifComponent.notificationPanel.isDisplayed()).to.eventually.equal(true).then(() => {
        return callback();
    });
});

Given(/I can see '(.*)' notification/, (actionName: string, callback: CallbackStepDefinition) => {
    browser.sleep(4 * 1000).then(() => {
        expect(element(by.cssContainingText('.e2e-notification-title', actionName)).isDisplayed()).to.eventually.equal(true).then(() => {
            return callback();
        });
    })
})

Given(/I can see notifications in notification panel/, (callback: CallbackStepDefinition) => {
    browser.sleep(3100).then(() => {
        expect(notifComponent.countNotifications()).to.eventually.equal(true).then(() => {
            return callback();
        });
    })
});

Given(/I close first notification/, (callback: CallbackStepDefinition) => {
    browser.actions().mouseMove(notifComponent.notificationTime).click().perform().then(
        () => {
            return callback();
        }
    )
});

Given(/I click close all notifications button/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.elementToBeClickable(notifComponent.closeAllNotificationsButton)).then(
        () => {
            notifComponent.closeAllNotificationsButton.click().then(() => {
                return callback();
            });
        }
    )
});

Given(/I close notification panel/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.elementToBeClickable(notifComponent.closeNotificationPanel)).then(
        () => {
            notifComponent.closeNotificationPanel.click().then(() => {
                return callback();
            });
        }
    )
});

Given(/I download first available export file/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(notifComponent.notifications.get(0))).then(
        () => {
            notifComponent.notifications.get(0).element(by.css('.e2e-download-exported-file')).click().then(
                () => {
                    return callback();
                }
            )
        }
    )
})

When(/I stop file upload from notification panel/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(notifComponent.cancelUpload), 10 * 1000).then(() => {
        notifComponent.cancelUpload.click().then(() => {
            browser.wait(EC.visibilityOf(notifComponent.restartUpload), 5 * 1000).then(() => {
                return callback();
            })
        })
    })
})

When(/I restart file upload from notification panel/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(notifComponent.restartUpload), 10 * 1000).then(() => {
        notifComponent.restartUpload.click().then(() => {
            browser.wait(EC.visibilityOf(notifComponent.cancelUpload), 5 * 1000).then(() => {
                return callback();
            })
        })
    })
})