const express = require('express'),
    connection = require('./config/conn.config'),
    cors = require('cors'),
    app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send({
        res: 'OK'
    });
});

app.use('/', require('./routes/route'));
app.listen(connection.port, () => console.log(`Example app listening on port ${connection.port}!`));