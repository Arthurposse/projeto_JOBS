const { Router } = require("express");
const router = Router();

const { BuscarVaga } = require("../controller/BuscarVagaController");

/**
 * @swagger
 * /buscarVaga:
 *  post:
 *    summary: Envia as vagas buscadas dentro da API da Adzuna a partir de uma pesquisa personalizada
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
router.post("/buscarVaga", BuscarVaga);

module.exports = router;