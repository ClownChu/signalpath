# SignalPath - CucumberJS with Selenium WebDriver
## JavaScript + Node.js Version

Sample project to execute `Behavior-driven/Gherkin style` test cases for test automation, written following the [Chain-of-responsibility pattern](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern) using `selenium-webdriver` with `cucumberjs`.

## Table of Content

- [What's included](#whats-included)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Build and run](#build-and-run)
    - [Cloning and getting repository ready](#cloning-and-getting-repository-ready)
    - [Running features in headless mode](#running-features-in-headless-mode)
    - [Running features with custom WebDriver](#running-features-with-custom-webdriver)
    - [Running features](#running-features)
- [Available yarn scripts](#available-yarn-scripts)
- [File structure](#file-structure)
- [Related Projects](#related-projects)
- [License](#license)


## What's included

- Uses [Angular TodoMVC Web App](https://todomvc.com/examples/angular2/) to demo smoke (`@smoke`) and regression (`@regression`) tests.
  - Sample `Gherkin style` [Features, Backgrounds, Scenarios, Data tables](/features).
  - Sample [Steps definitions](/features/steps).
  - Sample [Handlers](/handlers).
  - Sample [Helpers](/handlers/helpers) with browser automation using [Selenium WebDriver](https://github.com/SeleniumHQ/selenium/tree/trunk/javascript/node/selenium-webdriver).
- Provides [Cucumber Report](https://reports.cucumber.io/) with detailed analysis on the test results.
- Provides [Screenshots](/screenshots) of the browser window after each scenario execution for post run analysis.
- Windows script to start run in [Headless mode](https://en.wikipedia.org/wiki/Headless_browser), and using custom [WebDrivers](https://www.w3.org/TR/webdriver2/).
- [Custom WebDriver](/webdrivers) for latest [Google Chrome (v96)](/webdrivers/chromedriver) and [Microsoft Edge (v95)](/webdrivers/msedgedriver) versions.
- Written as close as possible to [Chain-of-responsibility pattern](https://en.wikipedia.org/wiki/Chain-of-responsibility_pattern).
- Uses [`eslint`](https://eslint.org/) with recommended rules to enforce consistent code style.
- Uses [`yarn`](https://yarnpkg.com/en/) scripts for common operations.

## Quick Start

Getting started with this project is easy, a few steps and you should be able to start executing the sample features.

### Prerequisites

You'll need the following tools:

- [Git](https://git-scm.com/downloads)
- [NodeJS](https://nodejs.org/en/download/), x64, version `>=10.15`
- [Yarn](https://yarnpkg.com/lang/en/docs/install/), version `>=1.17`
- [Google Chrome](https://www.google.com/chrome/), version `>=76`
- [Microsoft Edge](https://www.microsoft.com/en-us/edge), version `>=79`
> `WebDriver` can be modified to execute tests in different `Google Chrome` or `Microsoft Edge` versions.

### Build and run in Windows

First you will need to clone the project's repository using `Git`, then simply install the `Node.js` packages using `yarn`, and after that, execute the features using `StartTestRun.bat` (Windows only) or `yarn`.

#### Cloning and getting repository ready
- Clone the repository locally:
```bash
git clone https://github.com/clownchu/signalpath-cucumber ./signalpath-cucumber
cd signalpath-cucumber
```
- Install all the `Node.js` dependencies using `yarn`:
```bash
yarn install
```

#### Running features in Headless Mode
- Set environment variable `BROWSER_EXECUTION_MODE=headless`
##### OR
- (Windows Only) Start the batch script:
```bash
StartTestRun [tag+] headless
```

#### Running features with custom WebDriver
- Copy custom `WebDriver` into [webdrivers](/webdrivers) folder.
  - `Google Chrome` WebDriver must be named `chromedriver.exe` and copied into `/webdrivers/chromedriver/`.
  - `Microsoft Edge` WebDriver must be named `msedgedriver.exe` and copied into `/webdrivers/msedgedriver/`.
- Set environment `PATH` to each `WebDriver` in [webdrivers](/webdrivers) folder.
##### OR
- (Windows Only) Start the batch script:
```bash
StartTestRun [tag+] [browsemode* (default:)]
```
> If any driver exists in the [webdrivers](/webdrivers) folder, the script will automatically set the environment `PATH` to the custom driver folder. If no driver is copied into the folders, the `WebDriver` used by the node library `chromedriver` and `msedgedriver` will be used instead.

#### Running features
- Start the features execution:
```bash
yarn start:[tag+]
```
##### OR
- (Windows Only) Start the batch script:
```bash
StartTestRun [tag+] [browsemode* (default:)]
```
> Valid `tags`: `smoke`, `regression`

## Available yarn scripts

- `install` - install all project dependencies only.
- `start:smoke` - run only the feature's backgrounds, scenarios, data tables with `@smoke` tag.
- `start:regression` - run only the feature's backgrounds, scenarios, data tables with `@regression` tag.
- `lint` - check for code violations.

## File structure
```sh
signalpath-cucumber
├── features/                                # Gherkin style features and scenarios
│   ├── steps/                               # Step definition scripts
│   │   └── *.js                             # Sample steps to interact with "Angular TodoMVC Web App"
│   └── *.feature                            # Sample features and scenarios to execute
├── handlers/                                # Contains all the handlers to assist on the features execution
│   ├── helpers/                             # Contains all helpers that assists the handlers on the features execution
│   │   └── *.js                             # Sample helpers for the browser using Selenium WebDriver
│   └── *.js                                 # Sample handlers for the execution of features steps
├── screenshots/                             # Contains all screenshots for each scenario executed by the features
│   └── .gitignore                           # Everything that must be excluded from the git repo
├── temp/                                    # Contains all temporary files necessary for each feature executed
│   └── .gitignore                           # Everything that must be excluded from the git repo
├── .eslintignore                            # Everything that must be excluded from coding styles
├── .eslintrc                                # Defines javascript coding styles
├── .gitignore                               # Everything that must be excluded from the git repo
├── package.json                             # Our javascript and node dependencies
├── LICENSE                                  # License file
├── StartTestRun.bat                         # Batch script to start features execution with modifiers
├── yarn.lock                                # Auto-generated yarn lock file
└── README.md                                # This file!
```

## Output example
Command: `StartTestRun smoke`

![Output example](/output_example.jpg)

## Related Projects

Many of the core components and dependencies live in their own repositories on GitHub. For example:
- [`cucumberjs`](https://github.com/cucumber/cucumber-js)
- [`selenium-webdriver`](https://github.com/SeleniumHQ/selenium) 
> All related projects have their own repositories. Check each repository page for more details about additional dependencies.

## License

Licensed under the [Unlicense](LICENSE) license.