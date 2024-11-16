// src/router/chatRouter.js
const express = require("express");
const { getMessages, buscaUsuarios, getConversas, getUserNamesByConversations } = require("../controller/chatController"); // Importa diretamente de chatController

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

// Rota para buscar os usuário filtrados a partir da pesquisa do usuário logado
router.post("/buscar/usuarios", buscaUsuarios);

// Rota para pegar os nomes dos usuários que o usuário logado já conversou
router.get('/conversas/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const conversas = await getConversas(userId);
        res.json(conversas);
    } catch (error) {
        console.error('Erro ao carregar conversas:', error);
        res.status(500).json({ error: 'Erro ao carregar conversas' });
    }
});

module.exports = router;