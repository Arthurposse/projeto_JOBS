const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas,
  carregarRespostas,
  carregarInfosDuvida
} = require("../controller/duvResController");

// POST
router.post("/enviarDuvida", enviarDuvida);
router.post("/responderDuvida", responderDuvida);
router.post("/carregarDuvidas", carregarDuvidas);
router.post("/carregarRespostas", carregarRespostas);
router.post("/carregarInfosDuvida", carregarInfosDuvida);

module.exports = router;