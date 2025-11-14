/**
 * Express application (no server listen here so tests can import app)
 */
const express = require('express');
const cors = require('cors');
const bugsRouter = require('./routes/bugs');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Mount API routes
app.use('/api/bugs', bugsRouter);

// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Error handling middleware (last)
app.use(errorHandler);

module.exports = app;
