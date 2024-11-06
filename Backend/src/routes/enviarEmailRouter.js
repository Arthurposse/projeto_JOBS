const { Router } = require("express");
const router = Router();

const { sendVerificationCode } = require("../controller/enviarEmailController");

/**
 * @swagger
 * /enviarEmail:
 *  post:
 *    summary: Envia o e-mail para o usuário, assim verificando o e-mail do usuário
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
router.post("/enviarEmail", sendVerificationCode);

module.exports = router;