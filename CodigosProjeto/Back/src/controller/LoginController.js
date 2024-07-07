const connection = require("../config/db");
const dotenv = require("dotenv").config();

// LogIn / Buscar ID user (GET)

async function logIn(request, response) {
  const query =
    "SELECT id, name, email, password, 'user_empresa' as origin FROM jobs.user_empresa UNION SELECT id, name, email, password, 'user_jovem' as origin FROM jobs.user_jovem;";

  connection.query(query, (err, results) => {
    if (results) {
      response.status(201).json({
        sucess: true,
        message: "Sucesso com GET LogIn!!",
        data: results,
      });
    } else {
      response.status(400).json({
        sucess: false,
        message: "Ops, deu problemas com GET LogIn!",
        data: err,
      });
    }
  });
}

module.exports = {
  logIn,
}