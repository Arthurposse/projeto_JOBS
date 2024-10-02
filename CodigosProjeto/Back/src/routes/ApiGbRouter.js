const { Router } = require("express");
const router = Router();

const { 
    api_gb_planejamento, 
    api_gb_dicas 
} = require("../controller/ApiGbController");

router.post("/apiGB_planejamento", api_gb_planejamento);
router.post("/apiGB_dicas", api_gb_dicas)

module.exports = router;