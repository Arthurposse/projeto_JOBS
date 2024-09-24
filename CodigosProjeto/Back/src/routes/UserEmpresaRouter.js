const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  getDadosUser,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  putVagas,
  deleteVagas,
  buscaCurriculos
} = require("../controller/UserEmpresaController");

// GET
router.get("/vagas/getVagas", getVagas);

router.get("/buscandoDados/:id", getDadosUser);

router.get("/buscandoCurriculos", buscaCurriculos);

// POST
router.post("/cadastro/empresa", cadastroEmpresa);

router.post("/vagas/criandoVaga", criandoVaga);

// PUT
router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

router.put("/vagas/putVagas", putVagas);

// DELETE
router.delete("/vagas/deletandoVaga", deleteVagas);

module.exports = router;
