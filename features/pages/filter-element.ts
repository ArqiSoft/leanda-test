import {$, browser, by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor';

export class FilterElement {
    filterOwnerElement: ElementFinder;
    dropDownMenuButton: ElementFinder;

    filterInputElement: ElementFinder;
    filterSubmitButton: ElementFinder;

    cancelFilterButton: ElementFinder;

    name:string = '';
    valueOfFilter:string = '';

    constructor(filterOwnerElement: ElementFinder, filterField: string) {
        this.filterOwnerElement = filterOwnerElement;
        this.dropDownMenuButton = filterOwnerElement.all(by.css('button.btn.btn-secondary.dropdown-toggle')).get(0);
        this.filterInputElement = filterOwnerElement.all(by.css('input')).get(0);
        this.filterSubmitButton = filterOwnerElement.all(by.buttonText('Apply')).get(0);
        this.cancelFilterButton = filterOwnerElement.all(by.css('button')).get(2);
        this.name = filterField;
    }

    openFilterMenu(){
        this.dropDownMenuButton.click();
    }

    inputFilterValue(value:string){
        this.valueOfFilter = value;
        this.filterInputElement.sendKeys(value);
    }

    submitFilter(){
        return this.filterSubmitButton.click();
    }

    cancelFilter(){
        this.valueOfFilter = '';
        return this.cancelFilterButton.click();
    }

}