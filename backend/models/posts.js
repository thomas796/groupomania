const mysql = require("mysql");
const db = require("../config_db");


exports.addPost = (parameters) => {

    const sqlInsert = "INSERT INTO posts (urlimage, description, userId) VALUES (?,?,?);"  
    
    db.query(sqlInsert, parameters, (err, result) => {

        if (result) {
            return result
        } 
        if (err) {
            return err
        }
    })
}

exports.getPost = () => {

    const sqlSelect = "SELECT * FROM posts INNER JOIN users ON posts.userId = users.id";

    db.query(sqlSelect, (err, result) => {
        if (result) {
            console.log(result)
            return result
        } 
        if (err) {
            console.log(err)
            return err
        }
    })
}


exports.deletePost = () => {

    const sqlDelete = "DELETE FROM posts WHERE idposts = ?;";
    
    db.query(sqlDelete, [post], (err, result) => {

        if (result) {
            return result
        } 
        if (err) {
            return err
        }

    })
}


