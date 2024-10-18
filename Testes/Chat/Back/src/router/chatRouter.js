const express = require('express');
const router = express.Router();

// Aqui você poderia definir rotas de chat se necessário
router.get('/', (req, res) => {
  res.send('Chat route');
});

module.exports = router;
