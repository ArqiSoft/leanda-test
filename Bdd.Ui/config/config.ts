import { environment } from './environment';
import { browser, Config } from 'protractor';

/*
 The config folder includes all the configuration files
 This example config file displays the basic protractor-cucumber framework configuration
 ts-node compiler is needed for cucumberjs
 tags option for specific scenarios added
 **/
const chromeDriverPath = process.platform === 'win32' ?
    '../../node_modules/chromedriver/lib/chromedriver/chromedriver.exe' : '../../node_modules/chromedriver/bin/chromedriver';

export let config: Config = {
    seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
    baseUrl: environment.baseUrl,
    capabilities: environment.capabilities,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    specs: [
        '../../features/*.feature'
    ],
    // This utility function helps prepare our scripts with required actions like browser maximize
    beforeLaunch: () => {
        require('ts-node').register({
            project: 'tsconfig.json'
        });
    },
    onPrepare: () => {
        const width = 1920;
        const height = 1080;
        browser.manage().window().setSize(width, height);
        browser.manage().window().setPosition(0, 0);
        // browser.driver.manage().window().maximize();
    },
    // These are various cucumber compiler options
    cucumberOpts: {
        format: ['node_modules/cucumber-pretty', 'json:tmp/report.json', 'rerun:tmp/@rerun.txt'],
        require: [
            '../../features/step_definitions/*.ts',
            '../../support/*.ts'
        ],
        // 'fail-fast': true,
        'tags': false,
        'strict': true
   },
    directConnect: true,
    chromeDriver: chromeDriverPath,
    chromeOnly: true,
    // useAllAngular2AppRoots: true,
    // getPageTimeout: 60000,
    allScriptsTimeout: 60 * 1000,
    ignoreUncaughtExceptions: false
};
