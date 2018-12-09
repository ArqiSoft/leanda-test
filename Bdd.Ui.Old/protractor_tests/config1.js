// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['pr_login.js'],
  baseURL: 'http://localhost:8080/',
   useAllAngular2AppRoots: true,
  //rootElement: 'sds-app',
  framework: 'jasmine',
  capabilities: {
    'browserName': 'chrome'
  },
  allScriptsTimeout: 15000,

 onPrepare: function () {
   // implicit and page load timeouts
   browser.manage().timeouts().pageLoadTimeout(7000);
    browser.manage().timeouts().implicitlyWait(7000);

    //for non-angular page
    browser.ignoreSynchronization = true;

    //sign in before all tests

 }
};