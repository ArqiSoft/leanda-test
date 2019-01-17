# Leanda Test Setup Guide #

This project implements e2e tests for Leanda.

## Features ##

* No typings.json or typings folder, they have been replaced by better **'@types'** modules in package.json
* ts-node(typescript execution environment for node) in cucumberOpts. 
* All scripts written with Typescript2.0 & Cucumber2.3.1
* Neat folder structures with transpiled js files in separate output folder.
* Page Object design pattern implementation
* Extensive hooks implemented for BeforeFeature, AfterScenarios etc.
* Screenshots on failure feature scenarios

## To Get Started ##

### Pre-requisites ###

* [NodeJS](https://nodejs.org/en/download/)
* [Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
* Chrome or Firefox browsers.
* Text Editor (Optional). Sublime/Visual Studio Code/Brackets.

### Setup Scripts ###

Use npm to install Protractor globally with:

```terminal
npm install -g protractor cucumber
```

This will install three command line tools **protractor, webdriver-manager and cucumber**

The **webdriver-manager** is a helper tool to easily get an instance of a Selenium Server running. Use it to download the necessary binaries with:

```terminal
webdriver-manager update
```

Run following command from terminal/command prompt

```terminal
npm install
```

All the dependencies from package.json and ambient typings would be installed in node_modules folder.

## Setup & Run ##

When testing locally, follow Leanda readme.md how to run the application locally.

Now start up a server:

_It does not need if you set ut directly access to webdriver (see **config file**)_

```terminal
webdriver-manager start
```

### Run Scripts ###

This script will start all features with tag @start-all-tests

```terminal
npm run test-all-features
```

### Also you can run test scripts for different environments ###

```terminal
# dev
npm run all-features-dev

# test
npm run all-features-test

# uat
npm run all-features-uat
```

You can find details about this command in package.json in section "scripts"

The above command should create an output folder named 'tmp' and transpile the .ts files.

It launches the Chrom/Firefox Browser and run the scripts

### Run Specified Script ###

If you want to execute specified feature you should first transpile the .ts files by command

```terminal
npm run tsc
```

than execute command with @tag that you want. For example: to test machine-learning you should run 

```terminal
protractor tmp/config/config.js --cucumberOpts.tags=@machine-learning-create-model
```

### Run Smoke Test ###

If you want to run only Smoke Test you should execute "smoke" script.

```terminal
npm run smoke
```

## Dockerization ##

to run tests in docker just run script

```terminal
./e2e-in-docker.sh
```

or for windows

```terminal
./e2e-in-docker.ps1
```

*Credit: <https://github.com/hortonworks/docker-e2e-cloud>*

*Credit: <https://hub.docker.com/r/hortonworks/cloudbreak-web-e2e/>*

## Additional links ##

* Cucumber wiki [https://github.com/cucumber/cucumber/wiki/A-Table-Of-Content](https://github.com/cucumber/cucumber/wiki/A-Table-Of-Content)
* Protractor Tutorial [http://www.protractortest.org/#/tutorial](http://www.protractortest.org/#/tutorial)
* cucumber-tsflow [https://github.com/timjroberts/cucumber-js-tsflow](https://github.com/timjroberts/cucumber-js-tsflow)
* Cucumber.js [https://github.com/cucumber/cucumber-js](https://github.com/cucumber/cucumber-js)
* protractor-cookbook [https://github.com/angular/protractor-cookbook](https://github.com/angular/protractor-cookbook)
* Protractor Cucumber Framework [https://github.com/protractor-cucumber-framework/protractor-cucumber-framework](https://github.com/protractor-cucumber-framework/protractor-cucumber-framework)
