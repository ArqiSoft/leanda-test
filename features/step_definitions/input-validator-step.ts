import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { CreateFolderPage } from "../pages/folders-actions/create-folder-page";
import { DeleteFolderPage } from "../pages/folders-actions/delete-folder-page";
import { RenameFolderPage } from "../pages/folders-actions/rename-folder-page";
import { MoveFolderPage } from "../pages/folders-actions/move-folder-page";
import { throws } from 'assert';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let EC = protractor.ExpectedConditions;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

let createFolderDlg: CreateFolderPage = new CreateFolderPage();
let deleteFolderDlg: DeleteFolderPage = new DeleteFolderPage();
let moveFolderDlg: MoveFolderPage = new MoveFolderPage();
let renameFolderDlg: RenameFolderPage = new RenameFolderPage();

Given(/check if folder name '(.*)' is valid or invalid/, (folderName: string, callback: CallbackStepDefinition) => {

    browser.wait(EC.visibilityOf(createFolderDlg.createFolderDialog), 10 * 1000, 'Dialog is not Visible').then(
        () => {
            expect(createFolderDlg.createFolderButton.isEnabled()).to.eventually.equal(false).then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('Folder Name is Valid - should be Not Valid');
                }
            )
        }
    );
})

Given(/I press cancel/, (callback: CallbackStepDefinition) => {

    expect(createFolderDlg.createFolderDialog.isDisplayed()).to.eventually.equal(true).and.notify(
        () => {
            browser.actions().click(createFolderDlg.cancelCreateButton).perform().then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('Could not Click on Cancel Button');
                }
            );
        }, (error) => {
            throw Error('Create Folder Dialog is not Displayed');
        }
    )
})

Then(/I delete new folder name create folder dialog/, (callback: CallbackStepDefinition) => {

    expect(createFolderDlg.createFolderDialog.isDisplayed()).to.eventually.equal(true).and.notify(
        () => {
            createFolderDlg.inputFolderName.clear().then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('Could not Clear Input Field');
                }
            );
        }, (error) => {
            throw Error('Create Folder Dialog is Not Displayed');
        }
    )
})

Given(/remove old folder name if needed/,
    (callback: CallbackStepDefinition) => {

        expect(renameFolderDlg.renameFolderDialog.isDisplayed()).to.eventually.equal(true).notify(
            () => {
                expect(renameFolderDlg.inputFolderName.getText()).to.eventually.equal('').then(
                    (result: boolean) => {
                        if (!result) {
                            renameFolderDlg.removeOldFolderName().then(
                                () => {
                                    return callback();
                                }, (error) => {
                                    throw Error('Could not Remove Old Folder Name');
                                }
                            )
                        }
                        else {
                            return callback();
                        }
                    }
                )
            }, (error) => {
                throw Error('Rename Folder Dialog is not Displayed');
            }
        )
    });

Given(/I set new invalid folder name '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    expect(renameFolderDlg.renameFolderDialog.isDisplayed()).to.eventually.equal(true).then(
        () => {
            renameFolderDlg.inputFolderName.sendKeys(folderName).then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('Could not Enter New Folder Name');
                }
            );
        }, (error) => {
            throw Error('Rename Folder Dialog is not Displayed');
        }
    );
});

Given(/I check if '(.*)' is valid or not/, (folderName: string, callback: CallbackStepDefinition) => {

    browser.wait(EC.visibilityOf(renameFolderDlg.renameFolderDialog), 10 * 1000, 'Rename Folder Dialog is not Visible').then(
        () => {
            expect(renameFolderDlg.renameFolderButton.isEnabled()).to.eventually.equal(false).then(
                () => {
                    return callback();
                }, (error) => {
                    throw Error('New Folder Name Should Be Invalid');
                }
            )
        }
    );
})

Then(/I click on cancel button/, (callback: CallbackStepDefinition) => {

    browser.wait(EC.visibilityOf(renameFolderDlg.renameFolderDialog)).then(
        () => {
            browser.actions().click(renameFolderDlg.cancelRenameButton).perform().then(
                () => {
                    callback();
                }
            );
        }
    )
})

Given(/I enter test folder name '(.*)' in input field/, (folderName: string, callback: CallbackStepDefinition) => {

    expect(moveFolderDlg.moveFolderDialog.isDisplayed()).to.eventually.equal(true).then(
        () => {
            moveFolderDlg.newFolderName.sendKeys(folderName).then(
                () => {
                    callback();
                }
            );
        }
    );
});

Given(/I clear input field for new folder in move dialog/, (callback: CallbackStepDefinition) => {

    expect(moveFolderDlg.moveFolderDialog.isDisplayed()).to.eventually.equal(true).then(
        () => {
            moveFolderDlg.newFolderName.clear().then(
                () => {
                    callback();
                });
        }
    );
});

Given(/I check this folder name '(.*)' is invalid/, (folderName: string, callback: CallbackStepDefinition) => {

    browser.wait(EC.visibilityOf(moveFolderDlg.moveFolderDialog)).then(
        () => {
            expect(moveFolderDlg.submitButton.isEnabled()).to.eventually.equal(false).then(
                () => {
                    callback();
                }
            )
        }
    );
})

Then(/I close move dialog/, (callback: CallbackStepDefinition) => {
    expect(moveFolderDlg.moveFolderDialog.isPresent()).to.eventually.equal(true).and.notify(
        () => {
            moveFolderDlg.closeMoveFolderDialog.click().then(
                () => {
                    browser.sleep(2000).then(callback);;
                }
            );
        }
    )
})