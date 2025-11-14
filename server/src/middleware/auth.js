/**
 * Lightweight JWT auth middleware.
 * - optional: tries to set req.user if token present, but continues even if missing/invalid
 * - required: returns 401 when token missing or invalid
 *
 * For assignment/demo purposes only. In a real app, validate token structure and user existence.
 */

const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'dev-secret';

exports.optional = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return next();
    const token = auth.split(' ')[1];
    if (!token) return next();
    const payload = jwt.verify(token, SECRET);
    req.user = { id: payload.id };
  } catch (e) {
    // invalid token - treat as unauthenticated
  }
  return next();
};

exports.required = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'Authorization header missing' });
    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token missing' });
    const payload = jwt.verify(token, SECRET);
    req.user = { id: payload.id };
    return next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
