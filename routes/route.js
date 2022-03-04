const { addNewUser, signInUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/auth/signup').post(addNewUser);
router.route('/auth/signin').post(signInUser);

module.exports = router;