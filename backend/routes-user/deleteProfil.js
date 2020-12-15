// Ajout des packages suplémentaires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

// Toutes les toutes des API
router.delete('/:id', auth, userCtrl.deleteProfil);

module.exports = router;






