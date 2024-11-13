// src/router/chatRouter.js
const express = require("express");
const { getMessages } = require("../controller/chatController"); // Importa diretamente de chatController

const router = express.Router();

// Rota para pegar o histórico de mensagens de uma sala
router.get("/history/:roomId", async (req, res) => {
    const roomId = req.params.roomId;
    try {
        const messages = await getMessages(roomId);
        res.json({ messages });
    } catch (err) {
        res.status(500).json({ error: "Erro ao buscar mensagens" });
    }
});

module.exports = router;