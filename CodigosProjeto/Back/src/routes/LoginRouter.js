const { Router } = require("express");
const router = Router();

const { logIn } = require("../controller/LoginController");

// POST

router.post("/verif/logIn", logIn);

module.exports = router;