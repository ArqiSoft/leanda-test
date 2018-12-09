import { $, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class SearchComponent {
    searchArea: ElementFinder;
    searchInput: ElementFinder;
    dropDownMenu: ElementFinder;
    searchResults: ElementArrayFinder;

    constructor() {
        this.searchArea = element.all(by.css('.tools-header.e2e-toolbar-header.search-state')).get(0);
        this.searchInput = this.searchArea.all(by.css('.search-div .search-input')).get(0);
        this.dropDownMenu = this.searchArea.all(by.css('.dropdown-menu')).get(0);
        this.searchResults = this.dropDownMenu.all(by.css('.dropdown-item.search-drop-drown-item'));
    }

    getSearchResults(searchElement: string) {
        return this.searchResults.all(by.cssContainingText('.search-item-name', searchElement)).get(0);
    }
    cleanSearchField(){
        return this.searchInput.clear();
    }

}