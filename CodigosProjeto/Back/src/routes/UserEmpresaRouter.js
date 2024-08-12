const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  uptadeUserEmpresa,
  criandoVaga
} = require("../controller/UserEmpresaController");

// POST

router.post("/cadastro/empresa", cadastroEmpresa);

router.post("/criandoVaga", criandoVaga);

// PUT

router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

module.exports = router;