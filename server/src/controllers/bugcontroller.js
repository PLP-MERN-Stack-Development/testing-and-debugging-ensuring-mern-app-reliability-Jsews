const Bug = require('../models/Bug');

/**
 * Create a new bug
 */
exports.createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }

    const payload = { title, description };
    if (req.user && req.user.id) payload.createdBy = req.user.id;

    const bug = await Bug.create(payload);
    return res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
};

/**
 * Get bug list with optional status filter and pagination
 */
exports.getBugs = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status) query.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const bugs = await Bug.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
    return res.json(bugs);
  } catch (err) {
    next(err);
  }
};

/**
 * Get a single bug by id
 */
exports.getBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    return res.json(bug);
  } catch (err) {
    next(err);
  }
};

/**
 * Update a bug
 */
exports.updateBug = async (req, res, next) => {
  try {
    const updates = req.body;
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });

    // TODO: Add authorization if needed (e.g., only creator can update)
    const allowed = ['title', 'description', 'status'];
    allowed.forEach((k) => {
      if (Object.prototype.hasOwnProperty.call(updates, k)) bug[k] = updates[k];
    });

    await bug.save();
    return res.json(bug);
  } catch (err) {
    next(err);
  }
};

/**
 * Delete a bug
 */
exports.deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ error: 'Bug not found' });
    return res.json({ message: 'Bug deleted' });
  } catch (err) {
    next(err);
  }
};
