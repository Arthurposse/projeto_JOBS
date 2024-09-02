const connection = require("../config/db");
const dotenv = require("dotenv").config();

// Cadastrando Usuário (POST)

async function cadastroEmpresa(request, response) {
  const params = Array(
    request.body.name,
    request.body.email,
    request.body.password,
    request.body.telefone,
    request.body.nome_empresa,
    request.body.razao_social,
    request.body.cnpj,
    request.body.setor_atividade
  );

  const query = "INSERT INTO user_empresa(name, email, password, telefone, nome_empresa, razao_social, cnpj, setor_atividade) VALUES(?,?,?,?,?,?,?,?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
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
        success: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// Atualizando dados do usuário (PUT)

async function uptadeUserEmpresa(request, response) {
  const params = [
    request.body.nome_user,
    request.body.email_user,
    request.body.telefone_user,
    request.body.empresa_user,
    request.body.setor_atividade_user,
    request.params.id
  ];

  const query = `
    UPDATE user_empresa 
    SET name = ?, email = ?, telefone = ?, nome_empresa = ?, setor_atividade = ? 
    WHERE id = ?;
  `;

  connection.query(query, params, (err, results) => {
    if (err) {
      return response.status(400).json({
        success: false,
        message: "Erro ao atualizar os dados!",
        data: err,
      });
    }

    response.status(201).json({
      success: true,
      message: "Dados atualizados com sucesso!",
      data: results,
    });
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
        success: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
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
        success: true,
        message: "Sucesso!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas!",
        data: err,
      });
    }
  });
}

// Atualizando usuário relacionado a vaga (PUT)

async function putVagas(request, response) {
  const params = Array(request.body.nome, request.body.nome_antigo);

  const query = "UPDATE `vagas` SET `criador_vaga` = ? WHERE `criador_vaga` = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com PUT VAGAS!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com PUT VAGAS!",
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
        success: true,
        message: "Sucesso com DELETE vaga!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
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
  putVagas,
  deleteVagas
};