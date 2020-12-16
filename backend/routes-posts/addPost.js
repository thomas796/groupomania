
const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config');

// Toutes les toutes des API
router.post('/', auth, multer, postCtrl.addPost);

module.exports = router;








// // Ajout des packages suplémentaires
// const express = require('express');
// const router = express.Router();

// const sauceCtrl = require('../controllers/sauces');

// // Import du middleware auth pour sécuriser les routes
// const auth = require('../middleware/auth');

// //Import du middleware multer pour la gestion des images
// const multer = require ('../middleware/multer-config');

// // Toutes les routes des API
// router.post('/', auth, multer, sauceCtrl.createSauce);
// router.put('/:id', auth, multer, sauceCtrl.modifySauce);
// router.delete('/:id', auth, sauceCtrl.deleteSauce);
// router.get('/:id', auth, sauceCtrl.getOneSauce);
// router.get('/', auth, sauceCtrl.getListe);
// router.post('/:id/like', auth, sauceCtrl.likeSauce);


// module.exports = router;