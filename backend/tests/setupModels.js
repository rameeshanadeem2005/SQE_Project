const path = require('path');

// Core Models
require(path.join(__dirname, '..', 'src', 'models', 'coreModels', 'Setting'));
require(path.join(__dirname, '..', 'src', 'models', 'coreModels', 'Admin'));
require(path.join(__dirname, '..', 'src', 'models', 'coreModels', 'AdminPassword'));
require(path.join(__dirname, '..', 'src', 'models', 'coreModels', 'Upload'));

// App Models
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'Client'));
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'Invoice'));
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'Payment'));
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'PaymentMode'));
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'Quote'));
require(path.join(__dirname, '..', 'src', 'models', 'appModels', 'Taxes')); // ✅ correct path
