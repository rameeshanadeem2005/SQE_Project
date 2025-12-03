const express = require('express');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

// Routes & Controllers
const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const coreDownloadRouter = require('./routes/coreRoutes/coreDownloadRouter');
const corePublicRouter = require('./routes/coreRoutes/corePublicRouter');
const erpApiRouter = require('./routes/appRoutes/appApi');
const adminAuth = require('./controllers/coreControllers/adminAuth');

const errorHandlers = require('./handlers/errorHandlers');

const app = express();

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// app.use(fileUpload()); // optional

// Public static files with path validation
const publicRoot = path.join(__dirname, '..', 'public');
app.use('/public', (req, res, next) => {
  const unsafePattern = /(\.\.[\/\\])/;
  if (unsafePattern.test(req.path)) {
    return res.status(400).json({ success: false, message: 'Invalid path' });
  }
  next();
}, express.static(publicRoot));

// API Routes
app.use('/api', coreAuthRouter);
app.use('/api', adminAuth.isValidAuthToken, coreApiRouter);
app.use('/api', adminAuth.isValidAuthToken, erpApiRouter);
app.use('/download', coreDownloadRouter);
app.use('/public', corePublicRouter);

// Error handling
app.use(errorHandlers.notFound);
app.use(errorHandlers.productionErrors);

module.exports = app;
