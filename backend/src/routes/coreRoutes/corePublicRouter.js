// corePublicRouter.js
const express = require('express');
const router = express.Router();
const path = require('path');
const { isPathInside } = require('../../utils/is-path-inside');

router.get('/:subPath/:directory/:file', (req, res) => {
  try {
    const { subPath, directory, file } = req.params;

    const decodedSubPath = decodeURIComponent(subPath);
    const decodedDirectory = decodeURIComponent(directory);
    const decodedFile = decodeURIComponent(file);

    const rootDir = path.join(__dirname, '../../public');

    const absolutePath = path.join(rootDir, decodedSubPath, decodedDirectory, decodedFile);

    // Path traversal protection
    if (!isPathInside(absolutePath, rootDir)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid filepath',
      });
    }

    res.sendFile(absolutePath, (err) => {
      if (err) {
        return res.status(404).json({
          success: false,
          message: 'File not found: ' + file,
        });
      }
    });
  } catch (err) {
    res.status(503).json({ success: false, message: err.message });
  }
});

module.exports = router;
