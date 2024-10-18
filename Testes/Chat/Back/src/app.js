const express = require('express');
const path = require('path');
const chatRouter = require('./router/chatRouter');

const app = express();

// Servindo os arquivos do front-end
app.use(express.static(path.join(__dirname, '../../front')));

// Rotas
app.use('/chat', chatRouter);

module.exports = app;
