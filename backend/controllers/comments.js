const mysql = require("mysql");
// Database Route
const db = require("../config_db");

exports.addComment = (req, res, next) => {

    const userId = req.userId
    const postId = req.body.postId
    const comment = req.body.comment

    const sqlInsert = "INSERT INTO comments (postId, userId, comment) VALUES (?,?,?);"  

    db.query(sqlInsert, [postId, userId, comment], (err, result) => {

        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    })
}

exports.getComments = (req, res, next) => {

    console.log('one')
    const postId = req.params.postId

    const sqlSelect = "SELECT * FROM comments INNER JOIN users ON comments.userId = users.id WHERE postId like ?"

    db.query(sqlSelect, [postId], (err, result) => {
        console.log('two')

        if (result) {
            res.send(result)
        } 
        if (err) {
            res.send(err)
        }
    })

}
