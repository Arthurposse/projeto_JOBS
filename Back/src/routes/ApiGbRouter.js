const { Router } = require("express");
const router = Router();

const { 
    api_gb_planejamento, 
    api_gb_dicas 
} = require("../controller/ApiGbController");

/**
 * @swagger
 * /apiGB_planejamento:
 *  post:
 *    summary: Envia o planejamento gerado pela API do Gemini
 *    responses:
 *      200:
 *        description: Sucesso!!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 
 */
router.post("/apiGB_planejamento", api_gb_planejamento);

/**
 * @swagger
 * /apiGB_dicas:
 *  post:
 *    summary: Envia a dica gerada pela API do Gemini
 *    responses:
 *      200:
 *        description: Sucesso!!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: 
 */
router.post("/apiGB_dicas", api_gb_dicas);

module.exports = router;
