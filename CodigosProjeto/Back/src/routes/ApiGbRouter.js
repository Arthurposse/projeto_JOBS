const { Router } = require("express");
const router = Router();

const { apiGoogleBard } = require("../controller/ApiGbController");

router.get("/apiGB", apiGoogleBard);

module.exports = router;