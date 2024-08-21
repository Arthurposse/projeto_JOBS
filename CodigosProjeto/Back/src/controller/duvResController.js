const connection = require("../config/db");
const dotenv = require("dotenv").config();

// Enviando dúvida (Usuário Jovem)
async function enviarDuvida(request, response) {
  const params = Array(
    request.body.id_user,
    request.body.duvida
  );

  const query = "INSERT INTO duvidas(id_user, duvida) VALUES (?, ?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com envio da dúvida!!",
        data: results
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com envio da dúvida!!",
        data: err
      });
    }
  });
}

// Respondendo dúvida (Usuário Jovem e Empresa)

async function responderDuvida(request, response) {
  const params = Array(
    request.body.email,
    request.body.password
  );

  const query = "";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com envio da resposta!!",
        data: results
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com envio da resposta!!",
        data: err
      });
    }
  });
}

module.exports = {
  enviarDuvida,
  responderDuvida
};