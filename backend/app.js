const express = require("express")
const bodyParser = require('body-parser')
const cors = require("cors")
const path = require('path')
const helmet = require('helmet')
const xss = require('xss-clean')
const rateLimit = require("express-rate-limit")
const toobusy = require("toobusy-js")
const sanitizeMiddleware = require("sanitize-middleware")

const app = express()
app.use(cors())

// // Express Parser Middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(helmet())
// Sanitize Middleware (Inyection Attacks)
app.use(sanitizeMiddleware())
app.use(xss())

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000 
});

app.use(limiter);

app.use(function (req, res, next) {
    if (toobusy()) {
        res.status(503).send("Server Too Busy");
    } else {
        next();
    }
});


const register = require('./routes-user/register');
const login = require('./routes-user/login');
const updateProfil = require('./routes-user/updateProfil');
const getProfil = require('./routes-user/getProfil');
const deleteProfil = require('./routes-user/deleteProfil')

// Gestion de la ressource image en statique
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/register', register);
app.use('/login', login);
app.use('/updateProfil', updateProfil);
app.use('/getProfil', getProfil);
app.use('/deleteProfil', deleteProfil);

const addPost = require('./routes-posts/addPost')
const getPost = require('./routes-posts/getPost')
const deletePost = require('./routes-posts/deletePost')
const likes = require('./routes-posts/likes')
const getLikes = require('./routes-posts/getLikes')

app.use('/addPost', addPost);
app.use('/getPost', getPost);
app.use('/deletePost', deletePost);
app.use('/likes', likes);
app.use('/getLikes', getLikes);

const addComment = require('./routes-comments/addComment')
const getComments = require('./routes-comments/getComments')

app.use('/addComment', addComment);
app.use('/getComments', getComments);

// Error Handling 404
app.use((req, res, next) => {
    const HttpError = require("./models/http-error");

    const error = new HttpError("Route non trouvée", 404);
    throw error;
});

// Error Handling App
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "Un problème est survenu sur le serveur, veuillez réessayer ultérieurement" });
});

module.exports = app;




// app.post('/register', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password

//     const sqlInsert = "INSERT INTO users (username, password) VALUES (?,?);"

//     db.query(sqlInsert, [username, password], (err, result) => {
//         if (err) {
//             res.send({ err: err})
//         } else {
//             res.send({ message: "profil is created" })
//         }
//     })
// })

// app.post('/login', (req, res) => {

//     const username = req.body.username
//     const password = req.body.password

//     const sqlInsert = "SELECT * FROM users WHERE username = ? AND password =?;"

//     db.query(sqlInsert, [username, password], (err, result) => {
//         if (err) {
//             res.send({ err: err})
//         }
        
//         if (result.length > 0) {
//             res.send(result)
//         } else {
//             res.send({ message: "Wrong username/password combination !"})
//         }
//     })
// })


// app.get('/user/:id', (req, res) => {
//     const id = req.params.id
//     const sqlSelect = "SELECT * FROM users WHERE id = ?;"

//     db.query(sqlSelect, [6], (err, result) => {
//         res.send(result)
//     })
// })


// app.put('/profil/', (req, res) => {
//     const id = req.body.id
//     const age = req.body.age
//     const mail = req.body.mail
//     const department = req.body.department

//     const sqlUpdate = "UPDATE users SET age = ?, mail = ?, department = ? WHERE id = ?;";

//     db.query(sqlUpdate, [age, mail, department, id], (err, result) => {
//         if (result) {
//             res.send(result)
//         } 
//         if (err) {
//             res.send(err)
//         }
//     })
// })


















// "use strict";

// // Middleware Imports
// const express = require("express");
// const path = require("path");
// const cors = require("cors")

// require("dotenv").config();

// // App security
// const helmet = require("helmet");
// const bouncer = require("express-bouncer")(10000, 600000, 5);
// const toobusy = require("toobusy-js");
// const sanitizeMiddleware = require("sanitize-middleware");

// // Error Class
// const HttpError = require("./models/http-error");

// // App Routes
// const signupRoutes = require("./routes/signup-route");
// const loginRoutes = require("./routes/login-route");
// const userRoutes = require("./routes/user-routes");
// const postRoutes = require("./routes/posts-routes");


// // Access Routes
// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/signup", signupRoutes);
// app.use("/login", loginRoutes);
// app.use("/profile", userRoutes);
// app.use("/posts", postRoutes);







