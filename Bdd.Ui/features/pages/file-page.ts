import {$, browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';
import {HomePageObject} from "./home-page";
import {FilterElement} from "./filter-element";

export class FilePage extends HomePageObject {

    activateFilterToolbarButton: ElementFinder;
    activateStepperToolbarButton: ElementFinder;
    addFilterFieldDropDownButton: ElementFinder;
    searchPropertyElement: ElementFinder;
    fileURL = "";

    filtersList: FilterElement[] = [];

    propertiesForFilterList: ElementArrayFinder;

    constructor(fileURL: string) {
        super();
        this.fileURL = fileURL;
        this.activateFilterToolbarButton = element.all(by.css('.e2e-filter-button')).get(0);
        this.activateStepperToolbarButton = element.all(by.css('.e2e-wizard-button')).get(0);
        this.addFilterFieldDropDownButton = element.all(by.css('.filter-bar .btn-group button')).get(0);

        this.propertiesForFilterList = element.all(by.css('button.dropdown-item'));
        this.searchPropertyElement = element.all(by.css('.dropdown-menu input')).get(0);
    }

    openFilter() {
        return this.activateFilterToolbarButton.click();
    }

    goToDataSetStepper() {
        return this.activateStepperToolbarButton.click();
    }

    openFilterDropDown() {
        return this.addFilterFieldDropDownButton.click();
    }

    addFilter(item: ElementFinder, filterField: string): FilterElement {
        let filterItem = new FilterElement(item, filterField);
        this.filtersList.push(filterItem);
        return filterItem;
    }

    chooseFilterPropertyByIndex(index: number): FilterElement {
        let elem = this.propertiesForFilterList.get(index);
        let fieldName = "";
        elem.getText().then(
            (text) => {
                fieldName = text;
            }
        );

        elem.click();

        return this.addFilter(
            element.all(by.css('.filter-bar .btn-group')).get(this.filtersList.length * 2 + 1), fieldName
        );
    }

    chooseFilterPropertyByName(filterField: string): FilterElement {
        this.getPropertyByName(filterField);

        return this.addFilter(
            element.all(by.css('.filter-bar .btn-group')).get(this.filtersList.length * 2 + 1),
            filterField
        );
    }

    searchPropertyByValue(value: string) {
        this.searchPropertyElement.sendKeys(value);
    }

    private getPropertyByName(filterField: string) {

        this.propertiesForFilterList.each(function (element, index) {
            element.getText().then(
                (elementTest: string) => {
                    if (elementTest == filterField) {
                        element.click();
                    }
                }
            );
        });
    }
}
