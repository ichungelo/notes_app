const { generateBcrypt, authBcrypt } = require('../middleware/auth.bcrypt.js');
const { generateJwt } = require('../middleware/auth.jwt.js');
const { userSignUp, checkUsername, userSignIn, getUserId, tokenUserSignIn } = require('../model/user.model.js');

const addNewUser = async (req, res) => {
    const passwordhash = await generateBcrypt(req.body.password);

    checkUsername({
        username: req.body.username,
        email: req.body.email
    }, (err, data) => {
        if (err) {
            throw err;
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
                            status: 'OK',
                            message: 'User Added',
                            user: {
                                username: req.body.username,
                                email: req.body.email
                            }
                        });
                    }
                });
            } else {
                res.status(409).send({
                    status: 'Conflict',
                    message: 'Username or email already exist',
                    user: {
                        username: data.username,
                        email: data.email
                    }
                });
            }
        }
    });
};

const signInUser = (req, res) => {
    userSignIn({
        username: req.body.username,
        password: req.body.pasword
    }, async (err, data) => {
        if (err) {
            throw err;
        } else {
            const isValid = await authBcrypt(req.body.password, data.password);

            if (isValid) {
                getUserId({
                    username: req.body.username
                }, (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const token = generateJwt(
                            {
                                username: req.body.username,
                                user_id: data[0].user_id
                            }
                        );

                        res.cookie('token', token, {
                            httpOnly: true
                        });

                        tokenUserSignIn(
                            {
                                username: req.body.username,
                                token: token
                            },
                            (err) => {
                                if (err) {
                                    throw err;
                                } else {
                                    res.send({
                                        status: 'login success'
                                    });
                                }
                            }
                        );
                    }
                });
            } else {
                res.status(401).send({
                    message: 'Incorrect password'
                });
            }
        }
    });
};

module.exports = signInUser;

module.exports = {
    addNewUser,
    signInUser
};