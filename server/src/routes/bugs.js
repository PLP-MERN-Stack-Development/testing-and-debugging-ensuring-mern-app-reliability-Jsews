const express = require('express');
const router = express.Router();
const bc = require('../controllers/bugcontroller');
const auth = require('../middleware/auth');

// Public read endpoints
router.get('/', bc.getBugs);
router.get('/:id', bc.getBug);

// Create / update / delete - uses optional auth by default (assignment can allow unauthenticated)
router.post('/', auth.optional, bc.createBug);
router.put('/:id', auth.optional, bc.updateBug);
router.delete('/:id', auth.optional, bc.deleteBug);

module.exports = router;
