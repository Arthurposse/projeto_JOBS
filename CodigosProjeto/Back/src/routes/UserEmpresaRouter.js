const { Router } = require("express");
const router = Router();

const {
  userEmpresa,
  uptadeUserEmpresa,
} = require("../controller/UserEmpresaController");

// POST

router.post("/user/empresa", userEmpresa);

// PUT

router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

module.exports = router;