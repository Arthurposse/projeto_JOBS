const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const router = require('./routes/MainRouter');
const enviarEmailRouter = require('./routes/enviarEmailRouter');


dotenv.config();

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api', enviarEmailRouter);

module.exports = app;