import { $, $$, browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { ExportDialogComponent } from "../pages/export-dialog-page";
import { OrganizePage } from '../pages/opranize-page';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let EC = protractor.ExpectedConditions;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

    setDefaultTimeout(60 * 1000);
    const exportComponent: ExportDialogComponent = new ExportDialogComponent();
    const organizePage: OrganizePage = new OrganizePage();    

    Given(/I can see export dialog/, (callback: CallbackStepDefinition) => {
        expect(exportComponent.exportDialog.isDisplayed()).to.eventually.equal(true).then(() => {
            return callback();
        },
        (error) => {
            throw Error('Export Dialog is not Visible');
        }
        );
    });

    Given(/I click select all button/, (callback: CallbackStepDefinition) => {
        browser.wait(EC.visibilityOf(exportComponent.selectAllButton), 10 * 1000).then(
            () => {
                browser.actions().click(exportComponent.selectAllButton).perform().then(
                    () => {
                        return callback();
                    },
                    (error) => {
                        throw Error('Cannot Click "Select All" Button');
                    }
                );
            },
            (error) => {
                throw Error('"Select All" button is not Visible');
            }
        )
    });

    Given(/I uncheck first two items/, (callback: CallbackStepDefinition) => {
        browser.wait(EC.visibilityOf(exportComponent.checkBox.get(0)), 10 * 1000).then(
            () => {
                exportComponent.clickOnCheckbox(0).then(
                    () => {
                        exportComponent.clickOnCheckbox(1).then(() => {
                            return callback();
                        },
                        (error) => {
                            throw Error('Second Checkbox cannot be Clicked');
                        }
                    );
                    },
                    (error) => {
                        throw Error('First Checkbox cannot be Clicked');
                    }
                )
            },
            (error) => {
                throw Error('Checkbox is not Visible');
            }
        )
    });

    Given(/I click reverse selection button/, (callback: CallbackStepDefinition) => {
        browser.wait(EC.elementToBeClickable(exportComponent.reverseAllButton), 10 * 1000, 'Reverse Selection Button is not Clickable').then(
            () => {
                browser.actions().click(exportComponent.reverseAllButton).perform().then(() => {
                    return callback();
                },
                (error) => {
                    throw Error('Cannot Click on Reverse Selection Button');
                });
            }
        )
    })

    Given(/I click export/, (callback: CallbackStepDefinition) => {
        browser.wait(EC.elementToBeClickable(exportComponent.submitExport), 10 * 1000, 'Submit Export Button is Not Clickable').then(
            () => {
                exportComponent.submitExport.click().then(() => {
                    return callback();
                },
                (error) => {
                    throw Error('Cannot Click on  Submit Button');
                });
            }
        )
    })

    Then(/I click button to collapse menu/, (callback: CallbackStepDefinition) => {
        let collapseButton = organizePage.collapseButton;
        collapseButton.click().then( () => { return callback(); } );
    });

    Then(/I click collapsed menu file button and export '(.*)' file/, (file_format: string, callback: CallbackStepDefinition) => {
        let filesButton = organizePage.collapsedMenuFiles;
        let menu_item = element(by.css(`button[mattooltip$="${file_format}"]`));
        filesButton.click().then(
            () => {
                browser.actions().mouseMove(menu_item, { x: 10, y: 10 }).click().perform().then(
                    () => { return callback(); }
               );
            }
        );
    });

    Then(/click Export button/, (callback: CallbackStepDefinition) => {
        element(by.buttonText('Export')).click().then(
            () => { return callback(); }); }
        );