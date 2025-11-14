/**
 * Small helper to generate JWT tokens for tests or local use.
 * Usage: generateToken({ _id: '...' })
 */
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';

exports.generateToken = (user) => {
  const payload = { id: user._id || user.id };
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
};
