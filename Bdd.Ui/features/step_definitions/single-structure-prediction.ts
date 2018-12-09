import { browser, by, element, protractor, $ } from 'protractor';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

When(/I go to the ssp page/,
    async () => {
        const EC = protractor.ExpectedConditions;
        await browser.refresh();
        await browser.wait(EC.elementToBeClickable(element.all(by.css('.e2e-login-item')).get(0)));
        const prediction = await element(by.cssContainingText('.e2e-nav-bar-links .nav-link', 'Predict'));
        return prediction.click();
    }
);

Given(/I go to predict page with '(.*)' data/,
    async (smiles: string) => {
        await browser.get(`/predict?smiles=${smiles}`);
    }
);

Then(/I go to page to select properties/,
    async () => {
        const selectProperties = await element(by.buttonText('Select Properties'));
        return selectProperties.click();
    }
);

Given(/I select checkbox '(.*)'/,
    async (property: string) => {
        const EC = protractor.ExpectedConditions;

        element.all(by.css('.e2e-property label')).each(async (elementOfpage, index) => {
            const x = elementOfpage.all(by.cssContainingText('span', property));

            await browser.sleep(100);
            const count = await x.count();
            if (count > 0) {
                await browser.wait(EC.visibilityOf(elementOfpage));
                await browser.wait(EC.elementToBeClickable(elementOfpage));
                await elementOfpage.click();
            }
        });

        return browser.sleep(0);
    }
);

Given(/I select checkbox group '(.*)'/,
    async (property: string) => {
        const EC = protractor.ExpectedConditions;

        element.all(by.css('.e2e-property-group label')).each(async (elementOfpage, index) => {
            const x = elementOfpage.all(by.cssContainingText('span', property));

            await browser.sleep(100);
            const count = await x.count();
            if (count > 0) {
                await browser.wait(EC.visibilityOf(elementOfpage));
                await browser.wait(EC.elementToBeClickable(elementOfpage));
                await elementOfpage.click();
            }
        });

        return browser.sleep(0);
    }
);

Then(/I go to page to Predict/,
    async () => {
        const EC = protractor.ExpectedConditions;

        const selectProperties = element(by.buttonText('Predict'));
        await browser.wait(EC.visibilityOf(selectProperties));
        return selectProperties.click();
    }
);

Then(/I am waiting for predict result/,
    async () => {
        const EC = protractor.ExpectedConditions;

        return browser.sleep(55 * 1000);
    }
);

Then(/I start new prediction/,
    async () => {
        const EC = protractor.ExpectedConditions;

        const newPredictionButton = element(by.buttonText('New Prediction'));
        await browser.wait(EC.visibilityOf(newPredictionButton), 5000);
        return newPredictionButton.click();
    }
);

Then(/I am checking predict property '(.*)' '(.*)' '(.*)' '(.*)' '(.*)' '(.*)' '(.*)' result/,
    async (property: string, dataset: string, consensus: string,
        DNN: string, RF: string, XGBoost: string, kNN: string) => {
        let stepResult = false;
        element.all(by.css('mat-row')).each(async (row, index) => {

            const hasProperty = await row.all(by.cssContainingText('.mat-column-property', property)).count();

            const hasDataset = await row.all(by.cssContainingText('.mat-column-dataset', dataset)).count();

            // console.log(hasProperty, hasDataset);
            // console.log('1: ' + DNN, '2: ' + method2,
            //     '3: ' + RF, '4: ' + method4, '5: ' + XGBoost, '6: ' + kNN);

            if (hasProperty > 0 && hasDataset > 0) {
                const valConsensus = await row.all(by.css('.mat-column-consensus')).get(0).getText();

                let dnnElementsResult = true;

                if (DNN.length > 1) {
                    row.all(by.css('.mat-column-dnnregressor ul li')).each(
                        async (mOneElement, indexOne) => {
                            const txt = await mOneElement.getText();
                            if (!DNN.includes(txt)) {
                                dnnElementsResult = false;
                            }
                        }
                    );
                }

                // let elasticElementsResult = true;
                // if (method2.length > 1) {
                //     row.all(by.css('.mat-column-elasticnet ul li')).each(
                //         async (mOneElement, indexOne) => {
                //             const txt = await mOneElement.getText();
                //             if (!method2.includes(txt)) {
                //                 elasticElementsResult = false;
                //             }
                //         }
                //     );
                // }


                let randomForestRegressor = true;
                if (RF.length > 1) {
                    row.all(by.css('.mat-column-randomforestregressor ul li')).each(
                        async (mOneElement, indexOne) => {
                            const txt = await mOneElement.getText();
                            if (!RF.includes(txt)) {
                                randomForestRegressor = false;
                            }
                        }
                    );
                }

                // let supportVectorMachineRegressor = true;
                // if (method4.length > 1) {
                //     row.all(by.css('.mat-column-supportvectormachineregressor ul li')).each(
                //         async (mOneElement, indexOne) => {
                //             const txt = await mOneElement.getText();
                //             if (!method4.includes(txt)) {
                //                 supportVectorMachineRegressor = false;
                //             }
                //         }
                //     );
                // }

                let extremeGradientBoostingRegressor = true;
                if (XGBoost.length > 1) {
                    row.all(by.css('.mat-column-extremegradientboostingregressor ul li')).each(
                        async (mOneElement, indexOne) => {
                            const txt = await mOneElement.getText();
                            if (!XGBoost.includes(txt)) {
                                extremeGradientBoostingRegressor = false;
                            }
                        }
                    );
                }

                let nearestElementsResult = true;
                if (kNN.length > 1) {
                    row.all(by.css('.mat-column-nearestneighborsregressor ul li')).each(
                        async (mOneElement, indexOne) => {
                            const txt = await mOneElement.getText();
                            if (!kNN.includes(txt)) {
                                nearestElementsResult = false;
                            }
                        }
                    );
                }

                if (
                    valConsensus === consensus &&
                    dnnElementsResult &&
                    nearestElementsResult &&
                    randomForestRegressor &&
                    extremeGradientBoostingRegressor) {
                    stepResult = true;
                } else {
                    stepResult = false;
                }
            }
        });

        await browser.sleep(2 * 1000);

        const response = new Promise((resolve, reject) => {
            if (stepResult) {
                resolve(true);
            } else {
                reject(false);
            }
        });

        return expect(response).to.eventually.be.true;
    }
);
