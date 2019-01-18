import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { SelectMultipleFiles } from '../pages/file-folder-selection-page';
import { ToolbarComponent } from '../pages/toolbar-page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
const EC = protractor.ExpectedConditions;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

const toolBarComponent: ToolbarComponent = new ToolbarComponent();
const selectFiles: SelectMultipleFiles = new SelectMultipleFiles();

Given(/for tile view I select '(.*)' using CTRL/, (tileName: string, callback: CallbackStepDefinition) => {

    const item = selectFiles.getTileElementByName(tileName);
    const checkedItem = selectFiles.getTileCheckedElement(tileName);
    browser.sleep(4 * 1000);
    browser.wait(EC.elementToBeClickable(item)).then(
        () => {
            checkedItem.isPresent().then(
                (result: boolean) => {
                    if (!result) {
                        browser
                        .actions()
                        .keyDown(process.platform === 'darwin' ? protractor.Key.COMMAND : protractor.Key.CONTROL)
                        .mouseMove(item)
                        .click()
                        .keyUp(process.platform === 'darwin' ? protractor.Key.COMMAND : protractor.Key.CONTROL)
                        .perform().then(
                            () => {
                                console.log(process.platform === 'darwin' ? 'COMMAND' : 'CONTROL');
                                checkedItem.isPresent().then(
                                    () => {
                                        return callback();
                                    }
                                );
                            }
                        );
                    } else {
                        return callback();
                    }
                }
            );
        },
        (error) => {
            throw Error(`${item} is not Clickable`);
        }
    );
}
);

Given(/for tile view I select '(.*)' using SHIFT/, (tileName: string, callback: CallbackStepDefinition) => {

    const item = selectFiles.getTileElementByName(tileName);
    const checkedItem = selectFiles.getTileCheckedElement(tileName);
    browser.sleep(4 * 1000);
    browser.wait(EC.elementToBeClickable(item), 10 * 1000, `${item} is not Clickable`).then(
        () => {
            expect(checkedItem.isPresent()).to.eventually.equal(false).then(
                () => {
                    browser.actions()
                    .keyDown(protractor.Key.SHIFT)
                    .mouseMove(item)
                    .click()
                    .keyUp(protractor.Key.SHIFT)
                    .perform()
                    .then(
                        () => {
                            checkedItem.isPresent().then(
                                () => {
                                    return callback();
                                },
                                (error) => {
                                    throw Error('There are no Elements Selected');
                                }
                            );
                        }
                    );
                },
                (error) => {
                    throw Error('There are Selected Elements, should not be any');
                }
            );
        }
    );
}
);

Given(/for table view I select '(.*)' using CTRL/, (itemName: string, callback: CallbackStepDefinition) => {

    const item = selectFiles.getTableElementByName(itemName);
    const checkedItem = selectFiles.getTableCheckedElementByName(itemName);

    browser.wait(EC.elementToBeClickable(item), 10 * 1000, `${item} is not Clickable`).then(
        () => {
            expect(checkedItem.isPresent()).to.eventually.equal(false).then(
                () => {
                    browser.actions()
                    .keyDown(process.platform === 'darwin' ? protractor.Key.COMMAND : protractor.Key.CONTROL)
                    .mouseMove(item)
                    .click()
                    .keyUp(process.platform === 'darwin' ? protractor.Key.COMMAND : protractor.Key.CONTROL)
                    .perform()
                    .then(
                        () => {
                            checkedItem.isPresent().then(
                                () => {
                                    return callback();
                                },
                                (error) => {
                                    throw Error('There are no elements Selected');
                                }
                            );
                        }
                    );
                },
                (error) => {
                    throw Error('There are Selected Elements, should not be any');
                }
            );
        }
    );
}
);

Given(/for table view I select '(.*)' using SHIFT/, (itemName: string, callback: CallbackStepDefinition) => {

    const item = selectFiles.getTableElementByName(itemName);
    const checkedItem = selectFiles.getTableCheckedElementByName(itemName);

    browser.wait(EC.elementToBeClickable(item), 10 * 1000, `${item} is not Clickable`).then(
        () => {
            expect(checkedItem.isPresent()).to.eventually.equal(false).then(
                () => {
                    browser.actions().keyDown(protractor.Key.SHIFT).mouseMove(item).click().keyUp(protractor.Key.SHIFT).perform().then(
                        () => {
                            checkedItem.isPresent().then(
                                () => {
                                    callback();
                                },
                                (error) => {
                                    throw Error('There are no Selected Elements, should be some');
                                }
                            );
                        }
                    );
                },
                (error) => {
                    throw Error('There are Selected Elements, should not be any');
                }
            );

        }
    );
}
);

Given(/I switch to tile view/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.elementToBeClickable(toolBarComponent.getRootElement())).then(
        () => {
            toolBarComponent.switchToTile().then(
                () => {
                    callback();
                },
                (error) => {
                    throw Error('Cannot Switch to Tile');
                }
            );
        },
        (error) => {
            throw Error('Breadcrumbs are not Shown');
        }
    );
});

Given(/I switch to table view/, (callback: CallbackStepDefinition) => {

    browser.wait(EC.elementToBeClickable(toolBarComponent.getRootElement())).then(
        () => {
            toolBarComponent.switchToTable().then(
                () => {
                    callback();
                },
                (error) => {
                    throw Error('Cannot Switch to Table');
                }
            );
        },
        (error) => {
            throw Error('Breadcrumbs are not Shown');
        }
    );
});

function _goToFolderByPath(foldersArray: string[], myCallback: () => void) {

    if (foldersArray.length > 0) {
        const new_tile = selectFiles.getTableElementByName(foldersArray[0]);

        browser.wait(EC.presenceOf(new_tile)).then(
            () => {
                browser.actions().doubleClick(new_tile).perform().then(
                    () => {
                        browser.sleep(2000).then(
                            () => {
                                _goToFolderByPath(foldersArray.slice(1), myCallback);
                            }
                        );

                    }
                );
            }
        );

    } else {
        myCallback();
    }
}

Then(/I go to table folder '(.*)'/, { timeout: 20 * 1000 }, (path: string, callback: CallbackStepDefinition) => {
    const folders: string[] = path.split('/');

    if (folders[0] !== 'DRAFTS') {
        throw Error('There is no DRAFT folder');
    }

    // go to root folder
    const rootElement = toolBarComponent.getBreadCrumbsByName(folders[0]);

    browser.wait(EC.presenceOf(rootElement)).then(
        () => {
            rootElement.click().then(
                () => {
                    browser.wait(EC.presenceOf(element(by.css('.e2e-pagination'))), 10 * 1000, 'Pagination is not Displayed').then(
                        () => {
                            _goToFolderByPath(folders.slice(1), () => {
                                callback();
                            });
                        }
                    );
                },
                (error) => {
                    throw Error('Cannot click on Breadcrumbs');
                }
            );
        }
    );
});

Then(/check if folder name in table view was changed to '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    const new_tile = selectFiles.getTableElementByName(folderName);
    browser.wait(EC.visibilityOf(new_tile), 10 * 1000, `${new_tile} is not Visible`).then(
        () => {
            expect(new_tile.getText()).to.eventually.equal(folderName).then(
                (value: any) => {
                    callback();
                },
                (error) => {
                    throw Error('Name was not Changed');
                }
            );
        }
    );
});

Then(/I check that '(.*)' file in table view is added/, (fileName: string, callback: CallbackStepDefinition) => {

    const new_tile = selectFiles.getTableElementByName(fileName);
    browser.wait(EC.presenceOf(new_tile), 20 * 1000, `${new_tile} is not Visible`).then(
        () => {
            expect(new_tile.getText()).to.eventually.equal(fileName).then(
                () => {
                    callback();
                },
                (error) => {
                    throw Error('Name was not Changed');
                }
            );
        }
    );
});

Then(/'(.*)' folder in table view is shown/, (folderName: string, callback: CallbackStepDefinition) => {

    const new_tile = selectFiles.getTableElementByName(folderName);

    browser.wait(EC.visibilityOf(new_tile)).then(
        () => {
            expect(new_tile.getText()).to.eventually.equal(folderName).then(
                () => {
                    callback();
                },
                (error) => {
                    throw Error(`${new_tile} is not same as ${folderName}`);
                }
            );
        }
    );
});
