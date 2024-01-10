const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    database: "privatecalculator",
    user: "admin",
    password: "password"
});
if(pool){
    console.log("Connected")
}

module.exports = pool;