import {$, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class UploadWebPageDialogPage {

    uploadWebPageDialog: ElementFinder;
    webPageInput: ElementFinder;
    importButton: ElementFinder;
    cancelButton: ElementFinder;

    constructor() {
        this.uploadWebPageDialog = element(by.id('ImportWebPageModal'));
        this.webPageInput = this.uploadWebPageDialog.all(by.id('folder-name')).get(0);
        this.importButton = this.uploadWebPageDialog.all(by.buttonText('Import')).get(0);
        this.cancelButton = this.uploadWebPageDialog.all(by.buttonText('Cancel')).get(0);
    }

    setImportWebPage(webPageName:string){
        return this.webPageInput.sendKeys(webPageName);
    }

    cancelClick(){
        return this.cancelButton.click();
    }

    importClick(){
        return this.importButton.click();
    }
}