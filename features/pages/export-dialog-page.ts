import {by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class ExportDialogComponent {

    exportDialog: ElementFinder;
    listOption: ElementArrayFinder;
    selectAllButton: ElementFinder;
    reverseAllButton: ElementFinder;
    submitExport: ElementFinder;
    cancelExport: ElementFinder;
    checkBox: ElementArrayFinder;

    constructor (){
        this.exportDialog = element(by.css('.e2e-export-dialog'));
        this.listOption = element.all(by.css('.e2e-export-selection-list mat-list-option'));
        this.selectAllButton = element(by.css('.e2e-export-select-all'));
        this.reverseAllButton = element(by.css('.e2e-export-reverse-all'));
        this.submitExport = element(by.css('.e2e-export-confirm'));
        this.cancelExport = element(by.css('.e2e-export-cancel'));
        this.checkBox = element.all(by.css('.e2e-export-selection-list mat-list-option mat-pseudo-checkbox'));
    }  

    clickOnCheckbox(id: number) {
        return element.all(by.css('.e2e-export-selection-list mat-list-option mat-pseudo-checkbox')).get(id).click();
    }
}