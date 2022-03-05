const express = require('express'),
    connection = require('./config/conn.config'),
    cors = require('cors'),
    dotenv = require('dotenv'),
    cookieParser = require('cookie-parser'),
    app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
dotenv.config();

app.route('*').all((req, res) => {
    res.status(404).send({
        message: 'Not found'
    });
});

app.use('/api', require('./routes/router.js'));

app.listen(connection.port, () => console.log(`Example app listening ${connection.host}:${connection.port}!`));