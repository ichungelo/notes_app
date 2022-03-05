const mysql = require('mysql'),
    configDB = require('../config/db.config.js');

const dbConnection = mysql.createConnection({
    host: configDB.host,
    user: configDB.user,
    password: configDB.password,
    database: configDB.database
});

dbConnection.connect( (err) => {
    if (err) throw err;
    console.log('Success connected to DB');
});

module.exports = dbConnection;