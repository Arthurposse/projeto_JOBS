const { connection } = require("../config/db");
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
  const params = Array(
    request.body.id_user,
    request.body.id_duvida,
    request.body.resposta,
    request.body.tipo_usuario
  );

  let query;

  if (request.body.tipo_usuario === 'Jovem') {
    query = "INSERT INTO respostas(id_jovem, id_duvida, resposta, type_user) VALUES (?, ?, ?, ?)";
  }
  else if (request.body.tipo_usuario === 'Empresa') {
    query = "INSERT INTO respostas(id_empresa, id_duvida, resposta, type_user) VALUES (?, ?, ?, ?)";
  }
  else {
    console.log('Deu ERRO!!');
  }

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

  const query = "SELECT * FROM duvidas WHERE id_user != ?";

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

// Carregando as dúvidas do usuário (Usuário Jovem)

async function carregarDuvidasUser(request, response) {
  const params = [request.body.id_user];

  const query = "SELECT * FROM duvidas WHERE id_user = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com a busca das duvidas do usuário!!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com a busca das duvidas do usuário!!",
        errorDetails: err.message,
      });
    }
  });
}

// Carregando as respostas da dúvida (Usuário Jovem e Empresa)

async function carregarRespostas(request, response) {
  const params = [request.body.id_duvida];

  const query = "SELECT r.id, r.id_jovem, r.id_empresa, r.id_duvida, r.resposta, r.type_user, CASE WHEN r.type_user = 'Jovem' THEN uj.name WHEN r.type_user = 'Empresa' THEN ue.name END AS nome_usuario FROM respostas r LEFT JOIN user_jovem uj ON r.id_jovem = uj.id LEFT JOIN user_empresa ue ON r.id_empresa = ue.id WHERE r.id_duvida = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com a busca das respostas!!",
        data: results
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com a busca das respostas!!",
        data: err
      });
    }
  });
}

// Carregando as informações das dúvidas da tela para responder a dúvida (Usuário Jovem e Empresa)

async function carregarInfosDuvida(request, response) {
  const params = [
    request.body.id_duvida
  ];

  const query = "SELECT * FROM duvidas WHERE id_duvida = ?";

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

// Deletando dúvida Usuário Jovem (DELETE)

async function deleteDuvJovem(request, response) {
  const params = [request.body.id_duvida];

  const query = "DELETE FROM respostas WHERE id_duvida = ?;";

  connection.query(query, params, (err, results) => {
    if (err) {
      return response.status(400).json({
        success: false,
        message: "Ops, deu problemas ao deletar as respostas da dúvida!!",
        data: err,
      });
    }

    const params_ = [request.body.id_user, request.body.id_duvida];

    const query_ = "DELETE FROM duvidas WHERE id_user = ? AND id_duvida = ?;";

    connection.query(query_, params_, (err, results) => {
      if (err) {
        return response.status(400).json({
          success: false,
          message: "Ops, deu problemas ao deletar a dúvida!!",
          data: err,
        });
      }

      return response.status(201).json({
        success: true,
        message: "Sucesso ao deletar a dúvida e suas respostas!!",
        data: results,
      });
    });
  });
}


module.exports = {
  enviarDuvida,
  responderDuvida,
  carregarDuvidas,
  carregarDuvidasUser,
  carregarRespostas,
  carregarInfosDuvida,
  deleteDuvJovem
};