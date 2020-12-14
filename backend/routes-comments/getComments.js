
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/comments');
const auth = require('../middleware/auth');

// Toutes les toutes des API
router.get('/:postId', auth, postCtrl.getComments);

module.exports = router;


