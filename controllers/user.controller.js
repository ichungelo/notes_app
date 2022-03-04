const { addNewUser, signInUser } = require('../services/user.service.js');

const signup = async (req, res) => {
    const { 
        username,
        email,
        password,
        confirm
    } = req.body;

    if (!(username && email && password && confirm)) {
        return res.status(400).send({
            message: 'Incomplete input'

        });
    }

    if ( password !== confirm ) {
        return res.status(400).send({
            message: 'Password not match'
        });
    }

    try {
        await addNewUser(req, res);
    } catch (err) {
        return await res.status(500).send({
            error: err
        });
    }
};

const signin = async (req, res) => {
    const {
        username,
        password
    } = req.body;

    if (!(username && password)) {
        return res.status(400).send({
            status: 'Incomplete input'
        });
    }

    try {
        signInUser(req, res);
    } catch (err) {
        return await res.status(500).send({
            error: err
        });
    }
};

module.exports = {
    signup,
    signin
};