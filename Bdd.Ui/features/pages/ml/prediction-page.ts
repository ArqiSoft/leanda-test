import {$, browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import {HomePageObject} from "../home-page";
import {FilterElement} from "../filter-element";

export class PredictionPage {

    predictionDialog: ElementFinder;
    createButton: ElementFinder;
    cancelButton: ElementFinder;
    model: ElementFinder;
    primaryField: ElementFinder;
    modelList: ElementFinder;

    constructor() {
        this.predictionDialog = element(by.id('MLPredictProperties'));
        this.createButton = this.predictionDialog.all(by.buttonText('Predict')).get(0);
        this.cancelButton = this.predictionDialog.all(by.buttonText('Cancel')).get(0);

        this.modelList = this.predictionDialog.all(by.css('.e2e-select-model')).get(0);
        this.primaryField = this.predictionDialog.all(by.id('idPrimaryIdField')).get(0);
    }

    clickCancel(){
        return this.cancelButton.click();
    }

    clickCreateModel(){
        return this.createButton.click();
    }

    selectModel(modelName: string) {
        return this.predictionDialog.all(by.cssContainingText('.e2e-select-model .e2e-model-option', modelName)).get(0);
    }
}