const connection = require("../config/db");
const dotenv = require("dotenv").config();

// Cadastrando Usuário (POST)

async function cadastroEmpresa(request, response) {
  const params = Array(
    request.body.name,
    request.body.email,
    request.body.password,
    request.body.telefone,
    request.body.cidade,
    request.body.razao_social,
    request.body.cnpj,
    request.body.setor_atividade
  );

  const query = "INSERT INTO user_empresa(name, email, password, telefone, cidade, razao_social, cnpj, setor_atividade) VALUES(?,?,?,?,?,?,?,?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// Buscando dados usuário (GET)
async function getDadosUser(request, response) {
  const query = "SELECT * FROM user_empresa;";

  connection.query(query, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// let data = { nome_user, email_user, telefone_user, empresa_user, setor_atividade_user };

// Atualizando dados do usuário (PUT)
async function uptadeUserEmpresa(request, response) {
  const params = Array(
    // request.body.ft_user,
    request.body.name,
    request.body.email,
    request.body.telefone,
    request.body.empresa,
    request.body.setor_atividade,
    request.params.id
  );

  // SEM var ft_user
  const query =
    "UPDATE `user_empresa` SET `name` = ?, `email` = ?, `telefone` = ?, `nome_empresa` = ?, `setor_atividade` = ? WHERE `id` = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com PUT user jovem!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas PUT user jovem!",
        data: err,
      });
    }
  });
}

// Criando vaga (POST)
async function criandoVaga(request, response) {
  const params = Array(
    request.body.User_name,
    request.body.titulo_vaga,
    request.body.area,
    request.body.cidade,
    request.body.faixaEtaria,
    request.body.descricao
  );

  const query =
    "INSERT INTO vagas(criador_vaga, titulo_vaga, area, cidade, faixa_etaria, descricao) VALUES(?,?,?,?,?,?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// Buscando vagas (GET)
async function getVagas(request, response) {
  const query = "SELECT * FROM vagas;";

  connection.query(query, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// Deletando vaga (DELETE)
async function deleteVagas(request, response) {
  const params = Array(request.body.vagas_deletar);

  const query = "DELETE FROM vagas WHERE `titulo_vaga` = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com DELETE vaga!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com DELETE vaga!",
        data: err,
      });
    }
  });
}

module.exports = {
  cadastroEmpresa,
  getDadosUser,
  uptadeUserEmpresa,
  criandoVaga,
  getVagas,
  deleteVagas
};