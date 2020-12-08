const mysql = require("mysql");

// Database Route
const db = require("../config_db");

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

    console.log('one')
    const username = req.body.username
    const mail = req.body.mail
    const password = req.body.password

    if (validatorEmail.validate(mail)) {
        console.log('two')
        if (passwordSchema.validate(password)) {
            console.log('three')
      //  bcrypt.hash(password, 10, (error, hash) => {

            const sqlInsert = "INSERT INTO users (username, mail, password) VALUES (?,?,?);"

            db.query(sqlInsert, [username, mail, password], (err, result) => {
                console.log('profil créé')

                if (err) {
                    res.send({ err: err})
                    console.log('erreur, profil non créé')
                } else {
                    res.send({ message: "profil is created" })
                }
            })
       // }).catch(error => res.status(500).json({ error }))
    } else {
        const error = 'invalide password';
        res.status(400).json({ error })
      }
    } else {
        const error = 'invalide email';
        res.status(600).json({ error })
    }
}




// Sign In
exports.login = (req, res, next) => {

    const mail = req.body.mail
    const password = req.body.password

    const sqlSelect = "SELECT * FROM users WHERE mail = ? AND password = ?;"

    db.query(sqlSelect, [mail, password], (err, result) => {
        
        console.log('login')
        if (err) {
            res.send({ err: err})
            console.log('err')
        }
        
        if (result.length > 0) {
            console.log('result')
            res.send(result)
        } else {
            console.log('message')
            res.send({ message: "Wrong mail/password combination !"})
        }
    })
}


//update profil
exports.updateProfil = (req, res, next) => {
    const id = req.body.id
    const age = req.body.age
    const department = req.body.department

    const sqlUpdate = "UPDATE users SET age = ?, department = ? WHERE id = ?;";

    db.query(sqlUpdate, [age, department, id], (err, result) => {
        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    })
}




// app.get('/user/:id', (req, res) => {
//     const id = req.params.id
//     const sqlSelect = "SELECT * FROM users WHERE id = ?;"

//     db.query(sqlSelect, [6], (err, result) => {
//         res.send(result)
//     })
// })


//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ error: 'Oups... Utilisateur non trouvé. Veuillez créer votre compte !' });
//         }
//         bcrypt.compare(req.body.password, user.password)
//           .then(valid => {
//             if (!valid) {
//               return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                 { userId: user._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' }
//               )
//             });
//           })
//           .catch(error => res.status(500).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };