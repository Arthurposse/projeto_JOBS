const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas
} = require("../controller/UserEmpresaController");

// GET

router.get("/vagas/getVagas", getVagas);

// POST

router.post("/cadastro/empresa", cadastroEmpresa);

router.post("/vagas/criandoVaga", criandoVaga);

// PUT

router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

module.exports = router;