require('urlify').create({
  spaces: '-',
  nonPrintable: '-',
  toLower: true,
  extendString: true
});

const fs = require('fs');
const path = require('path');
const logSymbols = require('log-symbols');

const rp = require('../node_modules/request-promise');
const proxyConf = require('../proxy.conf.json');

const dataModelsFolder = './src/data-models';

const baseUrl = `https://${proxyConf.subdomain}.carol.ai`;

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

reader.question('Username: ', username => {
  reader.question('Password: ', password => {

    authenticate(username, password).then(readDataModels);

    reader.close();
  });
});


function authenticate (username, password) {
  return rp({
    method: 'POST',
    uri: `${baseUrl}/api/v1/oauth2/token`,
    form: {
      grant_type: 'password',
      username: username,
      password: password,
      subdomain: proxyConf.subdomain,
      connectorId: proxyConf.connectorId
    }
  }).then(res => {
    return JSON.parse(res).access_token;
  });
}

function readDataModels (authToken) {
  rp.get(`${baseUrl}/api/v1/admin/entities/templates?pageSize=-1`, { headers: { authorization: authToken }}).then(response => {
    const dataModels = JSON.parse(response).hits;

    clearDataModelsFolder();

    dataModels.forEach(dataModel => {
      createFile(dataModel);
    });

    console.log('Done!');
    process.exit();
  });
}

function clearDataModelsFolder() {
  var files = fs.readdirSync(dataModelsFolder);

  for (const file of files) {
    fs.unlinkSync(path.join(dataModelsFolder, file));
  }
}

function getDataType(mdmMappingDataType) {
  switch (mdmMappingDataType) {
    case 'STRING': return 'string';
    case 'DATE': return 'Date';
    case 'BOOLEAN': return 'boolean';
    case 'DOUBLE': return 'number';
    default: return 'any';
  }
}

function createFile (dataModel) {
  const fileName = dataModel.mdmLabel['en-US'].urlify();
  const className = dataModel.mdmLabel['en-US'].replace(/\s/g, '');

  let fileContent =
`
export class ${className} {

  static dataModelName = '${dataModel.mdmName}';

  mdmId: string;
  mdmUpdatedUser: string;
  mdmEntityType: string;
  mdmCreatedUser: string;
  mdmLastUpdated: Date;
  mdmCreated: string;
  mdmCrosswalk: {
    mdmApplicationId: string;
    mdmStagingType: string;
    mdmConnectorId: string;
    mdmCrossreference: any;
  };
  mdmGoldenFieldAndValues: {
`;

  dataModel.mdmFields.forEach(field => {
    fileContent += `    ${field.mdmName}: ${getDataType(field.mdmMappingDataType)};\n`;
  });

  fileContent +=
`  };
}

`;

  fs.appendFileSync(`./src/data-models/${fileName}.ts`, fileContent);
  console.log(`${logSymbols.success} Generated file: ./src/data-models/${fileName}.ts`);
}

