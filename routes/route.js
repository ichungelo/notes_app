const { userSignUp } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/auth/signup').post(userSignUp);

module.exports = router;