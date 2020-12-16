
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');

// Toutes les toutes des API
router.put('/', auth, postCtrl.likes);

module.exports = router;



