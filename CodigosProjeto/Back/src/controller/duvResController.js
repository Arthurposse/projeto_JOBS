const connection = require("../config/db");
const dotenv = require("dotenv").config();

// Enviando dúvida (Usuário Jovem)
async function enviarDuvida(request, response) {
  const params = Array(
    request.body.id_user,
    request.body.User_name,
    request.body.duvida
  );

  const query = "INSERT INTO duvidas(id_user, nome_user, duvida) VALUES (?, ?, ?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com envio da dúvida!!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com envio da dúvida!!",
        data: err
      });
    }
  });
}

// Respondendo dúvida (Usuário Jovem e Empresa)

async function responderDuvida(request, response) {
  // const params = Array(
  //   request.body.email,
  //   request.body.password
  // );

  const query = "";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com envio da resposta!!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com envio da resposta!!",
        data: err
      });
    }
  });
}

// Carregando as dúvidas (Usuário Jovem e Empresa)

async function carregarDuvidas(request, response) {
  const params = [request.body.id_user];

  const query = "SELECT id_user, duvida FROM duvidas WHERE id_user != ?";
  // const query = "SELECT id_user, nome_user, duvida FROM duvidas";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com a busca das duvidas!!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com a busca das duvidas!!",
        data: err
      });
    }
  });
}

module.exports = {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas
};