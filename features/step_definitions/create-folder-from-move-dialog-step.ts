import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { ContextMenu } from "../pages/context-menu";
import { MoveFolderPage } from "../pages/folders-actions/move-folder-page";
import { OrganizePage } from "../pages/opranize-page";

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);
let contextMenu: ContextMenu = new ContextMenu();
let moveFolderDlg: MoveFolderPage = new MoveFolderPage();
let organizePage: OrganizePage = new OrganizePage();

Then(/Check if '(.*)' exist/, (folderName: string, callback: CallbackStepDefinition) => {

    let deleted_tile = organizePage.getTileByName(folderName);
    browser.sleep(2000).then(
        () => {
            expect(deleted_tile.isPresent()).to.eventually.equal(false).then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error(`${deleted_tile} still exist`);
                }
            );
        }
    )
});

Then(/I click submit folder creation button in move dialog/, (callback: CallbackStepDefinition) => {

    expect(moveFolderDlg.submitButton.isPresent()).to.eventually.equal(true).and.notify(
        () => {
            browser.actions().click(moveFolderDlg.submitButton).perform().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Could not Click Submit Button in Move Dialog');
                }
            );
        },
        (error) => {
            throw Error('Submit Button is not Presented');
        }
    )
});

Then(/I close modal window/, (callback: CallbackStepDefinition) => {

    browser.actions().click(moveFolderDlg.closeMoveFolderDialog).perform().then(
        () => {
            return callback();
        },
        (error) => {
            throw Error('Could not click Move Folder Button');
        }
    );
});

Then(/I check if '(.*)' was created in move dialog/, (folderName: string, callback: CallbackStepDefinition) => {
    let EC = protractor.ExpectedConditions;

    expect(moveFolderDlg.moveFolderDialog.isDisplayed()).to.eventually.equal(true).and.notify(
        () => {
            let listElement: ElementFinder = null;

            if (folderName == 'ROOT') {
                listElement = moveFolderDlg.goUpButton;
            } else {
                listElement = moveFolderDlg.getListItemByName(folderName);
            }

            browser.wait(EC.presenceOf(listElement)).then(
                () => {
                    listElement.click().then(
                        () => {
                            browser.wait(EC.presenceOf(moveFolderDlg.getListItemByName(folderName))).then(
                                () => {
                                    return callback();
                                },
                                (error) => {
                                    throw Error(`${folderName} is not Presented`);
                                }
                            );
                        },
                        (error) => {
                            throw Error(`${listElement} cannot be Clicked`);
                        }
                    );
                },
                (error) => {
                    throw Error(`${listElement} is not Presented`);
                }
            );
        },
        (error) => {
            throw Error('Move Folder Dialog is not Displayed');
        }
    );
}
);