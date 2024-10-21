// src/controller/chatController.js
const db = require('../config/db');

const saveMessage = async (sender, receiver, text) => {
    try {
        const query = 'INSERT INTO messages (sender, receiver, text) VALUES (?, ?, ?)';
        await db.query(query, [sender, receiver, text]);
    } catch (error) {
        console.error('Erro ao salvar a mensagem:', error);
    }
};

module.exports = { saveMessage };
