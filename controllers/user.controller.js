const userSignUp = (req, res) => {
    if (req.body.username && req.body.email && req.body.password) {
        res.send({
            status: 'User Added'
        });
    } else {
        res.send({
            status: 'failed add user'
        });
    }
};

module.exports = {
    userSignUp
};