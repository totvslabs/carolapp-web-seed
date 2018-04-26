# First Steps

## Installation
Use `npm install` to install all packages

## Running
Use `ng serve` to start the application on http://localhost:4200

## Carol Configuration
Set the subdomain, rootUrl and connectorId in the file:
`app/services/http-requests.service.ts``

```
  subdomain = 'sample';
  rootUrl = `https://sample.carol.ai/api/v2/`;
  connectorId = '0a0829172fc2433c9aa26460c31b78f0';
```

Setting up the above file, the login will be ready to use!


# Project Structure
- app/components: there are some components ready to use. Feel free to change these components as needed.
- app/i18n: here we have the constants to internationalization.
- app/pages: here is where we should add the new pages.
- app/services: there are some reuseable components.
- app/services/carol-querys: services with custom querys used to get data from Carol.
- app/utils: utils functions to manipulate dates and other things.
- assets: images and others assets.

## Files
- app/app.module.ts: main module, where we should add news components and services.
- app/app.routing.ts: router configurator

## Custom components
- bullet-charts - print several results.
- card - large container to charts and result-box.
- chart - print charts with Line or Column/Bar.
- chart-pie - print print a Pie Chart.
- container - page structure, with toolbar, menu and body.
- loading - loading box with gif.
- percentage-result - results and comparisons.
- result-box - Small box to present results and informations.
- result-box-group - print two, three or four result-box inline.
- toolbar - toolbar with search, user settings and language selector.

## Recomendations
- We should choose the T-Face components instead of custom components.
