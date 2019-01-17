import {binding, given, when, then} from "cucumber-tsflow";
import {browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import {CallbackStepDefinition } from 'cucumber';
import {HomePageObject} from "../pages/home-page";
import {LoginPage} from "../pages/login-page";
import {FilePage} from "../pages/file-page";
import {FilterElement} from "../pages/filter-element";
import {StepperPage} from "../pages/stepper-page";
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


@binding()
class DataSetStepperStep {
    filePage: FilePage = new FilePage('/file/1');
    stepperPage: StepperPage = new StepperPage();

    @when(/I go to file page/)
    GoToFilePage(callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        browser.get(this.filePage.fileURL).then(
            () => {
                expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + this.filePage.fileURL);
                callback();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    @when(/I open filter panel/)
    OpenFilter(callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        this.filePage.openFilter().then(callback);
    }

    @when(/I remove all chosen filters/)
    RemoveFilters(callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        while (this.filePage.filtersList.length > 0) {
            this.filePage.filtersList[this.filePage.filtersList.length - 1].cancelFilter();
            this.filePage.filtersList.pop();
        }

        callback();
    }

    @when(/^I search and add filter by name '(.*)' and value '(.*)'/)
    AddFilterByName(filterField: string, filterValue: string, callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        this.filePage.openFilterDropDown();
        this.filePage.searchPropertyByValue(filterField);

        let firstFilter: FilterElement = this.filePage.chooseFilterPropertyByName(filterField);

        this.filePage.propertiesForFilterList.each(function (element, index) {
            element.getText().then(
                (elementTest: string) => {
                    if (elementTest == filterField) {
                        expect(element.getAttribute('disabled')).to.eventually.equal('true');
                    }
                }
            );
        });


        firstFilter.openFilterMenu();
        firstFilter.inputFilterValue(filterValue);
        firstFilter.submitFilter().then(callback);
    }

    @given(/I go to stepper with property '(.*)' and its value '(.*)'/)
    OpenStepper(propery: string, propertyValue: string, callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        this.filePage.goToDataSetStepper().then(
            () => {
                let filterString = this.filePage.fileURL + "/data-transform?" + propery + "=" + propertyValue;
                expect(browser.getCurrentUrl()).to.eventually.equal(browser.baseUrl + filterString);
                callback();
            }
        );
    }

    @when(/I go through first step/)
    FirstSteppersStep(callback: CallbackStepDefinition) {
        let listOfElements: ElementArrayFinder = this.stepperPage.form1.all(by.css('input'));

        let continueButton = this.stepperPage.form1.all(by.css('button')).get(1);

        listOfElements.get(0).clear();
        listOfElements.get(0).sendKeys('test name');

        listOfElements.get(1).clear();
        listOfElements.get(1).sendKeys('test name');

        let listOfFormGroup: ElementArrayFinder = this.stepperPage.form1.all(by.css('.form-group.row'));

        expect(listOfFormGroup.get(1).all(by.css('p.text-muted')).get(0).getText()).to.eventually.equal('This property is duplicated.');

        expect(continueButton.getAttribute('disabled')).to.eventually.equal('true');

        browser.refresh();

        listOfElements.each(function (element, index) {
            element.sendKeys(" new name");
        });

        continueButton.click().then(callback);
    }

    @when(/I go through second step/, '', 60 * 1000)
    SecondSteppersStep(callback: CallbackStepDefinition) {
        browser.waitForAngularEnabled(false);
        let continueButton = this.stepperPage.form2.all(by.css('button')).get(1);
        expect(continueButton.getAttribute('disabled')).to.eventually.equal('true');

        let listOfElements: ElementArrayFinder = this.stepperPage.form2.all(by.css('select'));
        listOfElements.each(function (element, index) {
            // Will print 0 First, 1 Second, 2 Third.
            element.click();
            element.all(by.tagName('option')).get(1).click();
        });

        continueButton.click();
        browser.controlFlow().execute(callback);
    }

    @when(/I go through third step/)
    ThirdSteppersStep(callback: CallbackStepDefinition) {
        let continueButton = this.stepperPage.form3.all(by.css('button')).get(1);
        expect(continueButton.getAttribute('disabled')).to.eventually.equal('true');

        let fileName = this.stepperPage.form3.all(by.css('input')).get(0);
        fileName.sendKeys('HelloWorld');
        continueButton.click().then(callback);
    }
}

export = DataSetStepperStep;

