const { Router } = require("express");
const router = Router();

const {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas,
  carregarRespostas,
  carregarInfosDuvida
} = require("../controller/duvResController");

// POST

/**
 * @swagger
 * /enviarDuvida:
 *  post:
 *    summary: Envia a dúvida do usuário para o BD
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
router.post("/enviarDuvida", enviarDuvida);

/**
 * @swagger
 * /responderDuvida:
 *  post:
 *    summary: Envia a resposta do usuário para o BD
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
router.post("/responderDuvida", responderDuvida);

/**
 * @swagger
 * /carregarDuvidas:
 *  post:
 *    summary: Envia as dúvidas já registradas dentro do BD para o Front
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
router.post("/carregarDuvidas", carregarDuvidas);

/**
 * @swagger
 * /carregarRespostas:
 *  post:
 *    summary: Carrega as respostas dos usuário para uma dúvida
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
router.post("/carregarRespostas", carregarRespostas);

/**
 * @swagger
 * /carregarInfosDuvida:
 *  post:
 *    summary: Carrega os dados da dúvida
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
router.post("/carregarInfosDuvida", carregarInfosDuvida);

module.exports = router;