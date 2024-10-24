const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  getDadosUser,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  putVagas,
  putDadosVagas,
  deleteVagas,
  buscaCurriculos,
  sorteandoDuvida
} = require("../controller/UserEmpresaController");

// GET

/**
 * @swagger
 * /vagas/getVagas:
 *  get:
 *    summary: Busca as vagas cadastradas ao usuário empresa
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
router.get("/vagas/getVagas", getVagas);


/**
 * @swagger
 * /buscandoDados/:id:
 *  get:
 *    summary: Busca os dados do usuário empresa dentro do BD 
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
router.get("/buscandoDados/:id", getDadosUser);

/**
 * @swagger
 * /duvidasSorteadas:
 *  get:
 *    summary: Faz a busca de dúvidas aleatórias dentro do BD
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
router.get("/duvidasSorteadas", sorteandoDuvida);

// POST

/**
 * @swagger
 * /cadastro/empresa:
 *  post:
 *    summary: Realiza o cadastro do usuário empresa
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
router.post("/cadastro/empresa", cadastroEmpresa);

/**
 * @swagger
 * /vagas/criandoVaga:
 *  post:
 *    summary: Realiza a criação da vaga
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
router.post("/vagas/criandoVaga", criandoVaga);

/**
 * @swagger
 * /buscandoCurriculos:
 *  post:
 *    summary: Realiza a busca de currículos dos usuários jovem
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
router.post("/buscandoCurriculos", buscaCurriculos);

// PUT

/**
 * @swagger
 * /uptade/userEmpresa/:id:
 *  put:
 *    summary: Atualiza os dados do usuário empresa
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
router.put("/uptade/userEmpresa/:id", uptadeUserEmpresa);

/**
 * @swagger
 * /vagas/putVagas:
 *  put:
 *    summary: Altera o nome do criador (usuário empresa) que esta registrado na meta
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
router.put("/vagas/putVagas", putVagas);

/**
 * @swagger
 * /vagas/putDadosVaga:
 *  put:
 *    summary: Atualiza os dados da vaga registrada no nome do usuário empresa
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
router.put("/vagas/putDadosVaga", putDadosVagas);

// DELETE

/**
 * @swagger
 * /vagas/deletandoVaga:
 *  delete:
 *    summary: Deleta a vaga registrada no nome do usuário empresa
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
router.delete("/vagas/deletandoVaga", deleteVagas);

module.exports = router;