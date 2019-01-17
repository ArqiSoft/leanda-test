import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, ExpectedConditions } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { HomePageObject } from "../pages/home-page";
import { OrganizePage } from "../pages/opranize-page";
import { ToolbarComponent } from "../pages/toolbar-page";
import { ContextMenu } from "../pages/context-menu";
import { CreateFolderPage } from "../pages/folders-actions/create-folder-page";
import { DeleteFolderPage } from "../pages/folders-actions/delete-folder-page";
import { MoveFolderPage } from "../pages/folders-actions/move-folder-page";
import { CreateModelPage } from "../pages/ml/create-model-page";
import { PredictionPage } from "../pages/ml/prediction-page";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(180 * 1000);
let organizePage: OrganizePage = new OrganizePage();
let contextMenu: ContextMenu = new ContextMenu();
let createModelDlg: CreateModelPage = new CreateModelPage();
let predictDlg: PredictionPage = new PredictionPage();

Given(/I want to open train model dialog on '(.*)' file/,
    { timeout: 60 * 1000 },
    (fileName: string, callback: CallbackStepDefinition) => {

        let EC = protractor.ExpectedConditions;
        let sdf_file = element(by.cssContainingText('.tile-view .tile .tile-text', fileName));
        let createModel = contextMenu.getElementByName('Train Model');

        browser.wait(EC.elementToBeClickable(sdf_file)).then(
            () => {
                browser.actions().click(sdf_file, protractor.Button.RIGHT).perform().then(
                    () => {
                        createModel.click().then(
                            () => {
                                browser.wait(EC.visibilityOf(createModelDlg.createModelDialog)).then(
                                    () => {
                                        callback();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });

Then(/I choose Class Name parameter '(.*)'/, (className: string, callback: CallbackStepDefinition) => {
    createModelDlg.className.click().then(
        () => {
            createModelDlg.className.all(by.tagName('option')).get(2).click().then(
                () => {
                    callback();
                }
            );
        }
    );
});

Then(/I set Naive Bayes/, (callback: CallbackStepDefinition) => {
    createModelDlg.naiveBayes.click().then(
        () => {
            callback();
        }
    );
});

Then(/I set Linear Regression/, (callback: CallbackStepDefinition) => {
    createModelDlg.linearRegression.click().then(
        () => {
            callback();
        }
    );
});

Then(/I set Decision Tree/, (callback: CallbackStepDefinition) => {
    createModelDlg.decisionTree.click().then(
        () => {
            callback();
        }
    );
});

Then(/I set Random Forest/, (callback: CallbackStepDefinition) => {
    createModelDlg.randomForest.click().then(
        () => {
            callback();
        }
    );
});

Then(/I set Support Vector Machine/, (callback: CallbackStepDefinition) => {
    createModelDlg.supportVector.click().then(
        () => {
            callback();
        }
    );
});

When(/I click Train model button/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    createModelDlg.clickCreateModel().then(
        () => {
            browser.sleep(20 * 1000).then(
                () => {
                    callback();
                }
            );
        }
    );
});

When(/I want to open prediction dialog on '(.*)' file/,
    { timeout: 60 * 1000 },
    (fileName: string, callback: CallbackStepDefinition) => {

        let EC = protractor.ExpectedConditions;
        let sdf_file = element(by.cssContainingText('.tile-view .tile .tile-text', fileName));
        let dialog = contextMenu.getElementByName('Predict Properties');

        browser.wait(EC.elementToBeClickable(sdf_file)).then(
            () => {
                browser.actions().click(sdf_file, protractor.Button.RIGHT).perform().then(
                    () => {
                        dialog.click().then(
                            () => {
                                browser.wait(EC.visibilityOf(predictDlg.predictionDialog)).then(
                                    () => {
                                        callback();
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    }
);

When(/I choose Model in predict dialog '(.*)'/, (modelName: string, callback: CallbackStepDefinition) => {
    expect(predictDlg.modelList.isDisplayed()).to.eventually.equal(true).then(() => {
        predictDlg.model.click().then(
            () => {
                predictDlg.selectModel(modelName).click().then(
                    () => {
                        return callback();
                    }
                );
            }
        );
    })
});

When(/I choose Primary Field in predict dialog/, (callback: CallbackStepDefinition) => {
    predictDlg.primaryField.click().then(
        () => {
            predictDlg.primaryField.all(by.tagName('option')).get(1).click().then(
                () => {
                    callback();
                }
            );
        }
    );
});

When(/I click Predict button in predict dialog/, (callback: CallbackStepDefinition) => {
    predictDlg.createButton.click().then(
        () => {
            return callback();
        }
    );
});

When(/I am waiting for model to be created/, (callback: CallbackStepDefinition) => {
    browser.sleep(50 * 1000).then(
        () => {
            return callback();
        }
    )
})

When(/I click on select folder icon/, (callback: CallbackStepDefinition) => {
    const selectFolderIcon = element(by.css('.e2e-select-folder'));
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(selectFolderIcon), 5 * 1000, 'Select Folder Icon is Not Visible').then(() => {
        selectFolderIcon.click().then(() => {
            return callback();
        })
    })
})