const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Rota para salvar mensagens no banco de dados
router.post('/messages', (req, res) => {
    const message = req.body;
    const query = 'INSERT INTO messages (content, user, toUser) VALUES (?, ?, ?)';
    
    db.query(query, [message.content, message.user, message.to], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar mensagem' });
        }
        res.status(200).json({ message: 'Mensagem salva com sucesso!' });
    });
});

module.exports = router;
