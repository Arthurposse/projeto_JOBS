const { Router } = require("express");
const router = Router();

const { apiGoogleBard } = require("../controller/ApiGbController");

router.post("/apiGB", apiGoogleBard);

module.exports = router;