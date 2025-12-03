const path = require('path');
const glob = require('glob');

// Load all models in coreModels
glob.sync(path.join(__dirname, 'coreModels/*.js')).forEach((file) => {
  if (!file.endsWith('index.js')) {
    require(file);
  }
});

// Load all models in appModels
glob.sync(path.join(__dirname, 'appModels/*.js')).forEach((file) => {
  if (!file.endsWith('index.js')) {
    require(file);
  }
});
