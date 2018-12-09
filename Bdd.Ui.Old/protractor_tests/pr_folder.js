//test.spec.js
// var homePage = require('features/pages/homePage.js');
// var loginPage = require('features/pages/loginPage.js');
// var browserView = require('features/pages/browserView.js');

'use strict';


Object.assign(global, {
  waitUntilURLContains: string => {
    let fn = () => {
      return browser.driver.wait(() => {
        return browser.driver.getCurrentUrl().then((url) => {
          return url.includes(string);
        });
      }, 5000);
    }

    return fn.bind(null, string);
  }
});

describe('Protractor Test', function () {
  beforeAll(function () {
    browser.get('https://osdr.dev.dataledger.io');
  });

  it('should navigate to the application homepage', function () {
    expect(element(by.css('.app-name')).getText()).toContain('OPEN SCIENCE');
  });

  it('should navigate to Login page', function () {
    var el = element.all(by.css('.navbar-nav li')).last();
    el.click()
      .then(waitUntilURLContains('your-company.com/core/login?signin='))
      .then(function () {
        element(by.id('username')).sendKeys('test1');
        element(by.id('password')).sendKeys('qqq123');

        var btn = element.all(by.id('localLoginBtn'));
        btn.click()
          .then(waitUntilURLContains('osdr.dev.dataledger.io/'))
          .then(function () {
            console.log('logged in');
          })
          // .then(waitUntilURLContains('identity.your-company.com/core/connect/authorize'))
          // .then(function () {
          //   var allowBtn = element(by.buttonText('Yes, Allow'));
          //   allowBtn.click();
          //   console.log('confirmed');
          // })
          .then(waitUntilURLContains('osdr.dev.dataledger.io/'))
          .then(function () {
            // var userName = element(by.text('Hello, Tester 1'));
            // if (userName) {
            //   console.log(userName);
            // }
            expect(element.all(by.css('.navbar-nav li')).get(2).getText()).toBe('HELLO, TESTER 1')

          });
      });
  })

  it('should add a new folder', function () {
    var foldername = 'TEST_fq'
    browser.sleep(1000);

    element(by.id('service')).element(by.css('.service_block')).click();
    browser.sleep(1000);
    ///
    element.all(by.css('.tile-title')).count().then(function (count) {
      console.log('at start:', count);
    });
    var name = element.all(by.css('.tile-title')).map(function (elm) {
      elm.getText().then(function (text) {
        console.log(text)
      });
    });
    ///
    element(by.css('.view-toolbar')).$('div[ngbtooltip="Create new folder"]').click();
    browser.sleep(1000);

    function temp(Btn) {
      Btn.isEnabled().then(function (result) {
        return result
      })
    }

    element(by.css('.modal-content')).element(by.tagName('input')).sendKeys(foldername).then(
      function () {
        createBtn.isEnabled().then(function (result) {
          console.log(result)
          if (result) {
            createBtn.click()
          } else {
            element(by.css('.modal-content')).element(by.tagName('input')).sendKeys('_' + Math.random());
            createBtn.click()
          }
        });
      }
    );
    browser.sleep(1000);

    var createBtn = element(by.css('.modal-content')).element(by.buttonText('Create'));



    // if () {
    //   createBtn.click()
    // } else {
    //   element(by.css('.modal-content')).element(by.tagName('input')).sendKeys('_' + 'temp');
    //   createBtn.click()
    // }
    browser.sleep(1000);

    //  var el = element(by.cssContainingText('h3', foldername))
    //expect(el).toBeDefined();

    //checking:
    element.all(by.css('.tile-title')).count().then(function (count) {
      console.log('folder added', count);
    });
    var name = element.all(by.css('.tile-title')).map(function (elm) {
      return elm.getText()
      elm.getText().then(function () {
        console.log(text)
      })
    });

    expect(name).toContain(foldername);
    // 
  })

it('should delete a folder',function(){
  
})
})