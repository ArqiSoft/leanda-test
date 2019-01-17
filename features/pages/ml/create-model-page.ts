import {$, browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import {HomePageObject} from "../home-page";
import {FilterElement} from "../filter-element";

export class CreateModelPage {

    createModelDialog: ElementFinder;
    createButton: ElementFinder;
    cancelButton: ElementFinder;
    className: ElementFinder;

    naiveBayes: ElementFinder;
    linearRegression: ElementFinder;
    decisionTree: ElementFinder;
    randomForest: ElementFinder;
    supportVector: ElementFinder;
    dnn: ElementFinder;

    constructor() {
        this.createModelDialog = element(by.id('MLModelWizard'));
        this.createButton = this.createModelDialog.all(by.buttonText('Create')).get(0);
        this.cancelButton = this.createModelDialog.all(by.buttonText('Close')).get(0);
        this.className = this.createModelDialog.all(by.css('.e2e-ml-class-name')).get(0);

        this.naiveBayes = element(by.id('naiveBayes'));
        this.linearRegression = element(by.id('linearRegression'));
        this.decisionTree = element(by.id('decisionTree'));
        this.randomForest = element(by.id('randomForest'));
        this.supportVector = element(by.id('supportVector'));
        this.dnn = element(by.id('dnn'));
    }

    clickCancel(){
        return this.cancelButton.click();
    }

    clickCreateModel(){
        return this.createButton.click();
    }

}