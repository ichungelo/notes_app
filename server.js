const express = require('express'),
    connection = require('./config/conn.config'),
    cors = require('cors'),
    dotenv = require('dotenv'),
    app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.get('/', (req, res) => {
    res.send({
        res: 'OK'
    });
});

app.use('/api', require('./routes/route'));

app.listen(connection.port, () => console.log(`Example app listening ${connection.host}:${connection.port}!`));