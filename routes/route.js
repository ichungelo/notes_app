const { createNote, getAllNotes } = require('../controllers/note.controller.js');
const { signin, signup } = require('../controllers/user.controller.js');

const router = require('express').Router();

router.route('/auth/signup').post(signup);
router.route('/auth/signin').post(signin);
router.route('/notes')
    .get(getAllNotes)
    .post(createNote);
router.route('notes/:id');
module.exports = router;