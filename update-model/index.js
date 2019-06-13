const conf = require('./conf');

const fs = require('fs');
const rp = require('request-promise');

const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const readDataModel = require('./data-models');


reader.question('Username: ', username => {
  reader.question('Password: ', password => {

    authenticate(username, password).then(token => {
      clearModelFolder();
      readDataModel(token);
    });

    reader.close();
  });
});


function authenticate (username, password) {
  return rp({
    method: 'POST',
    uri: `${conf.baseUrl}/api/v1/oauth2/token`,
    form: {
      grant_type: 'password',
      username: username,
      password: password,
      subdomain: conf.subdomain,
      connectorId: conf.connectorId
    }
  }).then(res => {
    return JSON.parse(res).access_token;
  });
}

function clearModelFolder() {
  if (fs.existsSync(conf.modelFolder)) {
    rimraf(conf.modelFolder);
  }

  fs.mkdirSync(conf.modelFolder);
  fs.mkdirSync(conf.dataModelsFolder);
  fs.mkdirSync(conf.namedQueriesFolder);
}

function rimraf(path) {
  var files = [];

  if (fs.existsSync(path)) {
    files = fs.readdirSync(path);
    files.forEach(function(file, index) {
      var curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        rimraf(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};


