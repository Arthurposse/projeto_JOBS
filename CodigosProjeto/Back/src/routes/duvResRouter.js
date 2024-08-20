const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
} = require("../controller/duvResController");

router.post("/enviando_duvida", enviarDuvida);
router.post("/", responderDuvida);

module.exports = router;