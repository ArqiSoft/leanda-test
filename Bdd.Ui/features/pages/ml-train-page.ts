import { $, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class MLTrainDialog {
    trainDialog: ElementFinder;
    trainModelName: ElementFinder;
    trainModelType: ElementFinder;
    trainNextSecondStep: ElementFinder;

    trainScaling: ElementFinder;
    trainTrainingParameters: ElementFinder;
    trainSubSampleSize: ElementFinder;
    trainTestDataSize: ElementFinder;
    trainKFold: ElementFinder;
    trainAddFingeprints: ElementFinder;
    trainNextThirdStep: ElementFinder;
    trainBackFirstStep: ElementFinder;
    trainMethod: ElementFinder;
    trainSubmit: ElementFinder;

    constructor() {

        this.trainDialog = element(by.id('MLTrainDialog'));
        this.trainModelName = element(by.css('.e2e-model-name'));
        this.trainModelType = element(by.css('.e2e-model-type'));
        this.trainNextSecondStep = element(by.css('.e2e-move-to-second-step'));

        this.trainScaling = element(by.css('.e2e-select-scale'));
        this.trainTrainingParameters = element(by.css('.e2e-select-training-parameter'));
        this.trainSubSampleSize = element(by.css('.e2e-sub-sample-size'));
        this.trainTestDataSize = element(by.css('.e2e-test-data-size'));
        this.trainKFold = element(by.css('.e2e-k-fold'));
        this.trainAddFingeprints = element(by.css('.e2e-add-fingerprints'));

        this.trainNextThirdStep = element(by.css('.e2e-move-to-thrid-step'));
        this.trainBackFirstStep = element(by.css('.e2e-back-to-first-step'));
        
        this.trainMethod = element(by.css('.e2e-method-checkbox'));
        this.trainSubmit = element(by.css('.e2e-submit-ml-training'));
        
    }

    getMethod(method: string) {
        return element(by.cssContainingText('.e2e-method-checkbox span', method));
    }

    getModelType(model: string) {
        return element(by.cssContainingText('.e2e-model-type-option span', model));
    }

}