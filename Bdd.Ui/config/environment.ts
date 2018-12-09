import { resolve } from 'path';

const pathD = resolve('./downloads/');

export let environment = {
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': [
                '--no-sandbox',
                '--disable-web-security',
                '--disable-dev-shm-usage'
            ],
            prefs: {
                'credentials_enable_service': false,
                'download': {
                    'prompt_for_download': false,
                    'directory_upgrade': true,
                    'default_directory': pathD
                },
                'profile': {
                    'password_manager_enabled': false
                }
            }
        },
        // shardTestFiles: true,
        // maxInstances: 4
    },

    // Protractor interactive tests
    interactiveTestPort: 6969,

    // A base URL for your application under test.
    baseUrl: 'https://osdr.dev.dataledger.io'
    // baseUrl: 'http://localhost:5555'
};
