const { authJwt } = require('../middleware/auth.jwt');
const { createNewNote, getAllNotesByUserId, getSearchNotesByTitle, updateNoteByIdModel, deleteNoteByIdModel } = require('../model/note.model');

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

const updateNoteById = (req, res) => {
    const {
        token,
        note_id,
        title,
        note
    } = req;
    const decoded = authJwt(token);
    updateNoteByIdModel({
        user_id: decoded.user_id,
        note_id: note_id,
        title: title,
        note: note
    }, (err) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                message: 'Note Updated'
            });
        }
    });
};

const deleteNoteById = (req, res) => {
    const {
        token,
        note_id
    } = req;
    const decoded = authJwt(token);

    deleteNoteByIdModel({
        user_id: decoded.user_id,
        note_id: note_id
    }, (err) => {
        if (err) {
            console.error(err);
        } else {
            res.send({
                message: 'Note deleted'
            });
        }
    });
};



module.exports = {
    addNewNoteById,
    readAllNotes,
    readNotesByTitle,
    updateNoteById, 
    deleteNoteById
};