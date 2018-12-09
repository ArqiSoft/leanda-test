import { $, by, element, ElementFinder, browser } from 'protractor';

export class CreateFolderPage {

    createFolderDialog: ElementFinder;
    inputFolderName: ElementFinder;
    createFolderButton: ElementFinder;
    cancelCreateButton: ElementFinder;

    constructor() {
        this.createFolderDialog = element.all(by.css('.e2e-create-folder-dialog')).get(0);
        this.inputFolderName = this.createFolderDialog.all(by.css('.e2e-folder-name')).get(0);
        this.createFolderButton = this.createFolderDialog.all(by.buttonText('Create')).get(0);
        this.cancelCreateButton = this.createFolderDialog.all(by.buttonText('Cancel')).get(0);
    }

    removeOldFolderName() {
        return this.inputFolderName.clear();
    }

    setFolderName(folderName: string) {
        // FIX FOR v0.14
        return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.createFolderDialog = element(by.id('createFolderModal'));
                this.inputFolderName = this.createFolderDialog.element(by.id('folder-name'));
                this.createFolderButton = this.createFolderDialog.element(by.buttonText('Create'));
                return this.inputFolderName.sendKeys(folderName);
            }
            // Leave only the row below after v1.0 release
            return this.inputFolderName.sendKeys(folderName);
        });
    }

    clickCancel() {
        return this.cancelCreateButton.click();
    }

    clickCreateFolder() {
        return this.createFolderButton.click();
    }
}
