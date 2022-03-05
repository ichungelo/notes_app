const { authJwt } = require('../middleware/auth.jwt');
const { createNewNote } = require('../model/note.model');

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

module.exports = addNewNoteById;