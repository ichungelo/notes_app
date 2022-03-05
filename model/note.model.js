const sql = require('..//db/db.js');
const { nanoid } = require('nanoid');

const createNewNote = (req, result) => {
    const createNewNoteQuery = `INSERT INTO notes (user_id, note_id, title, note, is_delete) VALUES ( '${req.user_id}', '${nanoid(36)}', '${req.title}', '${req.note}', false )`;

    sql.query(createNewNoteQuery, (err, res) => {
        if (err) throw err;
        result(null, res);
        return;
    });
};

const getAllNotesByUserId = (req, result) => {
    const getAllNotesByUserIdQuery = `SELECT note_id, title, note FROM notes WHERE user_id = '${req.user_id}' AND is_delete = false`;

    sql.query(getAllNotesByUserIdQuery, (err, res) => {
        if (err) throw err;
        result( null, res);
        return;
    });
};

module.exports = {
    createNewNote,
    getAllNotesByUserId
};


