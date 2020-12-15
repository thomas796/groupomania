const mysql = require("mysql");
const fs = require ('fs');

// Database Route
const db = require("../config_db");
const validator = require("validator");
const regExText = /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ \'\- ]+$/i;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import du modèle de l'utilisateur
const validatorEmail = require("email-validator");
const passwordValidator = require("password-validator");

// Create a schema
let passwordSchema = new passwordValidator();
 
// Add properties to it
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 

// Sign up
exports.register = (req, res, next) => {
   
    const username = req.body.username
    const mail = req.body.mail
    const password = req.body.password

    if (validator.matches(String(username), regExText)) {
        if (validatorEmail.validate(mail)) {
            if (passwordSchema.validate(password)) {

                 const sqlSelect = "SELECT * FROM users WHERE mail = ?;"

                 //on check si les utilisateurs sont déjà créé
                 db.query(sqlSelect, [mail], (err, result) => {
           
                    if (result.length === 0) {

                       bcrypt.hash(req.body.password, 10).then(hash => {
       
                        const sqlInsert = "INSERT INTO users (username, mail, password) VALUES (?,?,?);"
       
                        db.query(sqlInsert, [username, mail, hash], (err) => {

                            if (err) {
                                res.send({ err: err})
                            } else {
                                res.send({ message: "profil is created" })
                            }
                        })
                       }).catch(error => res.status(500).json({ error }))

                    } else {
                        const error = 'email déjà existant';
                        res.send({ message: "l'adresse mail est déjà utilisée" })
                    }
                 })

                } else {
                    const error = 'invalide password';
                    res.status(400).json({ error })
            }
        } else {
            const error = 'invalide email';
            res.status(600).json({ error })
        }
    } else {
        const error = 'invalide username';
        res.status(700).json({ error })
    }
}



// Sign In
exports.login = (req, res, next) => {

    const mail = req.body.mail
    const password = req.body.password

    const sqlSelect = "SELECT * FROM users WHERE mail = ?";

    db.query(sqlSelect, [mail], (err, user) => {
        
        if (err) {
            res.send({ err: err})
        }

        if (user.length === 0) {
            res.send({ message: "Votre adresse email est invalide !"})
        }
  
        bcrypt.compare(req.body.password, user[0].password).then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } 

          res.status(200).json({
            userId: user[0].id,
            token: jwt.sign(
              { userId: user[0].id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          })
        }).catch(error => res.status(500).json({ error }));

    })
}

//getProfil
exports.getProfil = (req, res, next) => {
    const id = req.params.id;

    const string = "SELECT * FROM users WHERE id = ?";
    const inserts = [id];
    const sql = mysql.format(string, inserts);

    const query = db.query(sql, (error, profile) => {


        if (!error) {
            res.status(200).json(profile);
        } else {
            return next(new HttpError("Utilisateur non trouvé", 404));
        }
    });
}


//update profil
exports.updateProfil = (req, res, next) => {
    const id = req.params.id
    const age = req.body.age
    const department = req.body.department

    if ((req.file) && (age !== '') && (department !== '')) {
        console.log('two')

        const profilimage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        
        let sqlUpdate = "UPDATE users SET age = ?, department = ?, profilimage = ? WHERE id = ?;";
        
        let parameters = [age, department, profilimage, id]
        
        db.query(sqlUpdate, parameters, (err, result) => {

            if (result) {
                res.send(result)
            } 
            if (err) {
                res.send(err)
            }
        })
    } else {
        console.log('four')
        res.send('Votre profil est incomplet')
    }

}

//delete profil 
exports.deleteProfil = (req, res, next) => {
    const id = req.params.id

    let getUserImageUrl = "SELECT profilimage FROM users WHERE id = ?;";
    db.query(getUserImageUrl, [id], (err, result) => {

        const imageUrl = result[0].profilimage

        if ((imageUrl !== '') && (imageUrl !== null)) {

            const filename = imageUrl.split('/images/')[1];

            fs.unlink(`images/${filename}`, () => {

                let sqlDelete = "DELETE FROM users WHERE id = ?;";
        
                db.query(sqlDelete, [id], (err, result) => {

                    if (result) {
                        res.send(result)
                    } 
                    if (err) {
                        res.send(err)
                    }
                })
            })
        }
    })
}
