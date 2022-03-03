const { userSignUp, checkUsername } = require('../model/user.model.js'),
    bcrypt = require('bcryptjs');

const addNewUser = async (req, res) => {
    if (req.body.username && req.body.email && req.body.password && req.body.confirm) {
        if (req.body.password === req.body.confirm) {
            const passwordhash = await bcrypt.hash(req.body.password, 10);

            await checkUsername({
                username: req.body.username,
                email: req.body.email
            }, async (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data == null) {
                        await userSignUp({
                            username: req.body.username,
                            email: req.body.email,
                            password: passwordhash
                        }, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.send({
                                    status: 'User Added',
                                    username: req.body.username,
                                    email: req.body.email
                                });
                            }
                        });
                    } else {
                        res.send({
                            status: 'Username or email already exist',
                            username: data.username,
                            email: data.email
                        });
                    }
                }
            });
        } else {
            res.send({
                status: 'password not match'
            });
        }
    } else {
        res.send({
            status: 'failed add user'
        });
    }
};

module.exports = {
    addNewUser
};