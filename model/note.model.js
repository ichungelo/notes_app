const sql = require('..//db/db.js');
const { nanoid } = require('nanoid');

const createNewNote = (req, result) => {
    const createNewNoteQuery = `INSERT INTO notes (user_id, note_id, title, note, is_delete) VALUES ( '${req.user_id}', '${nanoid(36)}', '${req.title}', '${req.note}', false )`;

    sql.query(createNewNoteQuery, (err, res) => {
        if (err) {
            result(err, null);
            throw err;
        } else {
            result(null, res);
        }
        return;
    });
};

const getAllNotesByUserId = (req, result) => {
    const getAllNotesByUserIdQuery = `SELECT note_id, title, note FROM notes WHERE user_id = '${req.user_id}' AND is_delete = false`;

    sql.query(getAllNotesByUserIdQuery, (err, res) => {
        if (err) {
            result(err, null);
            throw err;
        } else {
            result(null, res);
        }
        return;
    });
};

const getSearchNotesByTitle = (req, result) => {
    const getSearchNotesByTitleQuery = `SELECT note_id, title, note FROM notes WHERE title LIKE '%${req.query}%' AND user_id = '${req.user_id}' AND is_delete = false`;

    sql.query(getSearchNotesByTitleQuery, (err, res) => {
        if (err) {
            result(err, null);
            throw err;
        } else {
            result(null, res);
        }
        return;
    });
};

const updateNoteByIdModel = (req, result) => {
    const updateNoteByIdModelQuery = `UPDATE notes SET title = '${req.title}', note = '${req.note}' WHERE note_id = '${req.note_id}' AND user_id = '${req.user_id}'`;

    sql.query(updateNoteByIdModelQuery, (err, res) => {
        if (err) {
            result( err, null);
            throw err;
        } else {
            result( null, res );
        }
        return;
    });
};

const deleteNoteByIdModel = (req, result) => {
    const deleteNoteByIdModelQuery = `UPDATE notes SET is_delete = true WHERE note_id = '${req.note_id}' AND user_id = '${req.user_id}'`;

    sql.query(deleteNoteByIdModelQuery, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = {
    createNewNote,
    getAllNotesByUserId,
    getSearchNotesByTitle,
    updateNoteByIdModel,
    deleteNoteByIdModel
};


