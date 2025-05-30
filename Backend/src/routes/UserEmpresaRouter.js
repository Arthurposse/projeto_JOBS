const { Router } = require("express");
const router = Router();

const {
  cadastroEmpresa,
  deleteUsuarioEmpresa,
  getDadosUser,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  putDadosVagas,
  deleteVagas,
  buscaCurriculos,
  sorteandoDuvida,
  quantDownloadsCurriculo
} = require("../controller/UserEmpresaController");

// GET

/**
 * @swagger
 * /vagas/getVagas/:id:
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
router.get("/vagas/getVagas/:id", getVagas);


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
 * /vagas/criandoVaga/:id:
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
router.post("/vagas/criandoVaga/:id", criandoVaga);

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
router.post("/curriculo/buscando", buscaCurriculos);

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

/**
 * @swagger
 * /curriculo/quant_downloads/:id:
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
router.put("/curriculo/quant_downloads/:id", quantDownloadsCurriculo);

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
router.delete("/vagas/deletandoVaga/:id", deleteVagas);

/**
 * @swagger
 * /usuario/empresa/deletando/:id:
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
router.delete("/usuario/empresa/deletando/:id", deleteUsuarioEmpresa);

module.exports = router;