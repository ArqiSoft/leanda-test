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
      }, 7000);
    }

    return fn.bind(null, string);
  }
});

describe('Protractor Test', function () {
  beforeAll(function () {
    browser.get('https://osdr.uat.dataledger.io');
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

  it('should navigate to browser page', function () {
    var organizeLink = element.all(by.css('.navbar-nav li')).get(1);
    organizeLink.click()
    var dropPlace = element(By.css('.side-dropzone'))
    expect(dropPlace.getText()).toEqual('Drop your files here')
  })

  it('should check tiles number', function () {
    var tilesCount = element.all(by.css('.tile-title')).count();
    tilesCount.then(function (num) {
      console.log('tiles before:', num)
    })
  })
  it('should upload the file', function () {

    var path = require('path');
    var fileToUpload1 = '../../Data/DOC/Hexahedron_kk_kc_kk.docx';
    var absolutePath = path.resolve(__dirname, fileToUpload1);

    //var dropPlace = element(By.css('.side-dropzone'));
    var inputFile = element(By.css('input[type=file]'));

    inputFile.sendKeys(absolutePath).then(function () {
      browser.sleep(2000).then(function () {
        element.all(by.css('.tile-title')).count().then(function (num) {
          console.log('tiles after:', num)
        })
      })
    })
    //dropPlace.submit();


  })
})