const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
    try {
        const token = jwt.sign({
            username: payload.username,
            user_id: payload.user_id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '1h'
        });

        return token;
    } catch (error) {
        console.error(error);
    }
};

const authJwt = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generateJwt,
    authJwt
};

