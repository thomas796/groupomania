// Ajout des packages suplémentaires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Toutes les toutes des API
router.put('/', auth, multer, userCtrl.updateProfil);

module.exports = router;





