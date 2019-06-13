require('urlify').create({
  spaces: '-',
  nonPrintable: '-',
  toLower: true,
  extendString: true
});

const proxyConf = require('../proxy.conf.json');

const modelFolder = './src/model';
const dataModelsFolder = './src/model/data-models';
const namedQueriesFolder = './src/model/named-queries';

const baseUrl = `https://${proxyConf.subdomain}.carol.ai`;

var conf = {
  baseUrl: baseUrl,
  modelFolder: modelFolder,
  dataModelsFolder: dataModelsFolder,
  namedQueriesFolder: namedQueriesFolder,
  subdomain: proxyConf.subdomain,
  connectorId: proxyConf.connectorId
};

module.exports = conf;
