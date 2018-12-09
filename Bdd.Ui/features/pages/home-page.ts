import {$, by, element, ElementFinder} from 'protractor';
/*
 Page Objects help in better re-usablitity and maintenance of element locators
 This file exports CalculatorPageObject class
 **/
export class HomePageObject {
    homeLink: ElementFinder;
    loginLink: ElementFinder;
    organizeLink: ElementFinder;

    dropDownUserProfileButton: ElementFinder;
    profileLink: ElementFinder;
    logoutLink: ElementFinder;

    constructor() {
        this.homeLink = element.all(by.css('.e2e-nav-bar-links')).get(0);
        this.loginLink = element.all(by.css('.e2e-login-item')).get(0);
        // this.organizeLink = element.all(by.css('.e2e-nav-bar-links')).get(1);
        this.organizeLink = element(by.cssContainingText('.e2e-nav-bar-links .nav-link', 'Organize'));

        this.dropDownUserProfileButton = element(by.css('.e2e-profile-dropdown'));
        this.profileLink = element(by.cssContainingText('.dropdown-menu li', 'Profile'));
        this.logoutLink = element(by.cssContainingText('.dropdown-menu li', 'Logout'));
    }

    goToLoginPage() {
        return this.loginLink.click();
    }

    goToOrganizePage() {
        return this.organizeLink.click();
    }
}