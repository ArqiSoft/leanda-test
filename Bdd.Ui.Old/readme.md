# OSDR Test #

## Setup ##

1. Install:

[Node](https://nodejs.org/en/)

[Java](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

2. Run 

```
npm install -g protractor cucumber
npm i
webdriver-manager update
```

## Run tests ##

```
webdriver-manager start
```

and, in another terminal window, if run only @test features/scenarious:
         - "@smoke" test-suite will run features:  001, 002, 003.1, 004.1, 004.2
         - "@test001" will run only 001 feature
```
protractor protractor.conf.js  --cucumberOpts.tags="@smoke"
```

## Debug tests in VSCode ##

1. Click on the Debugging icon in the View Bar on the side of VS Code.
2. Click on the Configure gear icon on the Debug view top bar and choose nodejs environment.
3. It will generate a launch.json file under your workspace's .vscode folder.
4. Setup your launch.json file by configuring below two commands:
        "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
        "args": ["${workspaceRoot}/protractorConfig.js"],
5. Save your launch.json, put some breakpoints and start debugging