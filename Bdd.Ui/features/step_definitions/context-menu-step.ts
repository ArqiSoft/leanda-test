import { browser, by, element, ElementArrayFinder, ElementFinder, protractor, ExpectedConditions } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { ContextMenu } from '../pages/context-menu';
import { OrganizePage } from '../pages/opranize-page';
import { ToolbarComponent } from '../pages/toolbar-page';
import { DeleteFolderPage } from '../pages/folders-actions/delete-folder-page';

const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;

const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);
const toolBarComponent: ToolbarComponent = new ToolbarComponent();
const contextMenu: ContextMenu = new ContextMenu();
const organizePage: OrganizePage = new OrganizePage();
const deleteFolderDlg: DeleteFolderPage = new DeleteFolderPage();

Given(/I use right click on free space to call context menu and click '(.*)' folder button/,
    (actionName: string, callback: CallbackStepDefinition) => {

        const el = element(by.css('content'));
        const selectOption = contextMenu.getElementByName(actionName);

        browser.actions().mouseMove(el).click(protractor.Button.RIGHT).perform().then(
            () => {
                expect(element.all(by.css('.dropdown-menu')).get(0).isDisplayed()).to.eventually.equal(true).then(
                    () => {
                        browser.actions().mouseMove(selectOption).perform().then(
                            () => {
                                selectOption.click().then(
                                    () => {
                                        return callback();
                                    },
                                    (error) => {
                                        throw Error(`Cannot click on ${selectOption}`);
                                    }
                                );
                            }
                        );
                    },
                    (error) => {
                        throw Error('Context Menu is not Dispalyed');
                    }
                );
            }
        );
    });

Given(/I use right click on '(.*)' to call context menu and click '(.*)' folder button/,
    (itemName: string, actionName: string, callback: CallbackStepDefinition) => {

        const el = organizePage.getTileByName(itemName);
        const menuItem = contextMenu.getElementByName(actionName);

        browser.wait(ExpectedConditions.visibilityOf(el), 10 * 1000, `${itemName} is not visible`).then(() => {
            browser.actions().mouseMove(el).click(protractor.Button.RIGHT).perform().then(
                () => {
                    expect(element(by.css('.tile-view .tile.checked')).isPresent()).to.eventually.equal(true).then(
                        () => {
                            expect(element.all(by.css('.dropdown-menu')).get(0).isDisplayed()).to.eventually.equal(true).then(
                                () => {
                                    menuItem.click().then(
                                        () => {
                                            return callback();
                                        },
                                        (error) => {
                                            throw Error(`Cannot click on ${menuItem}`);
                                        }
                                    );
                                },
                                (error) => {
                                    throw Error('Context Menu is not Dispalyed');
                                }
                            );
                        },
                        (error) => {
                            throw Error('There is no Selected Elements');
                        }
                    );
                }
            );
        });
    });

Given(/I choose '(.*)' folder and click on more actions button and click '(.*)' folder button/,
    (folderName: string, actionName: string, callback: CallbackStepDefinition) => {

        const selectOption = contextMenu.getElementByName(actionName);
        const itemAll = element.all(by.css('.tile-view .tile'));
        const itemFolder = itemAll.all(by.cssContainingText('.tile-text', folderName)).get(0);
        const itemFooterChecked = element(by.css('.tile-view .tile.checked .tile-footer'));
        const itemActions = element(by.css('.tile-view .tile.checked .tile-footer .more-actions'));

        browser.actions().mouseMove(itemFolder).click().perform().then(
            () => {
                expect(element(by.css('.tile-view .tile.checked')).isPresent()).to.eventually.equal(true).then(
                    () => {
                        browser.actions().mouseMove(itemFooterChecked).mouseMove(itemActions).click().perform().then(
                            () => {
                                expect(element.all(by.css('.dropdown-menu')).get(0).isDisplayed()).to.eventually.equal(true).then(
                                    () => {
                                        selectOption.click().then(
                                            () => {
                                                return callback();
                                            },
                                            (error) => {
                                                throw Error(`${selectOption} cannot be Clicked`);
                                            }
                                        );
                                    },
                                    (error) => {
                                        throw Error('Context Menu element is Not Displayed');
                                    }
                                );
                            },
                            (error) => {
                                throw Error(`Could not Click on ${itemActions}`);
                            }
                        );
                    },
                    (error) => {
                        throw Error(`${itemFolder} was not Selected`);
                    }
                );
            }
        );
    });

Given(/I use right click on '(.*)' to call context menu and choose menu element '(.*)' and subMenu '(.*)'/,
    (itemName: string, menuElement: string, subMenuElement: string, callback: CallbackStepDefinition) => {

        const el = organizePage.getTileByName(itemName);
        const menuItem = contextMenu.getElementByName(menuElement);
        const subMenuItem = contextMenu.getElementByName(subMenuElement);

        browser.actions().mouseMove(el).click(protractor.Button.RIGHT).perform().then(
            () => {
                expect(element(by.css('.tile-view .tile.checked')).isPresent()).to.eventually.equal(true).then(
                    () => {
                        expect(element.all(by.css('.dropdown-menu')).get(0).isDisplayed()).to.eventually.equal(true).then(
                            () => {
                                browser.actions().mouseMove(menuItem).perform().then(
                                    () => {
                                        subMenuItem.click().then(
                                            () => {
                                                return callback();
                                            },
                                            (error) => {
                                                throw Error(`Cannot click on ${subMenuElement}`);
                                            }
                                        );
                                    }
                                );
                            },
                            (error) => {
                                throw Error('Context Menu is not Dispalyed');
                            }
                        );
                    },
                    (error) => {
                        throw Error('There is no Selected Elements');
                    }
                );
            }
        );
    });

Given(/I open context toolbar menu and choose menu element '(.*)' and subMenu '(.*)'/,
    (menuElement: string, subMenuElement: string, callback: CallbackStepDefinition) => {
        const EC = protractor.ExpectedConditions;

        const menuItem = contextMenu.getElementByName(menuElement);
        const subMenuItem = contextMenu.getElementByName(subMenuElement);

        if (menuElement === 'Export File') {
            browser.sleep(15 * 1000);
        }
        browser.wait(EC.visibilityOf(toolBarComponent.subMenuButton), 10 * 1000, 'Submenu Button is Not Visible').then(
            () => {
                toolBarComponent.subMenuClick().then(
                    () => {
                        browser.sleep(1000).then(
                            () => {
                                expect(menuItem.isDisplayed()).to.eventually.equal(true).then(
                                    () => {
                                        browser.actions().mouseMove(menuItem).perform().then(
                                            () => {
                                                subMenuItem.click().then(
                                                    () => {
                                                        return callback();
                                                    },
                                                    (error) => {
                                                        throw Error(`Cannot click on ${subMenuElement}`);
                                                    }
                                                );
                                            }
                                        );
                                    },
                                    (error) => {
                                        throw Error('Context Menu is not Dispalyed');
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
