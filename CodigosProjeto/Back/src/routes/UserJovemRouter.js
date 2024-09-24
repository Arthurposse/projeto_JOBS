const { Router } = require("express");
const router = Router();

const {
  getUserJovem,
  getMetasJovem,
  getModulos,
  cadastroJovem,
  duvidaJovem,
  postMetasJovem,
  uptadeUserJovem,
  uptadeMetasJovem,
  deleteMetasJovem,
  envioCurriculo,
} = require("../controller/UserJovemController");

// GET

router.get("/get/userJovem/:id", getUserJovem);

router.get("/metas/getMetas", getMetasJovem);

router.get("/modulosJovem", getModulos);

// POST

router.post("/cadastro/jovem", cadastroJovem);

router.post("/user/enviando_duvida", duvidaJovem);

router.post("/metas/criando", postMetasJovem);

// PUT

router.put("/uptade/userJovem/:id", uptadeUserJovem);

router.put("/metas/atualizando", uptadeMetasJovem);

router.put("/enviandoCurriculo/:id", envioCurriculo);

// DELETE

router.delete("/metas/deletando", deleteMetasJovem);

module.exports = router;