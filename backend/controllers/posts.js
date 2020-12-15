const mysql = require("mysql");
// Database Route
const db = require("../config_db");

exports.addPost = (req, res, next) => {
    
    const id = req.params.id
    const description = req.body.description
    let postimage = ""
    if (req.file) {
        postimage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    }
        
    const sqlInsert = "INSERT INTO posts (urlimage, description, userId) VALUES (?,?,?);"  
    let parameters = [postimage, description, id]
    
    db.query(sqlInsert, parameters, (err, result) => {

        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    })
}


exports.getPost = (req, res, next) => {

    const sqlSelect = "SELECT * FROM posts INNER JOIN users ON posts.userId = users.id";


    db.query(sqlSelect, (err, result) => {

        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    })
}




// // Import du modèle de la sauce
// const Sauce = require('../models/sauces');

// // Ajout du package FS pour la suppression
// const fs = require ('fs');

// // Création d'un sauce
// exports.createSauce = (req, res, next) => {
//     const sauceObject = JSON.parse(req.body.sauce);
//     delete sauceObject._id;
//     const sauce = new Sauce({
//       ...sauceObject,
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     });
//    sauce.save()
//    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//    .catch(error => res.status(400).json({ error }));
//   };

// // Modification d'une sauce
// exports.modifySauce = (req, res, next) =>  {
//     const sauceObject = req.file ?
//     { 
//       ...JSON.parse(req.body.sauce),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : { ...req.body };
//     Sauce.updateOne({ _id: req.params.id}, {... sauceObject, _id: req.params.id})
//     .then(() => res.status(200).json({message: 'Objet modifié !'}))
//     .catch(error => res.status(400).json({error}));
//   };

// // Suppression d'une sauce
// exports.deleteSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id})
//     .then((sauce) => {
//       const filename = sauce.imageUrl.split('/images/')[1];
//       fs.unlink(`images/${filename}`, () => {
//         Sauce.deleteOne({ _id: req.params.id})
//         .then(() => res.status(200).json({message: 'Objet supprimé !'}))
//         .catch(error => res.status(400).json({error}));
//       });
//     })
//     .catch(error => res.status(500).json({error}));
//   };

// // Récupération d'une seule sauce grace à l'ID
// exports.getOneSauce = (req, res, next) => {
//     Sauce.findOne({ _id: req.params.id})
//     .then((sauce) => res.status(200).json(sauce))
//     .catch(error => res.status(404).json({error}));
//   };

// // Récupération de la liste des sauces
// exports.getListe = (req, res, next) => {
//     Sauce.find()
//     .then((sauces) => res.status(200).json(sauces))
//     .catch(error => res.status(400).json({error}));
//   };

// // Incrémentation des LIKE & DISLIKES des sauces
// exports.likeSauce = (req, res, next) => {
//   switch (req.body.like) {
//     // Défault = 0
//     // Verification que l'utilisateur n'a pas déjà LIKER la sauce
//     case 0:
//       Sauce.findOne({ _id: req.params.id })
//         .then((sauce) => {
//           if (sauce.usersLiked.find(user => user === req.body.userId)) {
//             Sauce.updateOne({ _id: req.params.id }, {
//               $inc: { likes: -1 },
//               $pull: { usersLiked: req.body.userId },
//               _id: req.params.id
//             })
//               .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
//               .catch((error) => { res.status(400).json({ error: error }); });

//               // Verification que l'utilisateur n'a pas déjà DISLIKER la sauce
//           } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
//             Sauce.updateOne({ _id: req.params.id }, {
//               $inc: { dislikes: -1 },
//               $pull: { usersDisliked: req.body.userId },
//               _id: req.params.id
//             })
//               .then(() => { res.status(201).json({ message: 'Ton avis a été pris en compte!' }); })
//               .catch((error) => { res.status(400).json({ error: error }); });
//           }
//         })
//         .catch((error) => { res.status(404).json({ error: error }); });
//       break;
//     //likes = 1
//     case 1:
//       Sauce.updateOne({ _id: req.params.id }, {
//         $inc: { likes: 1 },
//         $push: { usersLiked: req.body.userId },
//         _id: req.params.id
//       })
//         .then(() => { res.status(201).json({ message: 'Ton like a été pris en compte!' }); })
//         .catch((error) => { res.status(400).json({ error: error }); });
//       break;
//     //likes = -1
//     case -1:
//       Sauce.updateOne({ _id: req.params.id }, {
//         $inc: { dislikes: 1 },
//         $push: { usersDisliked: req.body.userId },
//         _id: req.params.id
//       })
//         .then(() => { res.status(201).json({ message: 'Ton dislike a été pris en compte!' }); })
//         .catch((error) => { res.status(400).json({ error: error }); });
//       break;
//     default:
//       console.error('oups ! mauvaise requête ! ');
//   }
// };