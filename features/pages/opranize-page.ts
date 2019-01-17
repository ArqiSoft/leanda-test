import { $, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class OrganizePage {
    browserItemsList: ElementArrayFinder;
    browserLoader: ElementFinder;
    noItemsElement: ElementFinder;
    content: ElementFinder;
    entityCounter: ElementFinder;
    modelDialog: ElementFinder;
    modelDialogRequired: ElementFinder;
    modelDialogOption: ElementFinder;
    modelDialogCheckBox: ElementFinder;
    modelDialogSubmit: ElementFinder;

    collapseButton: ElementFinder;
    collapsedMenuFiles: ElementFinder;


    constructor() {
        this.browserItemsList = element.all(by.css('.tile-view .tile'));
        this.browserLoader = element(by.css('.browser-loader'));
        this.noItemsElement = element(by.cssContainingText('.browser-no-items', 'No items'));
        this.content = element(by.css('content'));
        this.modelDialog = element.all(by.css('.modal-dialog')).get(0);
        this.modelDialogRequired = element(by.css('.e2e-ml-class-name'));
        this.modelDialogOption = element(by.cssContainingText('.e2e-option-Soluble', 'Soluble'));
        this.modelDialogCheckBox = element(by.css('.e2e-naiveBayes-checkbox'));
        this.modelDialogSubmit = element(by.css('.e2e-create-model'));

        this.collapseButton = element(by.css('.collapse-toggle button'));
        this.collapsedMenuFiles = element.all(by.css('.collapsed-buttons .ng-star-inserted')).get(0);
    }

    getTileByName(tileText: string) {
        return this.browserItemsList.all(by.cssContainingText('.tile-text', tileText)).get(0);
    }

    getCheckedTileByName(tileText: string) {
        return element.all(by.cssContainingText('.tile-view .tile.checked .tile-text', tileText)).get(0);
    }

    getTileInput() {
        return this.browserItemsList.all(by.css('input')).get(0);
    }
    getEntityCounter(name) {
        let selector: string;
        switch (name) {
            case 'Documents':
                selector = '.e2e-entity-documents-amount';
                break;
            case 'Images':
                selector = '.e2e-entity-images-amount';
                break;
            case 'Models':
                selector = '.e2e-entity-models-amount';
                break;
            case 'Structures':
                selector = '.e2e-entity-structures-amount';
                break;
            case 'Crystals':
                selector = '.e2e-entity-crystals-amount';
                break;  
            case 'Reactions':
                selector = '.e2e-entity-reactions-amount';
                break;
            case 'Spectra':
                selector = '.e2e-entity-spectra-amount';
                break;
            case 'Datasets':
                selector = '.e2e-entity-datasets-amount';
                break;
            case 'Webpages':
                selector = '.e2e-entity-webpages-amount';
                break;
        }
        return selector;
    }

}
