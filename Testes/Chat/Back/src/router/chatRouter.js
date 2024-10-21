// src/router/chatRouter.js
const express = require('express');
const router = express.Router();
const { saveMessage } = require('../controller/chatController');

router.post('/send', async (req, res) => {
    const { sender, receiver, text } = req.body;
    await saveMessage(sender, receiver, text);
    res.status(200).send('Mensagem salva com sucesso.');
});

module.exports = router;