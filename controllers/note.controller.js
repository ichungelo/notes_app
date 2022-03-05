const {addNewNoteById, readAllNotes, readNotesByTitle } = require('../services/note.service.js');

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



module.exports = {
    createNote,
    getAllNotes,
    getNotesByTitle,
    // updateNote,
    // deleteNote
};