/*jslint node: true*/
import { browser } from 'protractor';
import * as fs from 'fs';
/*
 Hooks help us follow DRY principle, all the utility functions go here
 BeforeScenario, Features and screenshot hooks example provided here
 **/

const { After, Status } = require('cucumber');

After((testCase) => {
    if (testCase.result.status === Status.FAILED) {
        browser.driver.takeScreenshot().then(function (data) {
            const base64Data = data.replace(/^data:image\/png;base64,/, '');
            fs.writeFile('exception.png', base64Data, 'base64', function (err) {
                if (err) { console.log(err); }
            });
        });
    }
    return Promise.resolve();
});

// After((testCase) => {
//     if (testCase.result.status === Status.FAILED) {
//         // Log the spec to the console for protractor-flake to be able to rerun the failed specs
//         console.log('Specs:', testCase.sourceLocation.uri);
//     }

//     return Promise.resolve();
// });
