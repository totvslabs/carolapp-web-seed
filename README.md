# SeedCarolApp

This project can be used as a seed when you want to start building a Carol app. 

[Carol](https://docs.carol.ai) is a data platform with Machine Learning developed and maintained by [Totvs Labs](https://www.totvslabs.com/).

This project is constantly maintained and updated by TOTVS Labs. At the same time we encourage you to open a PR with your improvements and contribute.

The project was generated with [Angular CLI](https://github.com/angular/angular-cli), it also contains [PO-UI](https://po-ui.io/) and some extra features to make your life easier when building a Carol App and retrieving data from Carol.

### Included Features/Configurations

1. You can easily change the target Tenant. For this edit the file `proxy.conf.json` in the root of the project.
2. Authentication flow. 
3. An interceptor that will automatically add the auth token in every HTTP request.
4. PO-UI is ready to use.
5. A script that will connect to your tenant, download the Data Models schema and generate Typescript classes so you have typings in the FE.

### Steps to start building a Carol App

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repo `git clone https://github.com/totvslabs/carolapp-web-seed`
3. Install Angular as a global dependency: `npm install -g @angular/cli`
4. Install the project dependencies: `npm install`
5. Set your tenant in the file `proxy.conf.json`

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

For further help feel free to open an issue.
