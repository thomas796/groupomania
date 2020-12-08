const mysql = require("mysql")
const dotenv = require('dotenv')

dotenv.config();
const host = process.env.host;
const username = process.env.username;
const password = process.env.password;
const database = process.env.database;
const port = process.env.port;


const db = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
    port: port,
})

module.exports = db;


