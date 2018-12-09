import {$, by, element, ElementArrayFinder, ElementFinder} from 'protractor';

export class ToolbarComponent{

    toolBarElement: ElementFinder;
    breadCrumbs: ElementFinder;
    searchButton: ElementFinder;
    closeSearchButton: ElementFinder;
    exportButton: ElementFinder;
    deleteButton: ElementFinder;
    subMenuButton: ElementFinder;
    switchToTableButton: ElementFinder;
    switchToTileButton: ElementFinder;
    filterButton: ElementFinder;
    wizardButton: ElementFinder;
    createButton: ElementFinder;

    breadCrumbsList: ElementArrayFinder;

    constructor() {
        this.toolBarElement = element.all(by.css('.e2e-toolbar-header')).get(0);
        this.breadCrumbs = element.all(by.css('.e2e-toolbar-breadcrumbs')).get(0);
        this.searchButton = element.all(by.css('.e2e-search-button')).get(0);
        this.closeSearchButton = element(by.css('.e2e-search-close'));
        this.exportButton = element.all(by.css('.e2e-export-button')).get(0);
        this.deleteButton = element.all(by.css('.e2e-delete-button')).get(0);
        this.subMenuButton = element.all(by.css('.e2e-submenu-button')).get(0);
        this.switchToTableButton = element.all(by.css('.e2e-table-button')).get(0);
        this.switchToTileButton = element.all(by.css('.e2e-tile-button')).get(0);
        this.filterButton = element.all(by.css('.e2e-filter-button')).get(0);
        this.wizardButton = element.all(by.css('.e2e-wizard-button')).get(0);

        this.createButton = element.all(by.css('.e2e-add-button')).get(0);

        this.breadCrumbsList = this.breadCrumbs.all(by.css('.e2e-toolbar-breadcrum-item'));

    }
    switchToTable(){
        return this.switchToTableButton.click();
    }
    switchToTile(){
        return this.switchToTileButton.click();
    }
    subMenuClick(){
        return this.subMenuButton.click();
    }

    createClick(){
        return this.createButton.click();
    }

    getRootElement(){
        return this.breadCrumbsList.get(0);
    }

    getBreadCrumbsByName(elementName: string){
        return element(by.cssContainingText('.e2e-toolbar-breadcrum-item a',elementName));
    }
}