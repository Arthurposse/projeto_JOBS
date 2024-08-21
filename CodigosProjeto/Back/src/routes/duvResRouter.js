const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas
} = require("../controller/duvResController");

// POST
router.post("/enviarDuvida", enviarDuvida);
router.post("/responderDuvida", responderDuvida);
router.post("/carregarDuvidas", carregarDuvidas);

module.exports = router;