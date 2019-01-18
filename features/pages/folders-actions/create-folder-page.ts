import { $, by, element, ElementFinder, browser } from 'protractor';
import { environment } from '../../../config/environment';

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
        return this.inputFolderName.sendKeys(folderName);
    }

    clickCancel() {
        return this.cancelCreateButton.click();
    }

    clickCreateFolder() {
        return this.createFolderButton.click();
    }
}
