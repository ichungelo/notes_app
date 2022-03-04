const { userSignUp, checkUsername, userSignIn, getUserId, tokenUserSignIn } = require('../model/user.model.js'),
    dotenv = require('dotenv'),
    bcrypt = require('bcryptjs'),
    jwt = require('jsonwebtoken');

dotenv.config();

const addNewUser = async (req, res) => {
    if (req.body.username && req.body.email && req.body.password && req.body.confirm) {
        if (req.body.password === req.body.confirm) {
            const passwordhash = await bcrypt.hash(req.body.password, 10);
            console.log(passwordhash);

            checkUsername({
                username: req.body.username,
                email: req.body.email
            }, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    if (data == null) {
                        userSignUp({
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

const signInUser = (req, res) => {
    userSignIn({
        username: req.body.username,
        password: req.body.pasword
    }, async (err, data) => {
        if (err) {
            throw err;
        } else {
            const isValid = await bcrypt.compare(req.body.password, data.password);

            if (isValid) {
                getUserId({
                    username: req.body.username
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const token = jwt.sign(
                            {
                                username: req.body.username,
                                user_id: data[0].user_id
                            },
                            process.env.SECRET_KEY,
                        );

                        res.cookie('token', token, {
                            httpOnly: true
                        });

                        tokenUserSignIn(
                            {
                                username: req.body.username,
                                token: token
                            },
                            (err, data) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send({
                                        status: 'login success'
                                    });
                                    console.log(data);
                                }
                            }
                        );
                    }
                });
            }
            // res.send({
            //     status: data
            // });
        }
    });
};

module.exports = {
    addNewUser,
    signInUser
};