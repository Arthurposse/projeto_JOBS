const { Router } = require("express");
const router = Router();

const { BuscarVaga } = require("../controller/BuscarVagaController");

router.post("/buscarVaga", BuscarVaga);

module.exports = router;