'use strict';

module.exports = {

    tileNames: [],

    toolbar: {
        addFolder: element(by.css('.view-toolbar')).$('div[ngbtooltip="Create new folder"]'),
        deleteFolder: element(by.css('.view-toolbar')).$('div[ngbtooltip="Delete selected"]'),
        renameFolder: element(by.css('.view-toolbar')).$('div[ngbtooltip="Rename selected"]'),
        moveFolder: element(by.css('.view-toolbar')).$('div[ngbtooltip="Move selected"]'),
        download: element(by.css('.view-toolbar')).$('div[ngbtooltip="Download selected"]'),
        tilesView: element(by.css('.view-navbar')).$('a[ngbtooltip="Display as tiles"]'),
        gridView: element(by.css('.view-navbar')).$('a[ngbtooltip="Display as grid"]')
    },

    dialogbox: {
        dialogWindow: element(by.css('.modal-dialog')),
        foldernameInput: element(by.css('.modal-content')).element(by.tagName('input')),
        createBtn: element(by.css('.modal-content')).element(by.buttonText('Create')),
        deleteBtn: element(by.css('.modal-content')).element(by.buttonText('Delete')),
        moveBtn: $('.move-button'),
        moveNavigationBack: $('.back-button'),
        // moveNavigationTitle: element(by.css('.move-title')).getText(),
        moveTo: function (arg) {
            return element(by.cssContainingText('.move-item', arg))
        }

    },

    breadcrumbs: {
        draftsDir: element.all(by.css('.breadcrumbs li')).first(),
        openFolder: element.all(by.css('.breadcrumbs li')).last(),
        openDir: function (dir) {
            return element(by.css('.breadcrumbs')).element(by.cssContainingText('li', dir))
        },

    },

    tilesNameList: function () {
        var tiles = element.all(by.css('.tile-title'));
        var tileNames = [];
        return tiles.map(function (element, index) {
            element.getText().then(function (text) {
                tileNames.push(text);
                //console.log(text)
            });
        }).then(function () {
            return tileNames;
        });
    },

    filesNameList: function () {
        var tiles = element.all(by.tagName('sds-tile')).all(by.css('.tile-title'));
        var tileNames = [];
        return tiles.map(function (element, index) {
            element.getText().then(function (text) {
                tileNames.push(text);
                //console.log(text)
            });
        }).then(function () {
            return tileNames;
        });
    },
    dropZone: $('.side-dropzone'),

    getTiles: function () {
        return element.all(by.css('.tile-title'));
    },

    scrollUp: function () {
        browser.driver.executeScript('window.scrollTo(0,0)');
    },

    tileByName: function (tileName) {
        return element(by.cssContainingText('h3', tileName));
    },

    clickOutside: function () {
        var el = $('.tile-view');
        el.click();
        browser.driver.sleep(1000);
    },

    inputFile: element(By.css('input[type=file]')),


}