// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['pr_file_upload.js'],
  // baseURL: 'http://localhost:8080/', 
  useAllAngular2AppRoots: true,
  framework: 'jasmine',

  onPrepare: function () {
    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(40000);
    browser.manage().timeouts().implicitlyWait(25000);

    // for non-angular page
   browser.ignoreSynchronization = true;

    // sign in before all tests

  }
};