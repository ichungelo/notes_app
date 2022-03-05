const { addNewUser, signInUser } = require('../services/user.service.js');

const signup = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
            confirm
        } = req.body;

        if (!(username && email && password && confirm)) {
            return await res.status(400).send({
                message: 'Incomplete input'

            });
        }

        if (password !== confirm) {
            return await res.status(400).send({
                message: 'Password not match'
            });
        }

        await addNewUser(req, res);
    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};

const signin = async (req, res) => {
    
    try {
        const {
            username,
            password
        } = req.body;
    
        if (!(username && password)) {
            return await res.status(400).send({
                status: 'Incomplete input'
            });
        }
        
        signInUser(req, res);
    } catch (err) {
        console.error(err);
        return await res.status(500).send({
            message: 'Internal service error'
        });
    }
};

module.exports = {
    signup,
    signin
};