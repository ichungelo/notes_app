const {addNewNoteById, readAllNotes, readNotesByTitle, updateNoteById, deleteNoteById } = require('../services/note.service.js');

const createNote = async (req, res) => {
    
    try {
        const token = req.cookies.token;
        const {
            title,
            note
        } = req.body;

        if (!(title && note)) {
            return await res.status(400).send({
                message: 'Incomplete input'

            });
        }

        if (token === undefined) {
            return await res.status(401).send({
                message: 'You should signin first'
            });
        }
        addNewNoteById({
            token: token,
            title: title,
            note: note
        }, res);

    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token === undefined) {
            return await res.status(401).send({
                message: 'You should signin first'
            });
        }

        readAllNotes({
            token: token
        }, res);
    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};

const getNotesByTitle = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token === undefined) {
            return await res.status(401).send({
                message: 'You should signin first'
            });
        }

        readNotesByTitle({
            token: token,
            query: req.params.query
        }, res);

    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });

    }
};

const updateNote = async (req, res) => {
    try {
        const token = req.cookies.token;
        const {
            note_id,
            title,
            note
        } = req.body;

        if (token === undefined) {
            return await res.status(401).send({
                message: 'You should signin first'
            });
        }

        if (!(note_id && title && note)) {
            return await res.status(400).send({
                message: 'Incomplete input'

            });
        }


        updateNoteById({
            token: token,
            note_id: note_id,
            title: title,
            note: note
        }, res);

    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};

const deleteNote = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (token === undefined) {
            return await res.status(401).send({
                message: 'You should signin first'
            });
        }

        if (!req.body.note_id) {
            return await res.status(400).send({
                message: 'Incomplete input'

            });
        }

        deleteNoteById({
            token: token,
            note_id: req.body.note_id
        }, res);

    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};


module.exports = {
    createNote,
    getAllNotes,
    getNotesByTitle,
    updateNote,
    deleteNote
};