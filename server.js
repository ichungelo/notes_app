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

app.get('/', (req, res) => {
    console.log(req.cookies);
    res.send({
        res: 'OK',
        token: req.cookies.token
    });
});

app.use('/api', require('./routes/route'));

app.listen(connection.port, () => console.log(`Example app listening ${connection.host}:${connection.port}!`));