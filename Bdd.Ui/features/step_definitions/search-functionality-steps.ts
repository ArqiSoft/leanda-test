import { browser, by, element, ElementArrayFinder, ElementFinder, protractor } from 'protractor';
import { CallbackStepDefinition } from 'cucumber';
import { ToolbarComponent } from "../pages/toolbar-page";
import { SearchComponent } from "../pages/search-functionality";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let EC = protractor.ExpectedConditions;


const { Given, When, Then, setDefaultTimeout } = require('cucumber');

setDefaultTimeout(60 * 1000);
let toolBarComponent: ToolbarComponent = new ToolbarComponent();
let searchComponent: SearchComponent = new SearchComponent();

Given(/I click on search button in toolbar/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(toolBarComponent.searchButton)).then(
        () => {
            browser.actions().click(toolBarComponent.searchButton).perform().then(
                () => {
                    callback();
                }
            )
        }
    )
})

Given(/I close search field/, (callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(toolBarComponent.closeSearchButton)).then(
        () => {
            browser.actions().click(toolBarComponent.closeSearchButton).perform().then(
                () => {
                    callback();
                }
            )
        }
    )
})

Given(/I enter '(.*)' to find by title/, (searchString: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(searchComponent.searchInput)).then(
        () => {
            searchComponent.searchInput.sendKeys(searchString).then(
                () => {
                    callback();
                }
            );
        }
    )
})

Given(/I check if '(.*)' file or folder was found/, (searchString: string, callback: CallbackStepDefinition) => {
    browser.wait(EC.visibilityOf(searchComponent.dropDownMenu)).then(
        () => {
            expect(searchComponent.getSearchResults(searchString).isDisplayed()).to.eventually.equal(true).then(
                () => {
                    callback();
                }
            )
        }
    )
})

Given(/I clean search field/, (callback: CallbackStepDefinition) => {
    searchComponent.cleanSearchField().then(
        () => {
            callback();
        }
    )
})