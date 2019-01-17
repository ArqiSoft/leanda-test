import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, ExpectedConditions, $ } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { HomePageObject } from '../pages/home-page';
import { OrganizePage } from '../pages/opranize-page';
import { ToolbarComponent } from '../pages/toolbar-page';
import { ContextMenu } from '../pages/context-menu';
import { CreateFolderPage } from '../pages/folders-actions/create-folder-page';
import { DeleteFolderPage } from '../pages/folders-actions/delete-folder-page';
import { RenameFolderPage } from '../pages/folders-actions/rename-folder-page';
import { MoveFolderPage } from '../pages/folders-actions/move-folder-page';
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);

const homePage: HomePageObject = new HomePageObject();
const organizePage: OrganizePage = new OrganizePage();
const toolBarComponent: ToolbarComponent = new ToolbarComponent();
const contextMenu: ContextMenu = new ContextMenu();
const createFolderDlg: CreateFolderPage = new CreateFolderPage();
const deleteFolderDlg: DeleteFolderPage = new DeleteFolderPage();
const moveFolderDlg: MoveFolderPage = new MoveFolderPage();
const renameFolderDlg: RenameFolderPage = new RenameFolderPage();


When(/I click on Organize panel/, { timeout: 100 * 1000 }, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.refresh().then(
        () => {
            browser.wait(EC.elementToBeClickable(homePage.organizeLink), 30 * 1000, 'Organize Link is Not Clickable').then(
                () => {
                    homePage.goToOrganizePage().then(
                        () => {
                            browser.wait(EC.presenceOf(toolBarComponent.getRootElement()), 10 * 1000, 'Breadcrumbs are not Shown').then(
                                () => {
                                    return callback();
                                }
                            );
                        },
                        (error) => {
                            throw Error('Cannot go to Organize Page');
                        }
                    );
                }
            );
        }
    );
});


Then(/I should see root folder DRAFTS browser/, (callback: CallbackStepDefinition) => {
    expect(toolBarComponent.getRootElement().getText()).to.eventually.equal('DRAFTS').then(
        () => {
            return callback();
        },
        (error) => {
            throw Error('Cannot See Root Folder DRAFTS browser');
        }
    );
});

Given(/I go in the main directory/, { timeout: 30 * 1000 }, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(toolBarComponent.getRootElement())).then(
        () => {
            toolBarComponent.getRootElement().click().then(
                () => {
                    expect(browser.getCurrentUrl()).to.eventually.includes('/organize').and.notify(
                        () => {
                            return callback();
                        },
                        (error) => {
                            throw Error('Did not move to /organize page');
                        }
                    );
                },
                (error) => {
                    throw Error('Cannot Click on First Element in Breadcrumbs');
                }
            );
        }
    );
});

Given(/I open context toolbar menu and click '(.*)' folder button/,
    (actionName: string, callback: CallbackStepDefinition) => {
        const EC = protractor.ExpectedConditions;
        const createElement = contextMenu.getElementByName(actionName);
        browser.wait(EC.visibilityOf(toolBarComponent.subMenuButton), 10 * 1000, 'Submenu Button is Not Visible').then(
            () => {
                toolBarComponent.subMenuClick().then(
                    () => {
                        browser.sleep(1000).then(
                            () => {
                                expect(createElement.isDisplayed()).to.eventually.equal(true).then(
                                    () => {
                                        createElement.click().then(
                                            () => {
                                                return callback();
                                            }, (error) => {
                                                throw Error(`${actionName} was not clicked`);
                                            }
                                        );
                                    },
                                    (error) => {
                                        throw Error(`${createElement} is not Displayed`);
                                    }
                                );
                            }
                        );
                    },
                    (error) => {
                        throw Error('Cannot Click on SubMenu');
                    }
                );
            }
        );
    });

Given(/I click create button on toolbar/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.elementToBeClickable(toolBarComponent.createButton), 10 * 1000, 'Create Button is Not Clickable').then(
        () => {
            browser.actions().click(toolBarComponent.createButton).perform().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Button Was Not Clicked');
                }
            );
        }
    );
});

Given(/enter valid folder name '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    expect(createFolderDlg.createFolderDialog.isDisplayed()).to.eventually.equal(true).and.notify(
        () => {
            createFolderDlg.setFolderName(folderName).then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Cannot Set Folder Name');
                }
            );
        },
        (error) => {
            throw Error('Create Folder Dialog is not Displayed');
        }
    );
});

Given(/click Create button/, (callback: CallbackStepDefinition) => {
    browser.wait(ExpectedConditions.visibilityOf(createFolderDlg.createFolderButton), 10 * 1000, 'Create Button is not Visible').then(
        () => {
            createFolderDlg.clickCreateFolder().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Cannot Click Create Button');
                }
            );
        }
    );
});


Then(/'(.*)' file or folder is shown/, { timeout: 30 * 1000 }, (folderName: string, callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    const new_tile = element((by.cssContainingText('.tile-view .tile .tile-text', folderName)));

    browser.wait(EC.visibilityOf(new_tile), 10 * 1000, 'File or Folder is not visible').then(
        () => {
            return callback();
        }
    );
});

Given(/Delete file or folder '(.*)' if it exist/, (folderName: string, callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    const folder = element(by.cssContainingText('.tile .tile-text', folderName));
    folder.isPresent().then(
        result => {
            if (result === true) {
                browser.wait(EC.visibilityOf($('.e2e-pagination'))).then(
                    () => {
                        browser.actions().click(folder, protractor.Button.RIGHT).perform().then(
                            () => {
                                contextMenu.getElementByName('Delete').click().then(
                                    () => {
                                        browser.wait(EC.visibilityOf(deleteFolderDlg.deleteFolderDialog),
                                            10 * 1000, 'Delete Folder Dialog is not Displayed').then(
                                                () => {
                                                    deleteFolderDlg.clickDeleteFolder().then(
                                                        () => {
                                                            browser.wait(EC.invisibilityOf(folder), 10 * 1000).then(
                                                                () => {
                                                                    return callback();
                                                                }
                                                            );
                                                        },
                                                        (error) => {
                                                            throw Error('Cannot Click "Delete" Button in Delete Dialog');
                                                        }
                                                    );
                                                }
                                            );
                                    },
                                    (error) => {
                                        throw Error('Cannot Click "Delete" Button in Context Menu');
                                    }
                                );
                            },
                            (error) => {
                                throw Error('Cannot Use Right Click');
                            }
                        );
                    }
                );
            } else if (result === false) {
                return callback();
            }
        }
    );
});


Given(/confirm delete files & folders/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    browser.wait(EC.visibilityOf(deleteFolderDlg.deleteFolderDialog), 5 * 1000).then(
        () => {
            deleteFolderDlg.clickDeleteFolder().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Cannot Click "Delete" Button in Delete Dialog');
                }
            );
        },
        (error) => {
            throw Error('Delete Folder Dialog is not Displayed');
        }
    );

});

Given(/confirm delete folder/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.visibilityOf(deleteFolderDlg.deleteFolderDialog), 10 * 1000, 'Delete Folder Dialog is not Visible').then(
        () => {
            deleteFolderDlg.deleteFolderButton.click().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Delete Button was not Clicked');
                }
            );
        }
    );
});

Given(/I select file or folder '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    const EC = protractor.ExpectedConditions;
    const new_tile = organizePage.getTileByName(folderName);
    const checkedItem = organizePage.getCheckedTileByName(folderName);

    checkedItem.isPresent().then(
        (result) => {
            if (!result) {
                browser.wait(EC.elementToBeClickable(new_tile)).then(
                    () => {
                        new_tile.click().then(
                            () => {
                                expect(checkedItem.isDisplayed()).to.eventually.equal(true).then(
                                    () => {
                                        return callback();
                                    },
                                    (error) => {
                                        throw Error('Directory was not Selected');
                                    }
                                );
                            }
                        );
                    }
                );
            }
        }
    );
});


Then(/'(.*)' disappeared/, (folderName: string, callback: CallbackStepDefinition) => {
    browser.sleep(4 * 1000);
    browser.wait(ExpectedConditions.invisibilityOf(element(by.cssContainingText('.tile-view .tile .tile-text', folderName))),
        10 * 1000).then(
            () => {
                return callback();
            },
            (error) => {
                throw Error('Folder did not Disappear');
            }
        );
});

Given(/enter new folder name '(.*)' to '(.*)' and click ENTER button to save/,
    (oldFolderName: string, newFolderName: string, callback: CallbackStepDefinition) => {
        const EC = protractor.ExpectedConditions;

        browser.sleep(5 * 1000).then(
            () => {
                renameFolderDlg.removeOldFolderName().then(
                    () => {
                        renameFolderDlg.setNewFolderName(newFolderName).then(
                            () => {
                                renameFolderDlg.clickRenameFolder().then(
                                    () => {
                                        return callback();
                                    },
                                    (error) => {
                                        throw Error('Could not Click Rename Button');
                                    }
                                );
                            },
                            (error) => {
                                throw Error('Could not Set New Name');
                            }
                        );
                    },
                    (error) => {
                        throw Error('Could not Remove Old Name');
                    }
                );
            }
        );
    });

Then(/I check that folder name was changed to '(.*)'/, (folderName: string, callback: CallbackStepDefinition) => {

    const new_tile = organizePage.getTileByName(folderName);
    browser.wait(ExpectedConditions.visibilityOf(new_tile), 10 * 1000, 'Folder Was Not Renamed').then(
        () => {
            return callback();
        }
    );
});

Given(/I click move button/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.visibilityOf(moveFolderDlg.moveFolderButton), 10 * 1000, 'Move Button Is Not Visible').then(
        () => {
            moveFolderDlg.clickMoveFolder().then(
                () => {
                    browser.sleep(2 * 1000).then(callback);
                },
                (error) => {
                    throw Error('Could not Click Move Folder Button');
                }
            );
        }
    );
});

Given(/I click create new folder button in move dialog/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.visibilityOf(moveFolderDlg.createNewFolderButton), 10 * 1000, 'Create New Folder Button is Not Visible').then(
        () => {
            moveFolderDlg.createNewFolder().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Could not Click Create New Fodler Button');
                }
            );
        }
    );
});

Given(/I click create new folder in folder picker/, (callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    const createFolderButton = element(by.css('.e2e-folder-picker .e2e-create-folder'));
    browser.wait(EC.visibilityOf(createFolderButton), 10 * 1000, 'Create New Folder Button is Not Visible').then(
        () => {
            createFolderButton.click().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error('Could not Click Create New Fodler Button');
                }
            );
        }
    );
});

Given(/I enter new folder name '(.*)' in folder picker/, (folderName: string, callback: CallbackStepDefinition) => {
    const folderPicker = element(by.css('.e2e-folder-picker'));
    const inputFIeld = element(by.css('.e2e-folder-picker .e2e-create-folder input'));
    expect(folderPicker.isDisplayed()).to.eventually.equal(true).then(
        () => {
            inputFIeld.sendKeys(folderName).then(
                () => {
                    return callback();
                }
            );
        }
    );
});

Then(/I click submit folder creation button in folder picker/, (callback: CallbackStepDefinition) => {
    const submitButton = element(by.buttonText('Create'));
    expect(submitButton.isDisplayed()).to.eventually.equal(true).then(() => {
        submitButton.click().then(() => callback());
    });
});

Then(/I select '(.*)' in folder picker/, (folderName: string, callback: CallbackStepDefinition) => {
    const folder = element(by.cssContainingText('.e2e-folder-picker .move-item-text', folderName));
    const selectedFolder = element(by.cssContainingText('.e2e-folder-picker .move-item.selected', folderName));
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.visibilityOf(folder), 15 * 1000, 'Folder is Not Visible').then(() => {
        folder.click().then(() => {
            browser.wait(EC.visibilityOf(selectedFolder), 5 * 1000).then(() => {
                expect(selectedFolder.isDisplayed()).to.eventually.equal(true).then(() => {
                    return callback();
                });
            });
        });
    });
});

Then(/I click Select Folder button in folder picker/, (callback: CallbackStepDefinition) => {
    const button = element(by.css('.e2e-folder-picker .e2e-submit-form'));
    const EC = protractor.ExpectedConditions;

    browser.wait(EC.elementToBeClickable(button), 5 * 1000).then(() => {
        button.click().then(() => {
            return callback();
        });
    });
});

// Then(/I check that folder name '(.*)' is set in ML dialog/, (folderName: string, callback: CallbackStepDefinition) => {
//     const folderNameField = element(by.css(''))
// })

Then(/I close folder picker/, (callback: CallbackStepDefinition) => {
    const closeButton = element(by.css('.e2e-folder-picker .e2e-close-dialog'));
    expect(closeButton.isDisplayed()).to.eventually.equal(true).then(() => {
        closeButton.click().then(() => {
            return callback();
        });
    });
});

Given(/I select '(.*)' in move dialog/, (folderName: string, callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    let listElement: ElementFinder = null;

    browser.wait(EC.visibilityOf(moveFolderDlg.moveFolderDialog), 10 * 1000, 'Move Folder Dialog is Not Visible').then(
        () => {
            if (folderName === 'UP Button') {
                listElement = moveFolderDlg.goUpButton;
            } else {
                listElement = moveFolderDlg.getListItemByName(folderName);
            }

            browser.actions().doubleClick(listElement).perform().then(
                () => {
                    return callback();
                },
                (error) => {
                    throw Error(`Could not Select ${listElement} file or folder`);
                }
            );
        }
    );
});

function _goToFolderByPath(foldersArray: string[], myCallback: () => void) {

    const EC = protractor.ExpectedConditions;

    if (foldersArray.length > 0) {
        const new_tile = organizePage.getTileByName(foldersArray[0]);
        browser.wait(EC.presenceOf(new_tile), 10 * 1000, `${new_tile} is not Presented`).then(
            () => {
                browser.actions().doubleClick(new_tile).perform().then(
                    () => {
                        browser.sleep(1000).then(
                            () => {
                                _goToFolderByPath(foldersArray.slice(1), myCallback);
                            }
                        );

                    }
                );
            }
        );

    } else {
        return myCallback();
    }
}

Then(/I go to folder '(.*)'/, { timeout: 30 * 1000 }, (path: string, callback: CallbackStepDefinition) => {
    const EC = protractor.ExpectedConditions;
    const folders: string[] = path.split('/');

    if (folders[0] !== 'DRAFTS') {
        throw Error('There is no DRAFT folder');
    }

    // go to root folder
    const rootElement = toolBarComponent.getBreadCrumbsByName(folders[0]);

    browser.wait(EC.visibilityOf(rootElement), 20 * 1000, `${rootElement} is not Presented`).then(
        () => {
            rootElement.click().then(
                () => {
                    browser.wait(EC.presenceOf(element(by.css('.e2e-pagination'))), 10 * 1000, 'Pagination is not Presented').then(
                        () => {
                            _goToFolderByPath(folders.slice(1), () => {
                                return callback();
                            });
                        }
                    );

                },
                (error) => {
                    throw Error('Nothing Happened on Breadcrumbs Click');
                }
            );
        }
    );

});

// function checkBreadCrumbs(folders: string[], callback: () => void) {
//     for (let i = 1; i < folders.length; i++) {
//         expect(toolBarComponent.getBreadCrumbsByName(folders[i]).getText()).to.eventually.equal(folders[i]);
//     }
//     return callback();
// }

Then(/I check existing of folder '(.*)' in folder '(.*)'/, { timeout: 30 * 1000 },
    (targetFolder: string, path: string, callback: CallbackStepDefinition) => {

        const EC = protractor.ExpectedConditions;

        const new_tile = element((by.cssContainingText('.tile-view .tile .tile-text', targetFolder)));

        browser.wait(EC.visibilityOf(new_tile), 10 * 1000, `${targetFolder} is not Visible`).then(
            () => {
                expect(new_tile.getText()).to.eventually.equal(targetFolder).and.notify(
                    () => {
                        const folders: string[] = path.split('/');

                        expect(toolBarComponent.getBreadCrumbsByName(folders[folders.length - 1]).isPresent())
                            .to.eventually.equal(true).and.notify(callback);
                    }, (error) => {
                        throw Error(`${new_tile} does not exist in ${targetFolder}`);
                    }
                );
            }
        );
    });

Then(/I refresh browser/, (callback: CallbackStepDefinition) => {
    browser.refresh().then(
        () => {
            return callback();
        },
        (error) => {
            throw Error('Could not Refresh Browser');
        }
    );
});
