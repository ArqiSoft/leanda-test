//test.spec.js
'use strict';

// Object.assign(global, {
//   waitUntilURLContains: string => {
//     let fn = () => {
//       return browser.driver.wait(() => {
//         return browser.driver.getCurrentUrl().then((url) => {
//           return url.includes(string);
//         });
//       }, 5000);
//     }

//     return fn.bind(null, string);
//   }
// });

describe('Protractor Login Test', function () {
  // beforeEach(function () {
  //   browser.get('https://osdr.dev.dataledger.io');
  // });


  fit('should open to the application homepage', function () {
    browser.get('https://osdr.dev.dataledger.io');
    //browser.waitForAngular();
    expect(element(by.css('.app-name')).getText()).toContain('OPEN SCIENCE');
  });

  // fit('should ignoreSynchronization = true', function () {
  //   browser.ignoreSynchronization = true;
  // })

  fit('should navigate to Login page', function () {
    var el = element.all(by.css('.navbar-nav li')).last();
    el.click().then(function () {
      browser.sleep(1000);
      expect(element(by.id('username')).isPresent()).toBeTruthy()
      console.log('I see username field')
    })
  })

  fit('should enter test credentials', function () {

    element(by.id('username')).sendKeys('test1')
    element(by.id('password')).sendKeys('qqq123')
    element(by.id('localLoginBtn')).click()
  })

  fit('should open Home page', function () {
    var el = element.all(by.css('.navbar-nav li')).get(2);
    expect(el.getText()).toBe('HELLO,TESTER1')
    browser.ignoreSynchronization = false;

  })

  // it('should turn of ignoreSynchronization', function () {
  //   browser.ignoreSynchronization = false;
  // })
  // fit('should navigate to Login page', function () {
  //   var el = element.all(by.css('.navbar-nav li')).last();
  //   el.click()
  //     .then(waitUntilURLContains('your-company.com/core/login?signin='))
  //     .then(function () {
  //       element(by.id('username')).sendKeys('test1');
  //       element(by.id('password')).sendKeys('qqq123');

  //       var btn = element.all(by.id('localLoginBtn'));
  //       btn.click()
  //         .then(waitUntilURLContains('osdr.dev.dataledger.io/'))
  //         .then(function () {
  //           console.log('logged in');
  //         })
  //         .then(waitUntilURLContains('identity.your-company.com/core/connect/authorize'))
  //         .then(function () {
  //           var allowBtn = element(by.buttonText('Yes, Allow'));
  //           allowBtn.click();
  //           console.log('confirmed');
  //         })
  //         .then(waitUntilURLContains('osdr.dev.dataledger.io/'))
  //         .then(function () {
  //           var userName = element(by.text('Hello, Tester 1'));
  //           if (userName) {
  //             console.log(userName);
  //           }
  //         });          
  //     });
  // })

  // xit('should enter valid credentials', function () {
  //   element(by.id('username')).sendKeys('test1');
  //   element(by.id('password')).sendKeys('qqq123');
  //   element.all(by.css('.form-group')).last().element(by.tagName('button')).click();
  //   browser.sleep(6000);
  // })

});