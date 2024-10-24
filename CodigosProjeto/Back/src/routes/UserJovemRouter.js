const { Router } = require("express");
const router = Router();

const {
  getUserJovem,
  getMetasJovem,
  getModulos,
  cadastroJovem,
  duvidaJovem,
  postMetasJovem,
  uptadeUserJovem,
  uptadeMetasJovem,
  deleteMetasJovem,
  envioCurriculo,
} = require("../controller/UserJovemController");

// GET

/**
 * @swagger
 * /get/userJovem/:id:
 *  get:
 *    summary: Busca os dados do usuário jovem dentro do BD 
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
router.get("/get/userJovem/:id", getUserJovem);

/**
 * @swagger
 * /metas/getMetas:
 *  get:
 *    summary: Busca as metas cadastradas ao usuário jovem
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
router.get("/metas/getMetas", getMetasJovem);

/**
 * @swagger
 * /modulosJovem:
 *  get:
 *    summary: Busca as questões do módulo selecionado dentro do BD
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
router.get("/modulosJovem", getModulos);

// POST

/**
 * @swagger
 * /cadastro/jovem:
 *  post:
 *    summary: Realiza o cadastro do usuário jovem
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
router.post("/cadastro/jovem", cadastroJovem);

/**
 * @swagger
 * /user/enviando_duvida:
 *  post:
 *    summary: Envia a dúvida do jovem para o BD
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
router.post("/user/enviando_duvida", duvidaJovem);

/**
 * @swagger
 * /metas/criando:
 *  post:
 *    summary: Realiza a criação da meta
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
router.post("/metas/criando", postMetasJovem);

// PUT

/**
 * @swagger
 * /uptade/userJovem/:id:
 *  put:
 *    summary: Atualiza os dados do usuário jovem
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
router.put("/uptade/userJovem/:id", uptadeUserJovem);

/**
 * @swagger
 * /metas/atualizando:
 *  put:
 *    summary: Altera o nome do criador (usuário jovem) que esta registrado na meta 
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
router.put("/metas/atualizando", uptadeMetasJovem);

/**
 * @swagger
 * /enviandoCurriculo/:id:
 *  put:
 *    summary: Envia o currículo para o BD
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
router.put("/enviandoCurriculo/:id", envioCurriculo);

// DELETE

/**
 * @swagger
 * /metas/deletando:
 *  delete:
 *    summary: Deleta a meta registrada no nome do usuário jovem
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
router.delete("/metas/deletando", deleteMetasJovem);

module.exports = router;