import {$, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class ContextMenu {

    constructor() {
    }

    getElementByName(name: string) {
        return element.all(by.cssContainingText('.dropdown-menu li', name)).get(0);
    }
}
