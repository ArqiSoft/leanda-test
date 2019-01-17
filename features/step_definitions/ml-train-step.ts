import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, $ } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { MLTrainDialog } from '../pages/ml-train-page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const EC = protractor.ExpectedConditions;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

const mlTrain: MLTrainDialog = new MLTrainDialog();

Given(/I can see train model dialog/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainDialog), 10 * 1000).then(() => {
        return callback();
    });
});

Given(/I select '(.*)' model type/, (model: string, callback: CallbackStepDefinition) => {
    mlTrain.trainModelType.click().then(() => {
        browser.wait(EC.visibilityOf(mlTrain.getModelType(model)), 5 * 1000).then(() => {
            mlTrain.getModelType(model).click().then(() => {
                return callback();
            });
        });
    });
});

Given(/I click next button to go to second step/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainNextSecondStep), 5 * 1000).then(() => {
        mlTrain.trainNextSecondStep.click().then(() => {
            return callback();
        });
    });
});

Given(/I select standard scaling option/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainScaling), 10 * 1000).then(() => {
        browser.sleep(2 * 1000);
        mlTrain.trainScaling.click().then(() => {
            browser.wait(EC.visibilityOf(element(by.cssContainingText('.e2e-select-scale span', 'Standard'))), 5 * 1000).then(() => {
                element(by.cssContainingText('.e2e-select-scale span', 'Standard')).click().then(() => {
                    return callback();
                });
            });
        });
    });
});

Given(/I select training parameter as '(.*)'/, (parameter: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainTrainingParameters), 10 * 1000).then(() => {
        browser.sleep(2 * 1000);
        mlTrain.trainTrainingParameters.click().then(() => {
            browser.wait(EC.visibilityOf(element(by.cssContainingText('.e2e-model-train-parameter span', parameter))), 5 * 1000).then(() => {
                element(by.cssContainingText('.e2e-model-train-parameter span', parameter)).click().then(() => {
                    return callback();
                });
            });
        });
    });
});

Given(/I am setting sub sample size to '(.*)'/, (parameter: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainSubSampleSize), 10 * 1000).then(() => {
        mlTrain.trainSubSampleSize.clear();
        mlTrain.trainSubSampleSize.sendKeys(parameter).then(() => {
            return callback();
        });
    });
});

Given(/I am setting test data size to '(.*)'/, (parameter: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainTestDataSize), 10 * 1000).then(() => {
        mlTrain.trainTestDataSize.clear();
        mlTrain.trainTestDataSize.sendKeys(parameter).then(() => {
            return callback();
        });
    });
});

Given(/I am setting K-Fold value to '(.*)'/, (parameter: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainKFold), 10 * 1000).then(() => {
        mlTrain.trainKFold.clear();
        mlTrain.trainKFold.sendKeys(parameter).then(() => {
            return callback();
        });
    });
});

Given(/I choose '(.*)' fingerprint type as '(.*)'/, (id: string, parameter: string, callback: CallbackStepDefinition) => {
    let selector: string;
    if (id === 'first') {
        selector = '.e2e-fingerprint-type-0';
    } else if (id === 'second') {
        selector = '.e2e-fingerprint-type-1';
    } else if (id === 'third') {
        selector = '.e2e-fingerprint-type-2';
    }

    browser.wait(EC.visibilityOf(element(by.css(selector))), 10 * 1000).then(() => {
        element(by.css(selector)).click().then(() => {
            browser.wait(EC.visibilityOf(element(by.cssContainingText('.mat-option-text', parameter))), 5 * 1000).then(() => {
                element(by.cssContainingText('.mat-option-text', parameter)).click().then(() => {
                    return callback();
                });
            });
        });
    });
});

Given(/I choose '(.*)' fingerprint size as '(.*)'/, (id: string, parameter: string, callback: CallbackStepDefinition) => {
    let selector: string;
    if (id === 'first') {
        selector = '.e2e-fingerprint-size-0';
    } else if (id === 'second') {
        selector = '.e2e-fingerprint-size-1';
    }

    browser.wait(EC.visibilityOf(element(by.css(selector))), 10 * 1000).then(() => {
        element(by.css(selector)).click().then(() => {
            browser.wait(EC.visibilityOf(element(by.cssContainingText('.mat-option-text', parameter))), 5 * 1000).then(() => {
                element(by.cssContainingText('.mat-option-text', parameter)).click().then(() => {
                    return callback();
                });
            });
        });
    });
});

Given(/I choose '(.*)' fingerprint radius as '(.*)'/, (radiusNum: string, radius: string, callback: CallbackStepDefinition) => {
    const selector = `.e2e-fingerprint-radius-${radiusNum}`;

    browser.wait(EC.visibilityOf(element(by.css(selector))), 10 * 1000).then(() => {
        element(by.css(selector)).click().then(() => {
            browser.wait(EC.visibilityOf(element(by.cssContainingText('.mat-option-text', radius))), 5 * 1000).then(() => {
                element(by.cssContainingText('.mat-option-text', radius)).click().then(() => {
                    return callback();
                });
            });
        });
    });
});

Given(/I add fingerprint/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainAddFingeprints), 5 * 1000).then(() => {
        mlTrain.trainAddFingeprints.click().then(() => {
            return callback();
        });
    });
});

Given(/I click next button to go to the third step/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainNextThirdStep), 10 * 1000).then(() => {
        mlTrain.trainNextThirdStep.click().then(() => {
            return callback();
        });
    });
});

Given(/I select '(.*)' method/, (method: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.getMethod(method)), 10 * 1000).then(() => {
        browser.sleep(2 * 1000);
        mlTrain.getMethod(method).click().then(() => {
            return callback();
        });
    });
});

Given(/I submit model training/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(mlTrain.trainSubmit), 5 * 1000).then(() => {
        mlTrain.trainSubmit.click().then(() => {
            return callback();
        });
    });
});

When(/I select option to set parameters manually/, (callback: CallbackStepDefinition) => {
    const optimizedToggle = element.all(by.css('.mat-radio-container')).get(1);
    browser.wait(EC.visibilityOf(optimizedToggle), 5 * 1000, 'Advance Parameters Toggle is not Visible').then(() => {
        optimizedToggle.click().then(() => {
            return callback();
        });
    });
});

When(/I can see that advanced parameters available/, (callback: CallbackStepDefinition) => {
    const optimizedToggle = element(by.css('.e2e-system-optimized-parameters'));
    browser.wait(EC.visibilityOf(mlTrain.trainSubSampleSize), 5 * 1000, 'Advance Parameters (Optimized) not Visible').then(
        () => {
            return callback();
        });
});

