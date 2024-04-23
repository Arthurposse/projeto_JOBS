const express = require('express');
const server = express();
const infos_json = require('./infos.json');

const porta = 3000;

server.listen(porta, () => {
    console.log(`Rodando na porta ${porta}!!`)
});

// server.get('/teste', (req, res) => {
//     return res.json({usuario: 'Teste da Silva'})
// });

server.get('/users', (req, res) => {
    return res.json(`ID: ${infos_json[0].id}, EMAIL: ${infos_json[0].email}`);
});