const express = require('express');
const path = require('path');

const app = express();

const messageRouter = require('./router/chatRouter');

app.use(express.json()); // Para lidar com JSON no body das requisições
app.use('/api', messageRouter);

// Servir arquivos estáticos da pasta correta
app.use(express.static(path.join(__dirname, '../../Front')));

// Servir o index.html quando acessar a rota "/"
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front/index.html'));
});

module.exports = app;