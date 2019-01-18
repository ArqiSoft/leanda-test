import { $, by, element, ElementFinder, browser } from 'protractor';
import { environment } from '../../../config/environment';

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
        return this.deleteFolderButton.click();
    }
}
