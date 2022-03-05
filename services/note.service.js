const { authJwt } = require('../middleware/auth.jwt');
const { createNewNote, getAllNotesByUserId, getSearchNotesByTitle } = require('../model/note.model');

const addNewNoteById = (req, res) => {
    const {
        token,
        title,
        note
    } = req;
    const decoded = authJwt(token);

    createNewNote({
        user_id: decoded.user_id,
        title: title,
        note: note
    }, (err) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                status: 'OK',
                message: 'Note Added',
                note: {
                    title: title,
                    note: note
                } 
            });
        }
    });
};

const readAllNotes = (req, res) => {
    const decoded = authJwt(req.token);

    getAllNotesByUserId({
        user_id: decoded.user_id
    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                message: 'OK',
                note: data
            });
        }
    });
};

const readNotesByTitle = (req, res) => {
    const decoded = authJwt(req.token);

    getSearchNotesByTitle({
        user_id: decoded.user_id,
        query: req.query
    }, (err, data) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                message: 'OK',
                note: data
            });
        }
    });
};

module.exports = {
    addNewNoteById,
    readAllNotes,
    readNotesByTitle
};