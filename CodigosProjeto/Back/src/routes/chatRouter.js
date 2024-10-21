const express = require('express');
const router = express.Router();

// Aqui você pode definir rotas de chat, se necessário
router.get('/', (req, res) => {
    res.send('Chat route');
});

// Exporta o roteador
module.exports = router; 