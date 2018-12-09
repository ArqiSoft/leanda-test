'use strict';

module.exports = {
    menuLinks: {
        loginLink: element.all(by.css('.navbar-nav li')).get(2),
        homeLink: element.all(by.css('.navbar-nav li')).get(0),
        organizeLink: element.all(by.css('.navbar-nav li')).get(1),
        logoutLink: element.all(by.css('.navbar-nav li')).get(3)
    },

    capabilities: {
        organizePanel: element(by.id('service')).element(by.css('a[title="Organize"]')),
        sharePanel: element(by.id('service')).element(by.id('Share ')),
        annotatePanel: element(by.id('service')).element(by.id('Annotate'))
    },

    homeText: element(by.css('.col-md-7')).element(by.css('.darker'))
}