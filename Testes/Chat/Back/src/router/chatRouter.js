const express = require('express');
const router = express.Router();
const { saveMessage } = require('../controller/chatController');

router.post('/messages', (req, res) => {
    const message = req.body;
    
    saveMessage(message, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao salvar mensagem' });
        }
        res.status(200).json({ message: 'Mensagem salva com sucesso!' });
    });
});

module.exports = router;