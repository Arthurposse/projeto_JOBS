const { Router } = require("express");
const router = Router();

const { logIn } = require("../controller/LoginController");

// GET

router.get("/verif/logIn", logIn);

module.exports = router;