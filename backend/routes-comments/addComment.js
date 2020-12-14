const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Toutes les toutes des API
router.post('/:id', auth, postCtrl.addComment);

module.exports = router;


