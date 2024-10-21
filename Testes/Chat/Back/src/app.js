const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos da pasta correta
app.use(express.static(path.join(__dirname, '../../Front')));

// Servir o index.html quando acessar a rota "/"
app.get('/chat', (req, res) => {
    res.sendFile(path.join(__dirname, '../../Front/index.html'));
});

module.exports = app;