import {$, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class UploadBoxComponent {

    uploadBoxDialog: ElementFinder;
    collapseButton: ElementFinder;
    unCollapseButton: ElementFinder;
    closeButton: ElementFinder;

    constructor() {
        this.uploadBoxDialog = element(by.css('.events-box'));
        this.collapseButton = this.uploadBoxDialog.element(by.css('.e2e-collapse-button'));
        this.unCollapseButton = this.uploadBoxDialog.element(by.css('.e2e-uncollapse-button'));
        this.closeButton = this.uploadBoxDialog.element(by.css('.e2e-close'));
    }

    getUploadedFileElementByName(fileName: string) {
        return this.uploadBoxDialog.element(by.cssContainingText('.events-box-item',fileName))
    }

    getDoneButton(currentElement: ElementFinder) {
        return currentElement.element(by.css('.info-done-file'));
    }

    getProgressButton(currentElement: ElementFinder) {
        return currentElement.element(by.css('.e2e-upload-progress'));
    }

    getRestartButton() {
        return this.uploadBoxDialog.element(by.css('.e2e-upload-restart'));
    }

    getCancelButton() {
        return this.uploadBoxDialog.element(by.css('.e2e-upload-cancel'))
    }
}