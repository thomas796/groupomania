const mysql = require("mysql");
const db = require("../config_db");

// Création des tokens d'authentification
module.exports = (req, res, next) => {

  try {
    const id = req.userId

    const sqlSelect =  "SELECT isadministrator FROM users WHERE id = ?;";

    db.query(sqlSelect, [id], (err, result) => {

        if (result) {
           
            if (result[0].isadministrator === 1) {
                next();
            } else {
                throw 'Invalid user ID';
            }
        } else if (err) {
            console.log('three')
            throw 'Invalid user ID';
        } else {
            console.log('four')
            throw 'Invalid user ID';
        }
          
    })

    //faire une requete à la base de donnéee avec pour savoir si l'utilisateur est admin
    // if () {
    //   throw 'Invalid user ID';
    // } else {
    //   next();
    // }
  } catch {
    console.log('five')
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}