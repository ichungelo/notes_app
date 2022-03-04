const { signin, signup } = require('../controllers/user.controller.js');

const router = require('express').Router();

router.route('/auth/signup').post(signup);
router.route('/auth/signin').post(signin);
router.route('/notes')
    .get()
    .post();

router.route('notes/:id');
module.exports = router;