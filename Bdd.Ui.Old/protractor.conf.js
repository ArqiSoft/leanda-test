// conf.js
exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  getPageTimeout: 60000,
  allScriptsTimeout: 60000,
  framework: 'custom',
  // path relative to the current config file
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    //  'browserName': 'phantomjs',
    // //'phantomjs.binary.path': require('phantomjs-prebuilt').path,
    //'phantomjs.binary.path': '/Users/alesiatomuts/dev/sds/osdr.test/Source/phantomjs-2.1.1-macosx/bin/phantomjs',
    //'phantomjs.ghostdriver.cli.args': ['--loglevel=DEBUG']

    'chromeOptions': {
        // Get rid of --ignore-certificate yellow warning
   //     args: ['--no-sandbox', '--test-type=browser'],
        // Set download path and avoid prompting for download even though
        // this is already the default on Chrome but for completeness
        prefs: {
            'download': {
                'prompt_for_download': false,
                'default_directory': 'downloads',
            }
        }
    }
  },

  // Spec patterns are relative to this directory.
  specs: [
    // 'features/login.feature',
    'features/*.feature'
  ],

  baseUrl: 'https://osdr.uat.dataledger.io',
  useAllAngular2AppRoots: true,

  onPrepare: function () {
    // implicit and page load timeouts
    browser.manage().timeouts().pageLoadTimeout(10000);
    browser.manage().timeouts().implicitlyWait(10000);

    // for non-angular page
    browser.ignoreSynchronization = true;
  },

  cucumberOpts: {
    require: [
      'features/step_definitions/*.js'
    ],

    tags: false,
    format: 'pretty',
    profile: false,
    'no-source': true,
  }
};