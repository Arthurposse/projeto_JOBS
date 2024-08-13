const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  deleteVagas
} = require("../controller/UserEmpresaController");

// GET

router.get("/vagas/getVagas", getVagas);

// POST

router.post("/cadastro/empresa", cadastroEmpresa);

router.post("/vagas/criandoVaga", criandoVaga);

// PUT

router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

// DELETE

router.delete("/vagas/deletandoVaga", deleteVagas);

module.exports = router;