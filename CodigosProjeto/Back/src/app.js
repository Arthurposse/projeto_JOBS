const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

const routerJovem = require('./routes/UserJovemRouter');
const routerEmpresa = require('./routes/UserEmpresaRouter');
const enviarEmailRouter = require('./routes/enviarEmailRouter');

dotenv.config();

app.set('port', process.env.PORT || 3008);
app.use(cors());
app.use(express.json());

app.use('/api', routerJovem);
app.use('/api', routerEmpresa);
app.use('/api', enviarEmailRouter);

module.exports = app;