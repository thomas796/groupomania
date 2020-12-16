
// const database = require("../models/posts")

// exports.addPost = (req, res, next) => {
    
//     const id = req.params.id
//     const description = req.body.description
//     let postimage = ""
//     if (req.file) {
//         postimage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
//     }
    
//     let parameters = [postimage, description, id]
//     res.send(database.addPost(parameters))
//     console.log(res)
// }


// exports.getPost = (req, res, next) => {
//     console.log(database.getPost())
//     res.send(database.getPost())
// }

// exports.deletePost = (req, res, next) => {
//     // const id = req.params.id
//     const post = req.params.post
//     res.send(database.deletePost(post)) 
// }




const mysql = require("mysql");
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


exports.deletePost = (req, res, next) => {

    const id = req.params.id
    const post = req.params.post

    const sqlDelete = "DELETE FROM posts WHERE idposts = ?;";
    console.log(post)
    db.query(sqlDelete, [post], (err, result) => {
        
        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    
    })

}