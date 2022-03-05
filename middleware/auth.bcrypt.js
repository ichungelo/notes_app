const bcrypt = require('bcryptjs');

const generateBcrypt = async (input) => {
    try {
        return await bcrypt.hash(input, 10);
    } catch (error) {
        console.error(error);
    }
};

const authBcrypt = async (password, hash) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    generateBcrypt,
    authBcrypt
};