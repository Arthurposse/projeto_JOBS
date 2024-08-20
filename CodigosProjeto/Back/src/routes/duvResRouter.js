const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
} = require("../controller/duvResController");

router.post("/enviarDuvida", enviarDuvida);
router.post("/responderDuvida", responderDuvida);

module.exports = router;