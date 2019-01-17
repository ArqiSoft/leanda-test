import {$, browser, by, element, ElementFinder, protractor} from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export class NotificationsComponent {

    toast: ElementArrayFinder;
    notifications: ElementArrayFinder;
    notificationPanel: ElementFinder;
    notificationPanelIcon: ElementFinder;
    closeAllNotificationsButton: ElementFinder;
    closeNotificationPanel: ElementFinder;
    notificationTime: ElementFinder;
    closeNotificationInPanel: ElementFinder;
    cancelUpload: ElementFinder;
    restartUpload: ElementFinder;

    constructor() {
        this.toast = element.all(by.css('.e2e-notification-toast'));
        this.notificationPanel = element(by.css('.e2e-notification-panel'));
        this.notifications = element.all(by.css('.e2e-notification'));
        this.closeAllNotificationsButton = element(by.css('.e2e-close-all-notifications'));
        this.closeNotificationPanel = element(by.css('.e2e-close-notification-panel'));
        this.notificationPanelIcon = element(by.css('.e2e-notification-panel-icon'));
        this.notificationTime = this.notifications.all(by.css('.e2e-notification-time')).get(0);
        this.closeNotificationInPanel = this.notifications.all(by.css('.e2e-close-notification')).get(0);
        this.cancelUpload = element(by.css('.e2e-upload-cancel'));
        this.restartUpload = element(by.css('.e2e-upload-restart'));
    }

    closeNotification(id: number) {
        return this.notifications.get(id).element(by.css('.e2e-close-notification')).click();
    }

    countNotifications() {
        return this.notifications.count().then(
            (result) => {
                if (result >= 1)
                    return true;
            }
        );
    }
}