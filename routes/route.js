const { addNewUser } = require('../controllers/user.controller');

const router = require('express').Router();

router.route('/auth/signup').post(addNewUser);

module.exports = router;