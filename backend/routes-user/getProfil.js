// Ajout des packages suplémentaires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Toutes les toutes des API
router.get('/', auth, userCtrl.getProfil);

module.exports = router;

