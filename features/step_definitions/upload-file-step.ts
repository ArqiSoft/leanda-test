import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
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
import { UploadBoxComponent } from "../pages/upload-box-page";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');


setDefaultTimeout(60 * 1000);
let organizePage: OrganizePage = new OrganizePage();
let contextMenu: ContextMenu = new ContextMenu();
let uploadBoxComponent: UploadBoxComponent = new UploadBoxComponent();

Then(/I check that upload box is shown/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(uploadBoxComponent.uploadBoxDialog)).then(
        () => {
            expect(uploadBoxComponent.uploadBoxDialog.isPresent()).to.eventually.be.true.and.notify(
                () => {
                    callback();
                }
            );

        }
    );
}
);

Then(/I check that file '(.*)' is shown in upload box/, { timeout: 60 * 1000 }, (fileName: string, callback: CallbackStepDefinition) => {

    let EC = protractor.ExpectedConditions;
    let elementInBox = uploadBoxComponent.getUploadedFileElementByName(fileName);

    browser.wait(EC.presenceOf(elementInBox)).then(
        () => {
            expect(elementInBox.getText()).to.eventually.equal(fileName).and.notify(
                () => {
                    callback();
                }
            );
        }
    );

}
);

When(/I click go to file '(.*)' button in upload box/, { timeout: 60 * 1000 },
    (fileName: string, callback: CallbackStepDefinition) => {
        let EC = protractor.ExpectedConditions;

        let elementInBox = uploadBoxComponent.getUploadedFileElementByName(fileName);
        let doneButton = uploadBoxComponent.getDoneButton(elementInBox);
        let progressButton = uploadBoxComponent.getProgressButton(elementInBox);

        browser.wait(EC.presenceOf(doneButton)).then(
            () => {
                expect(doneButton.isPresent()).to.eventually.be.true.and.notify(
                    () => {
                        doneButton.click().then(
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

Then(/I click collapse button on upload box/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    let collapseButton = uploadBoxComponent.collapseButton;

    browser.actions().doubleClick(collapseButton).perform().then(
        () => {
            callback();
        }
    );
});

Then(/I check line with file '(.*)' does not exist/, { timeout: 60 * 1000 }, (fileName: string, callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    let elementLine = uploadBoxComponent.getUploadedFileElementByName(fileName);
    browser.wait(EC.stalenessOf(elementLine)).then(
        () => {
            expect(elementLine.isPresent()).to.eventually.be.false.and.notify(
                () => {
                    callback();
                }
            );
        }
    );
});

Then(/I check line with file '(.*)' exist/, (fileName: string, callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    let elementInBox = uploadBoxComponent.getUploadedFileElementByName(fileName);

    browser.wait(EC.presenceOf(elementInBox)).then(
        () => {
            expect(elementInBox.getText()).to.eventually.equal(fileName).and.notify(
                () => {
                    callback();
                }
            );
        }
    );
});

Then(/I click show lines button on upload box/, { timeout: 60 * 1000 }, (callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    let collapseButton = uploadBoxComponent.unCollapseButton;

    browser.actions().doubleClick(collapseButton).perform().then(
        () => {
            callback();
        }
    );
});

Then(/I cancel file '(.*)' uploading in upload box/, (fileName: string, callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    let cancelButton = uploadBoxComponent.getCancelButton();

    browser.actions().click(cancelButton).perform().then(
        () => {
            expect(uploadBoxComponent.getRestartButton().isPresent()).to.eventually.be.false.and.notify(
                () => {
                    callback();
                }
            );
        }
    );
});

When(/I want to close upload box/, (callback: CallbackStepDefinition) => {
    uploadBoxComponent.closeButton.click().then(
        () => {
            callback();
        }
    )
}
);

Then(/I check that upload box is invisible/, (callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;
    expect(uploadBoxComponent.uploadBoxDialog.isPresent()).to.eventually.be.false.and.notify(
        () => {
            callback();
        }
    );
});

