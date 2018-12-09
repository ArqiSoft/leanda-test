'use strict';

module.exports = {

    upperToolbar: {
        downloadBtn: element(by.css('.record-toolbar')).$('a[ngbtooltip="Download"]'),
        mappingBtn: element(by.css('.record-toolbar')).$('a[ngbtooltip="Mpping"]'),

    },

    fileProperty: {
        recordInfo: element(by.css('.record-info')),
        img: $('.ng-gallery'),
    },
    // userProperty:

    recordToolbar: {
        toolbar: element.all(by.css('.record-toolbar')).last(),
        records: element(by.css('.tile-view')),
        recordsGridBtn: element.all(by.css('.record-toolbar')).last().$('div[ngbtooltip="Display as grid"]'),
        recordsTileBtn: element.all(by.css('.record-toolbar')).last().$('div[ngbtooltip="Display as tile"]'),
        recordsDeleteBtn: element.all(by.css('.record-toolbar')).last().$('div[ngbtooltip="Delete records"]'),
        recordsExportBtn: element.all(by.css('.record-toolbar')).last().$('div[ngbtooltip="Export"]'),
        recordsSettingsBtn: element.all(by.css('.record-toolbar')).last().$('div[ngbtooltip="Setting properties preview"]'),
    },
    recordPreview: {
        columnCount: function () {
            return element.all(by.css('table thead tr td')).count()
        },
        recordNum: function (order) {
            return element.all(by.css('table tbody tr')).get(order)
        },
        recordSelect: function (order) {
            return element.all(by.css('table tbody tr')).get(order).click()
        },
    },
    propertiesSettings: {
        dialogBox: element(by.css('.modal-dialog')),
        applyBtn: element(by.css('.modal-footer')).$('button[ng-reflect-ngb-tooltip="Apply"]'),
        selectAll: function () {
            return element(by.css('.modal-body')).$('.btn-group').$('li[ngbtooltip="Select"]').click().then(function () {
                return element(by.css('.modal-footer')).$('button[ng-reflect-ngb-tooltip="Apply"]').click()
            })
        },
        unselectAll: function () {
            return element(by.css('.modal-body')).$('.btn-group').$('li[ngbtooltip="Unselect"]').click().then(function () {
                return element(by.css('.modal-footer')).$('button[ng-reflect-ngb-tooltip="Apply"]').click()
            })
        },
        unselectAllChb: element(by.css('.modal-body')).$('.btn-group').$('li[ngbtooltip="Unselect"]'),
        intrinsicPropertiesChb: element(by.css('.modal-body')).$('.category').$('input[type="checkbox"]'),
        intrinsicPropertiesToggle: element(by.css('.fa-caret-right')),
        propertyChb: function (text) {
            var el = element.all(by.css('.property'))

            el.filter(function (elem, index) {
                return elem.getText().then(function (txt) {
                    return txt === text;
                });
            }).first().element(by.tagName('input')).click()
        },

        propertyIsChecked: function (arr) {
            return arr.getAttribute('ng-reflect-checked').toEqual('true')
        }

    },
    recordViewType: function () {
        var recordBrowser = element(by.css('.tile-view')).element(by.tagName('sds-browser-item'))
        var viewType = recordBrowser.getAttribute('ng-reflect-view-type')
        //tile view : view-type: '0';
        //grid view : view-type: '2';
        return viewType
    },

    csvMapping: {
        section: element(by.css('.mapping-csv-body')),
        // toolbar:
        fileFieldDropdown: element.all(by.css('.mapping-csv-body-content .col-sm-4')).first().$('.dropdown'),
        mappingDropdown: element.all(by.css('.mapping-csv-body-content .col-sm-4')).last().$('.dropdown'),

        selectFileField: function (fieldName) {
            var field = this.fileFieldDropdown.element(by.cssContainingText('.dropdown-item', fieldName))
            return field.click()
        },
        selectMappingField: function (fieldName) {
            var field = this.mappingDropdown.element(by.cssContainingText('.dropdown-item', fieldName))
            return field.click()
        },

        countColumns: function () {
            return $('.csv-record-mapping table thead tr').all(by.tagName('th')).count()
        },
        getColumnName: function (colOrder) {
            return $('.csv-record-mapping table thead tr').all(by.tagName('th')).get(colOrder).getText()
        },
        processBtn: element(by.css('.mapping-csv-body-buttons')).$('button[ngbtooltip="Start processing"]'),
        processingIcon: element(by.css('.processing'))

    },

}