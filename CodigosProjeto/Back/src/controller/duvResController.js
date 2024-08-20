const connection = require("../config/db");
const dotenv = require("dotenv").config();

// Enviando dúvida (Usuário Jovem)
async function enviarDuvida(request, response) {
  const params = Array(
    request.params.id,
    // request.body
  );

  const query =
    "INTERT INTO(id_user, duvida) VALUES (?, ?);";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com envio da dúvida!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com envio da dúvida!!!!",
        data: err,
      });
    }
  });
}

// Respondendo dúvida (Usuário Jovem e Empresa)

async function responderDuvida(request, response) {
  const params = Array(
    request.body.email,
    request.body.password,
  );

  const query =
    "SELECT id, name, email, password, nome_empresa, 'user_empresa' AS origin FROM jobs.user_empresa WHERE email = ? AND password = ? UNION SELECT id, name, email, password, NULL AS nome_empresa, 'user_jovem' AS origin FROM jobs.user_jovem WHERE email = ? AND password = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com a busca do usuário!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com a busca do usuário!!",
        data: err,
      });
    }
  });
}

module.exports = {
  enviarDuvida,
  responderDuvida
};
