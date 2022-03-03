const sql = require('./db/db.js');

const test = (req, callback) => {
    sql.query(`SELECT username FROM users WHERE username = "${req}"`, (err, res) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res[0]);
        }
    });
};

const result = {
    test: test('ichungelo', (err, data) => {
        if (err) {
            err;
        } else {
            console.log(data);
        }
    })
};

console.log(result);