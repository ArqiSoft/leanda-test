import { $, by, element, ElementFinder, browser } from 'protractor';
import { environment } from '../../../config/environment';

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
        return this.inputFolderName.clear();
    }
    setNewFolderName(newFolderName: string) {
        return this.inputFolderName.sendKeys(newFolderName);
    }
    clickCancel() {
        return this.cancelRenameButton.click();
    }
    clickRenameFolder() {
        return this.renameFolderButton.click();
    }
}
