const mysql = require('mysql')
const dotenv = require('dotenv')

dotenv.config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE,
});

connection.connect((err) => {
    if (err) {
        console.log('ERROR in MySQL Connection')
        throw err
    }
    console.log('Connected to Database')
})

module.exports = connection;