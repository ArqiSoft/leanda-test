# NciAdultMatchUi

[![Build Status](https://travis-ci.com/BIAD/nci-adult-match-ui.svg?token=wq7sqGRbqBdZtX3VyP6n&branch=master)](https://travis-ci.com/BIAD/nci-adult-match-ui)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/022ebe3314584385a5ba25029096438a)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BIAD/nci-adult-match-ui&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/022ebe3314584385a5ba25029096438a)](https://www.codacy.com?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=BIAD/nci-adult-match-ui&amp;utm_campaign=Badge_Coverage)

## Table of Contents

- [_NOTE_: While working in `vnext` branch](#_note_-while-working-in-vnext-branch)
- [Run UI](#run-ui)
- [Start APIs locally](#start-apis-locally)
  - [Default configuratrion for Adult MATCH docker-compose](#default-configuratrion-for-adult-match-docker-compose)
  - [Several Adult MATCH environments on a single machine](#several-adult-match-environments-on-a-single-machine)
    - [1. Run the following commands that replace the environment values from `.env` file with your own](#1-run-the-following-commands-that-replace-the-environment-values-from-env-file-with-your-own)
    - [2. Run customized `docker-compose` command for the non-default environment](#2-run-customized-docker-compose-command-for-the-non-default-environment)
    - [3. To return to the default configuration](#3-to-return-to-the-default-configuration)
- [Code scaffolding](#code-scaffolding)
- [Build](#build)
- [Running unit tests](#running-unit-tests)
- [Deploy](#deploy)
- [Further help](#further-help)
- [Troubleshooting](#troubleshooting)

## Run UI

Make sure you have Node.js v10 or later installed. Check version with `node --version`. Download link [https://nodejs.org/en/](https://nodejs.org/en/).

Run `npm install npm -g` to update npm to latest.

Run `npm install -g @angular/cli` to install Angular CLI.

Run `npm install -g jasmine` to install Jasmine for unit testing.

Run `rm -rf node_modules/` to remove any previously installed modules.

Run `npm i` to install modules.

Export UI's environment variables (or add it to your profile to make it permanent):

```terminal
export CLIENT_ID=[your-client-id-value]
export AUTH_DOMAIN=[your-auth-domain-value]
export LOGGLY_KEY=[your-loggly-key-value]
export SENTRY_IO_URL=[your-sentry-io-url-value]
```

Run `npm run hmr` to start the dev server with hot module reloading. Or `npm start` to start the dev server without HMR.

Navigate to [http://localhost:5555](http://localhost:5555). The app will automatically reload if you change any of the source files.

*NOTE: Running `npm run hmr` or `npm start` will cause `src/environments/environment.ts` and `src/environments/environment.hmr.ts` to be untracked by git. If there is a new configuration in git that needs to be pulled, run `npm run track-configs` before pulling/merging. The configuration files are being owerwriten by `set-env.ts` and `set-env-hmr.ts` respectively.*

### Updating environment configuration

When you need to add or modify a value for an `environmrent.*.ts` file please change `set-env.ts` and `set-env-hmr.ts` instead of modifying the `environmrent.*.ts` files.

## Start APIs locally

### Generate security values

Generate local Okta-AWS keys:

```terminal
okta-awscli --force --profile default
```

For more info see [User Guide for AWS Eco-System Access using Okta](https://docs.google.com/document/d/122X5fA0FrNYeYxIAPth3T7BebmgneNR_nRUPL2MUcic/edit).

### Default configuratrion for Adult MATCH docker-compose

*NOTE: You need to have access to [FNLCR](https://hub.docker.com/u/fnlcr/) private docker repository. Please contact systems team if you need the access.*

Login into docker using your docker account (needed only once)

```terminal
docker login
```

Make sure you have the following environment variables:

    AUTH0_CLIENT_ID
    AUTH0_CLIENT_SECRET
    AUTH0_DATABASE
    AUTH0_DOMAIN
    AUTH0_MANAGEMENT_ID
    AUTH0_MANAGEMENT_SECRET
    AUTH0_USERNAME
    AWS_ACCESS_KEY_ID
    AWS_REGION
    AWS_SECRET_ACCESS_KEY
    AWS_SMTP_PASSWORD
    LOGGLY_KEY
    NEWRELIC_APP_ID
    SENTRY_IO_URL
    SLACK_TOKEN

To run the front-end and all back-end services:

```terminal
docker-compose up
```

Wait for all of the services to start, then open your browser at [http://localhost:5555](http://localhost:5555)

To run only some of the services (for example only the `ui` and `patient-api`, with their dependencies)

*NOTE: Each time you run `docker-compose down` the data volumes for the docker containers are removed and you'll have to restore the database backups again.*

For front-end developers running the front-end code in node, run everything __but__ the front-end:

```terminal
docker-compose up patient-api treatment-arm-api archival-specimen-api message-api mock-ecog
```

Pull fresh APIs and reset the seed data:

```terminal
docker-compose pull patient-api treatment-arm-api archival-specimen-api message-api mock-ecog mongo ion-reporters-api && docker-compose down && docker-compose up patient-api archival-specimen-api treatment-arm-api message-api mock-ecog ion-reporters-api assignment-api
```

To run docker-compose system with __empty__ datastores:

```terminal
docker-compose down && docker-compose -f docker-compose.yml -f docker-compose.no-data.yml up patient-api treatment-arm-api archival-specimen-api message-api mock-ecog ion-reporters-api assignment-api
```

Full list of services included in `docker-compose.yml`

- `aliquots-api`
- `archival-specimen-api`
- `assignment-api`
- `dynamo`
- `ion-reporters-api`
- `ir-processor-api`
- `message-api`
- `mock-ecog`
- `mongo`
- `patient-api`
- `rules-api`
- `sample-controls-api`
- `treatment-arm-api`

*NOTE: To run `ui` from docker-compose, you'll have to up it in a new terminal window (seperate from the apis).*

To pull the latest images:

```terminal
docker-compose pull
```

To rebuild the latest UI docker image:

```terminal
docker-compose build
```

### Several Adult MATCH environments on a single machine

#### 1. Run the following commands that replace the environment values from `.env` file with your own

You can set your own values, but the values below will work.

Please note the port number can't be greater than `65535`

```terminal
# Append '1' to default ports from .env file
export ADULT_MATCH_ENVIRONMENT=bdd
export ADULT_MATCH_UI_PORT=15555
export ADULT_MATCH_PATIENT_API_PORT=15000
export ADULT_MATCH_TREATMENT_ARM_API_PORT=15010
export ADULT_MATCH_ARCHIVAL_SPECIMEN_API_PORT=15030
export ADULT_MATCH_ION_REPORTERS_API_PORT=13001
export ADULT_MATCH_SAMPLE_CONTROLS_API_PORT=13002
export ADULT_MATCH_ALIQUOTS_API_PORT=13003
export ADULT_MATCH_IR_PROCESSOR_API_PORT=13004
export ADULT_MATCH_MESSAGE_API_PORT=10251 # can't appent '1' in the front, so just 10250+1!
export ADULT_MATCH_MESSAGE_API_PORT2=18080
export ADULT_MATCH_MOCK_ECOG_PORT=13000
export ADULT_MATCH_MONGO_PORT=27019 # can't appent '1' in the front, so just 27018+1!
export ADULT_MATCH_DYNAMO_PORT=18001
export ADULT_MATCH_NETWORK_NAME=adult-match
# Check new values
printenv | grep ADULT_MATCH_
```

#### 2. Run customized `docker-compose` command for the non-default environment

```terminal
docker-compose --project-name=adult-match-bdd up patient-api treatment-arm-api archival-specimen-api message-api mock-ecog ion-reporters-api
```

#### 3. To return to the default configuration

Close the current terminal window, open a new one and run the command without `--project-name` option

or run the following and then and run the command without `--project-name` option

```terminal
# Remove all vars so that the .env file is used
unset ADULT_MATCH_ENVIRONMENT
unset ADULT_MATCH_UI_PORT
unset ADULT_MATCH_PATIENT_API_PORT
unset ADULT_MATCH_TREATMENT_ARM_API_PORT
unset ADULT_MATCH_ARCHIVAL_SPECIMEN_API_PORT
unset ADULT_MATCH_ION_REPORTERS_API_PORT
unset ADULT_MATCH_SAMPLE_CONTROLS_API_PORT
unset ADULT_MATCH_ALIQUOTS_API_PORT
unset ADULT_MATCH_IR_PROCESSOR_API_PORT
unset ADULT_MATCH_MESSAGE_API_PORT
unset ADULT_MATCH_MOCK_ECOG_PORT
unset ADULT_MATCH_MONGO_PORT
unset ADULT_MATCH_DYNAMO_PORT
unset ADULT_MATCH_NETWORK_NAME
# Check the values
printenv | grep ADULT_MATCH_
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. Read [Angular CLI](https://github.com/angular/angular-cli/wiki) documentation for more.

## Build

Run `ng build` to build the project in development mode. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `ng build --prod` to build the project in production mode. This results in much more strict validation of the code. It will also minimize, uglify and concatenate the resources.

## Running unit tests

Run `ng test --code-coverage` to execute the unit tests via [Karma](https://karma-runner.github.io) with continuous code coverage.

Open `./coverage/index.html` in a browser to see the code coverage report.

## Deploy

The application is deployed as a dockerized "built" Angular application.

At run-time, at the Docker container startup and before NGINX starts, the `tools/setenv.sh` is executed to replace the values inside `main.*.bundle.js` and `scripts.*.bundle.js` with the environment variable values.

The list of environment variables needed for the deployed container to run:

```terminal
ALIQUOT_API
AUTH_AUDIENCES
AUTH_DOMAIN
CLIENT_ID
ION_REPORTERS_API
LOGGLY_KEY
LOGGLY_TAG
MESSAGE_API
NEWRELIC_APP_ID
PATIENT_API
SAMPLE_CONTROLS_API
SENTRY_IO_ENVIRONMENT
SENTRY_IO_URL
TREATMENT_ARM_API
```

The above values are taken from auto-generated NewRelic script for [copy-paste deployment](https://docs.newrelic.com/docs/browser/single-page-app-monitoring/get-started/install-single-page-app-monitoring-new-relic-browser).

You can find the Application ID value by searching the string `applicationID:` inside the NewRelic auto-generated `<script>window.NREUM||(NREUM = {} . . . </script>` text.

Values for `SENTRY_IO_ENVIRONMENT`:

- DevInt: `inttest`
- UAT: `uat`
- Production: `prod`
- Performance: `perf`

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Troubleshooting

```terminal
### Mongo connection refused  (ex: mongo:27017: [Errno 111] Connection refused)

### Creating network "nciadultmatchui_adult-match" with the default driver
   ERROR: readlink /var/lib/docker/overlay2: invalid argument
```

Following solutions are tested.  One solution works. (Good Luck :-))

1. `docker-compose down`
   `docker system prune`
   `docker-compose up ...`

2. `docker-compose down`
   Restart Docker - go to _Reset_ menu, select _Restart_
   `docker-compose up ...`

3. `docker-compose down`
   Remove data - go to _Reset_ menu, select _Remove all data_
   `docker-compose up ...`

4. `docker-compose down`
   Restart Docker - go to _Reset_ menu, select _Remove all data_
   Docker Engine hard RESET (Go to Docker Engine Preferences) select --> 'Reset to factory defaults'
   In question when Docker restarts: 'copy default configuration to new Docker' -->  SKIP
   `docker login` <-- Log in the terminal to docker hub
   `docker-compose up ...`

5. In case when in Terminal `docker-compose pull` always fails & `docker login` returns an error -- > `Error saving credentials: error storing credentials - err: exit status 1, out: The user name or passphrase you entered is not correct.`

    ```terminal
    docker-compose down
    ```

    Restart Docker: go to _Reset_ menu, select _Restart_

    ```terminal
    which docker-credential-osxkeychain              # Find Docker credentials
    rm /usr/local/bin/docker-credential-osxkeychain  # Delete Docker credentials
    docker login                                     # Log in the terminal to docker hub
    rm -rf node_modules                              # Delete node modules
    npm i                                            # Install node modules
    docker-compose up ...                            # Use your favorid docker-compose up command
    ```
