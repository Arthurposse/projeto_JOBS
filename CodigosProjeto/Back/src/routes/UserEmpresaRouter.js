const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  getDadosUser,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  putVagas,
  putDadosVagas,
  deleteVagas,
  buscaCurriculos,
  sorteandoDuvida
} = require("../controller/UserEmpresaController");

// GET
router.get("/vagas/getVagas", getVagas);

router.get("/buscandoDados/:id", getDadosUser);

router.get("/duvidasSorteadas", sorteandoDuvida);

// POST
router.post("/cadastro/empresa", cadastroEmpresa);

router.post("/vagas/criandoVaga", criandoVaga);

router.post("/buscandoCurriculos", buscaCurriculos);

// PUT
router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

router.put("/vagas/putVagas", putVagas);

router.put("/vagas/putDadosVaga", putDadosVagas);

// DELETE
router.delete("/vagas/deletandoVaga", deleteVagas);

module.exports = router;
