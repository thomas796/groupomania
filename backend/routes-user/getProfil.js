// Ajout des packages suplémentaires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Toutes les toutes des API
router.get('/:id', auth, multer, userCtrl.getProfil);

module.exports = router;

