const { Router } = require("express");
const router = Router();

const { logIn } = require("../controller/LoginController");

/**
 * @swagger
 * /verif/logIn:
 *  post:
 *    summary: Verifica se o usuário já esta cadastrado no BD
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
router.post("/verif/logIn", logIn);

module.exports = router;