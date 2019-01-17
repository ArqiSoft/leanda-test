import { $, by, element, ElementFinder, browser } from 'protractor';

export class DeleteFolderPage {

    deleteFolderDialog: ElementFinder;
    deleteFolderButton: ElementFinder;
    cancelCreateButton: ElementFinder;

    constructor() {
        this.deleteFolderDialog = element(by.css('dr-delete-folder'));
        this.deleteFolderButton = this.deleteFolderDialog.all(by.buttonText('Delete')).get(0);
        this.cancelCreateButton = this.deleteFolderDialog.all(by.buttonText('Close')).get(0);
    }

    clickCancel() {
        return this.cancelCreateButton.click();
    }

    clickDeleteFolder() {
       return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.deleteFolderDialog = element(by.id('deleteFolderModal'));
                this.deleteFolderButton = this.deleteFolderDialog.element(by.buttonText('Delete'));
                return this.deleteFolderButton.click();
            }
            // Leave only the row below after v1.0 release
            return this.deleteFolderButton.click();
        });
    }
}
