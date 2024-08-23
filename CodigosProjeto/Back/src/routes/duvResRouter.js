const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas,
  carregarInfosDuvida
} = require("../controller/duvResController");

// POST
router.post("/enviarDuvida", enviarDuvida);
router.post("/responderDuvida", responderDuvida);
router.post("/carregarDuvidas", carregarDuvidas);
router.post("/carregarInfosDuvida", carregarInfosDuvida);

module.exports = router;