import { $, by, element, ElementFinder, browser } from 'protractor';

export class RenameFolderPage {

    renameFolderDialog: ElementFinder;
    inputFolderName: ElementFinder;
    renameFolderButton: ElementFinder;
    cancelRenameButton: ElementFinder;

    constructor() {
        this.renameFolderDialog = element(by.css('.e2e-rename-item-dialog'));
        this.inputFolderName = this.renameFolderDialog.all(by.css('.e2e-folder-name')).get(0);
        this.renameFolderButton = this.renameFolderDialog.all(by.buttonText('Rename')).get(0);
        this.cancelRenameButton = this.renameFolderDialog.all(by.buttonText('Cancel')).get(0);
    }

    removeOldFolderName() {
        return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.renameFolderDialog = element(by.id('renameFolderModal'));
                this.inputFolderName = this.renameFolderDialog.element(by.id('folder-name'));
                return this.inputFolderName.clear();
            }
            return this.inputFolderName.clear();
        });
    }
    setNewFolderName(newFolderName: string) {
        return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.renameFolderDialog = element(by.id('renameFolderModal'));
                this.inputFolderName = this.renameFolderDialog.element(by.id('folder-name'));
                return this.inputFolderName.sendKeys(newFolderName);
            }
            return this.inputFolderName.sendKeys(newFolderName);
        });
    }
    clickCancel() {
        return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.renameFolderDialog = element(by.id('renameFolderModal'));
                this.cancelRenameButton = this.renameFolderDialog.all(by.buttonText('Cancel')).get(0);
                return this.cancelRenameButton.click();
            }
            return this.cancelRenameButton.click();
        });
    }
    clickRenameFolder() {
        return browser.driver.getCurrentUrl().then(url => {
            if (url.includes('osdr.dataledger.io')) {
                this.renameFolderDialog = element(by.id('renameFolderModal'));
                this.renameFolderButton = this.renameFolderDialog.element(by.buttonText('Rename'));
                return this.renameFolderButton.click();
            }
            return this.renameFolderButton.click();
        });
    }
}
