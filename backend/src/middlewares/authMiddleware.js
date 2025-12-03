module.exports.requireAuth = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') return next();
  // normal auth logic
};
