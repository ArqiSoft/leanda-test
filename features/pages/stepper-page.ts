import {$, browser, by, element, ElementFinder, protractor} from 'protractor';

export class StepperPage {
    form1: ElementFinder;
    form2: ElementFinder;
    form3: ElementFinder;

    constructor() {
        this.form1 = element.all(by.css('form')).get(0);
        this.form2 = element.all(by.css('form')).get(1);
        this.form3 = element.all(by.css('form')).get(2);
    }
}