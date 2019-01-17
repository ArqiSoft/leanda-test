import {$, by, element, ElementFinder} from 'protractor';

export class MoveFolderPage {

    moveFolderDialog: ElementFinder;
    // foldersList: ElementFinder;
    moveFolderButton: ElementFinder;
    createNewFolderButton: ElementFinder;
    closeMoveFolderDialog: ElementFinder;
    goUpButton: ElementFinder;
    newFolderName: ElementFinder;
    submitButton: ElementFinder;

    constructor() {
        this.moveFolderDialog = element(by.css('.e2e-move-dialog'));
        // this.foldersList = this.moveFolderDialog.all(by.css('.modal-body .row')).get(0);
        this.moveFolderButton = this.moveFolderDialog.all(by.buttonText('Move to this folder')).get(0);
        this.createNewFolderButton = this.moveFolderDialog.all(by.buttonText('Create new folder')).get(0);
        this.closeMoveFolderDialog = this.moveFolderDialog.all(by.css('.e2e-close-dialog')).get(0);
        this.goUpButton = element(by.css('.e2e-go-up-button'));
        this.newFolderName = this.moveFolderDialog.all(by.css('.e2e-folder-name')).get(0);
        this.submitButton = this.moveFolderDialog.all(by.css('.e2e-submit')).get(0);
    }

    removeOldFolderName(){
        return this.newFolderName.clear();
    }

    getListItemByName(folderName: string) {
        return element.all(by.cssContainingText('.e2e-move-dialog .modal-body .move-item .move-item-text', folderName)).get(0);
    }

    createNewFolder() {
        return this.createNewFolderButton.click();
    }
    clickCancel() {
        return this.closeMoveFolderDialog.click();
    }

    clickMoveFolder() {
        return this.moveFolderButton.click();
    }
}