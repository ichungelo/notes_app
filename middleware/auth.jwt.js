const jwt = require('jsonwebtoken');

const generateJwt = (payload) => {
    try {
        const token = jwt.sign({
            username: payload.username,
            user_id: payload.user_id
        },
        process.env.SECRET_KEY);

        return token;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generateJwt
};

