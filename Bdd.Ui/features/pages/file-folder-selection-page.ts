import { $, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class SelectMultipleFiles {
    browserItemsList: ElementArrayFinder;

    constructor() {
        this.browserItemsList = element.all(by.css('.tile-view .tile'));
    }
    getTileElementByName(tileText: string) {
        return element(by.cssContainingText('.tile-text', tileText));
    }

    getTileCheckedElement(tileText: string) {
        return element.all(by.cssContainingText('.tile-view .tile.checked .tile-text', tileText));
    }

    getAllTileCheckedElements() {
        return element.all(by.css('.tile-view .tile.checked')).count();
    }

    getTableElementByName(tableText: string) {
        return element(by.cssContainingText(`.item-name`, tableText));;
    }

    getTableCheckedElementByName(tableText: string) {
        return element.all(by.cssContainingText('.table-view .table-item.checked .item-text', tableText));
    }

}