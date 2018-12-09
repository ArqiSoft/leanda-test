import { $$, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class InfoBoxComponent {
    infoBoxWindow: ElementFinder;
    infoBoxExpanded: ElementFinder;
    infoBoxConent: ElementFinder;
    firstRecord: ElementFinder;

    constructor() {
        this.infoBoxWindow = element.all(by.css('.info-box-container')).get(0);
        this.infoBoxExpanded = element.all(by.css('.mat-expansion-panel.mat-expanded')).get(0);
        this.infoBoxConent = this.infoBoxExpanded.all(by.css('.mat-expansion-panel-content')).get(0);
        this.firstRecord = element.all(by.css('.tile')).get(0);
    }

    getItemWithKey(key: string) {
        return element.all(by.cssContainingText('.e2e-property-name', key)).get(0);
    }

    getItemWithValue(value: string) {
        return element.all(by.cssContainingText('.e2e-property-value', value)).get(0);
    }
}
