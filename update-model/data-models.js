const conf = require('./conf');
const fs = require('fs');
const rp = require('request-promise');

const logSymbols = require('log-symbols');

module.exports = function readDataModels (authToken) {
  rp.get(`${conf.baseUrl}/api/v1/admin/entities/templates?pageSize=-1`, { headers: { authorization: authToken }}).then(response => {
    const dataModels = JSON.parse(response).hits;

    dataModels.forEach(dataModel => {
      createFile(dataModel);
    });

    console.log('Done!');
    process.exit();
  });
}

function createFile (dataModel) {
  const fileName = dataModel.mdmLabel['en-US'].urlify();
  const className = toTitleCase(dataModel.mdmLabel['en-US']).replace(/\s/g, '');

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
  relations: any[];
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

  static mdmId = 'mdmId';
  static mdmUpdatedUser = 'mdmUpdatedUser';
  static mdmEntityType = 'mdmEntityType';
  static mdmCreatedUser = 'mdmCreatedUser';
  static mdmLastUpdated = 'mdmLastUpdated';
  static mdmCreated = 'mdmCreated';

  static mdmGoldenFieldAndValues = {
`;

  dataModel.mdmFields.forEach((field, idx) => {
    if (idx) {
      fileContent += `,\n`;
    }
    fileContent += `    ${field.mdmName}: '.${field.mdmName}'`;
  });

  fileContent +=
`\n  };
}

`;

  fs.appendFileSync(`${conf.dataModelsFolder}/${fileName}.ts`, fileContent);
  console.log(`${logSymbols.success} Generated file: ${conf.dataModelsFolder}/${fileName}.ts`);
}

function toTitleCase(str) {
  return str.replace(
      /\w\S*/g,
      function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
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
