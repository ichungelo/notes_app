const sql = require('../db/db.js');
const { nanoid } = require('nanoid');

const checkUsername = (req, result) => {
    const checkUsernameQuery = `SELECT * FROM users WHERE username = '${req.username}' OR email = '${req.email}'`;

    sql.query(checkUsernameQuery, (err, res) => {
        if (err) throw err;
        result(null, res[0]);
        return;
    });
};

const userSignUp = (req, result) => {
    const userSignUpQuery = `INSERT INTO users ( user_id, username, email, password ) VALUES ('${nanoid(36)}','${req.username}','${req.email}','${req.password}')`;

    sql.query(userSignUpQuery, (err, res) => {
        if (err) throw err;
        result(null, res);
        return;
    });
};

const userSignIn = (req, result) => {
    const userSignInQuery = `SELECT * FROM users WHERE username = '${req.username}'`;

    sql.query(userSignInQuery, (err, res) => {
        if (err) throw err;
        result(null, res[0]);
        return;
    });
};

const getUserId = (req, result) => {
    const getUserIdQuery = `SELECT user_id FROM users WHERE username = '${req.username}'`;

    sql.query(getUserIdQuery, (err, res) => {
        if (err) throw err;
        result(null, res);
        return;
    });
};

const tokenUserSignIn = (req, result) => {
    const tokenUserSignInQuery = `UPDATE users SET token = '${req.token}' WHERE username = '${req.username}'`;

    sql.query(tokenUserSignInQuery, (err, res) => {
        if (err) throw err;
        result(null, res);
    });
};

module.exports = {
    checkUsername,
    userSignUp,
    userSignIn,
    getUserId,
    tokenUserSignIn
};