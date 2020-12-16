const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Toutes les toutes des API
router.delete('/:post', auth, admin, postCtrl.deletePost);

module.exports = router;





