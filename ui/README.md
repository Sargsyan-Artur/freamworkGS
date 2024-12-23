Autotests: Automated UI testing for CORP WEB SPONSOR PAGES
This repository contains WebdriverIO tests for the CORP WEB SPONSOR PAGES UI

Running Tests
The following steps should get you set up for running tests locally on your machine:

Open up a terminal and navigate to the e2e directory of the repository.
Install project dependencies using the following command - npm install

Run the tests from the command line for different environments:
dev1 environment - npx cross-env LIFECYCLE=dev1 wdio ./src/configs/wdio.local.config.ts
qa1 environment - npx cross-env LIFECYCLE=qa1 wdio ./src/configs/wdio.local.config.ts
qa3 environment - npx cross-env LIFECYCLE=qa3 wdio ./src/configs/wdio.local.config.ts
uat environment - npx cross-env LIFECYCLE=uat wdio ./src/configs/wdio.local.config.ts

EPAM Report Portal
How to use:
In order to enable report portal, please,  set variable RP_ENABLED=true in .env file.
