const connection = require("../config/db");
const dotenv = require("dotenv").config();

// LogIn / Buscar ID user (POST)

async function logIn(request, response) {

  const params = Array(
    request.body.email,
    request.body.password,
    request.body.email,
    request.body.password
  );

  const query =
    "SELECT id, name, email, password, nome_empresa, 'user_empresa' AS origin FROM jobs.user_empresa WHERE email = ? AND password = ? UNION SELECT id, name, email, password, NULL AS nome_empresa, 'user_jovem' AS origin FROM jobs.user_jovem WHERE email = ? AND password = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com a busca do usuário!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com a busca do usuário!!",
        data: err,
      });
    }
  });
}

module.exports = {
  logIn
}