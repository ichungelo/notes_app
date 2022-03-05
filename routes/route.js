const { createNote, getAllNotes, getNotesByTitle, updateNote, deleteNote } = require('../controllers/note.controller.js');
const { signin, signup } = require('../controllers/user.controller.js');

const router = require('express').Router();

router.route('/auth/signup').post(signup);
router.route('/auth/signin').post(signin);
router.route('/notes')
    .get(getAllNotes)
    .post(createNote)
    // .update(updateNote)
    // .delete(deleteNote);
router.route('/notes/search/:query').get(getNotesByTitle);
module.exports = router;