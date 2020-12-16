
const mysql = require("mysql");
const db = require("../config_db");

exports.addPost = (req, res, next) => {
    
    const id = req.userId
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

    const sqlSelect = "SELECT * FROM posts INNER JOIN users ON posts.userId = users.id ORDER BY posts.idposts ASC";

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


exports.likes = (req, res, next) => {

    const id = req.userId
    const post = req.body.post
    const thumb = req.body.thumb

    const sqlSelect = "SELECT * FROM likes WHERE userId = ? AND postId = ?";

    db.query(sqlSelect, [id, post], (err, result) => {

        if (result) {

            let likeup = 0
            let likedown = 0
            if (thumb === 'up') {
                likeup = 1
            } else {
                likedown = 1
            }
  
            if (result.length === 0) {
                //on créé la row
                const sqlInsert = "INSERT INTO likes (userId, postId, likeup, likedown) VALUES (?,?,?,?);"

                db.query(sqlInsert, [id, post, likeup, likedown], (err, result) => {
                    if (result) {
                        res.send(result)
                    }
                    if (err) {
                        res.send(err)
                    }
                })
            } else {

                const currentLikeup = result[0].likeup
                const currentLikedown = result[0].likedown

                //on delete la row
                if (((likeup === 1) && (currentLikeup === 1)) || ((likedown === 1) && (currentLikedown === 1))) {

                    let sqlDelete = "DELETE FROM likes WHERE userId = ? AND postId = ?;";
                
                    db.query(sqlDelete, [id, post], (err, result) => {

                        if (result) {
                            res.send(result)
                        }
                        if (err) {
                            res.send(err)
                        }
                    })

                // on update la row
                } else {
                    let sqlUpdate = "UPDATE likes SET likeup = ?, likedown = ? WHERE userId = ? AND postId = ?;";
                    db.query(sqlUpdate, [likeup, likedown, id, post], (err, result) => {
                        if (result) {
                            res.send(result)
                        }
                        if (err) {
                            res.send(err)
                        }
                    })
                }
            }
        } 
        if (err) {
            res.send(err)
        }
    })
}

exports.getLikes = (req, res, next) => {

    const id = req.userId
    let sqlSelect = "SELECT * FROM likes WHERE userId = ?";

    db.query(sqlSelect, [id], (err, result) => {
        if (result) {
            res.send(result)
        }
        if (err) {
            res.send(err)
        }
    })

}