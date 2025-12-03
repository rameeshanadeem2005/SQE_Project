// utils/is-path-inside.js
const path = require('path');

function isPathInside(child, parent) {
  const relative = path.relative(parent, child);
  return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
}

module.exports = { isPathInside };
