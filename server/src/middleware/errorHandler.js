module.exports = (err, req, res, next) => {
  // Log stack when available
  if (err && err.stack) console.error(err.stack);
  else console.error(err);

  const status = err.status || 500;
  const message = err.message || 'Server Error';
  res.status(status).json({ error: message });
};
