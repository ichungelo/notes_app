const configConn = {
    host: process.env.CONN_HOST || 'localhost',
    port: process.env.CONN_PORT || '3000'
};

module.exports = configConn;