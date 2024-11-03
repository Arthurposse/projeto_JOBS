const connection = require("../config/db");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");

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

  const query =
    "INSERT INTO user_empresa(name, email, password, telefone, nome_empresa, razao_social, cnpj, setor_atividade) VALUES(?,?,?,?,?,?,?,?);";

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
        errorDetails: err.message
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
  // Verifique se há arquivos no request
  if (!request.files || !request.files.ft_user) {
    // Se não houver arquivos, execute o bloco de código sem imagem
    const params = Array(
      request.body.nome_user,
      request.body.email_user,
      request.body.telefone_user,
      request.body.empresa_user,
      request.body.setor_atividade_user,
      request.params.id,
    );

    const query =
      "UPDATE `user_empresa` SET `name` = ?, `email` = ?, `telefone` = ?, `nome_empresa` = ?, `setor_atividade` = ? WHERE `id` = ?;";

    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(201).json({
          success: true,
          message: "Sucesso com PUT user empresa!!",
          data: results,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Ops, deu problemas PUT user empresa!",
          data: err,
        });
      }
    });
  } else {
    // Se houver um arquivo de imagem, processe o upload
    const imagem = request.files.ft_user;
    const imagemNome = Date.now() + path.extname(imagem.name);

    const imgPerfilPath = path.join(__dirname, "..", "uploads", "img_perfil");

    imagem.mv(path.join(imgPerfilPath, imagemNome), (erro) => {
      if (erro) {
        return response.status(400).json({
          success: false,
          message: "Erro ao mover o arquivo.",
        });
      } else {
        const params = Array(
          imagemNome,
          request.body.nome_user,
          request.body.email_user,
          request.body.telefone_user,
          request.body.empresa_user,
          request.body.setor_atividade_user,
          request.params.id,
        );

        const query =
          "UPDATE `user_empresa` SET `ft_perfil` = ?, `name` = ?, `email` = ?, `telefone` = ?, `nome_empresa` = ?, `setor_atividade` = ? WHERE `id` = ?;";

        connection.query(query, params, (err, results) => {
          if (results) {
            response.status(201).json({
              success: true,
              message: "Sucesso com PUT user empresa!!",
              data: results,
            });
          } else {
            response.status(400).json({
              success: false,
              message: "Ops, deu problemas com o envio da foto!!",
              data: err,
            });
          }
        });
      }
    });
  }
}

// Criando vaga (POST)

async function criandoVaga(request, response) {
  const params = Array(
    request.params.id,
    request.body.titulo_vaga,
    request.body.area,
    request.body.cidade,
    request.body.faixaEtaria,
    request.body.descricao
  );

  const query =
    "INSERT INTO vagas(id_criador, titulo_vaga, area, cidade, faixa_etaria, descricao) VALUES(?,?,?,?,?,?);";

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
  const params = request.params.id;

  const query = "SELECT * FROM vagas WHERE id = ?;";

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

// Atualizando dados da vaga (PUT)

async function putDadosVagas(request, response) {
  const params = Array(
    request.body.vaga_titulo,
    request.body.vaga_area,
    request.body.vaga_faixa_etaria,
    request.body.vaga_cidade,
    request.body.vaga_descricao,
    request.body.id_vaga
  );

  const query =
    "UPDATE `vagas` SET `titulo_vaga` = ?, `area` = ?, `faixa_etaria` = ?, `cidade` = ?, `descricao` = ? WHERE `id` = ?;";

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

// Buscando currículos dos usuários

async function buscaCurriculos(request, response) {
  const params = Array(request.body.area);

  let query;

  if (!request.body.area || request.body.area === "Todas") {
    query =
      "SELECT ft_perfil, curriculo, area_curriculo, name, email, telefone, cidade FROM user_jovem WHERE curriculo IS NOT NULL";
  } else {
    query =
      "SELECT ft_perfil, curriculo, area_curriculo, name, email, telefone, cidade FROM user_jovem WHERE curriculo IS NOT NULL AND area_curriculo = ?";
  }

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com busca de currículos!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas busca de currículos!!",
        data: err,
      });
    }
  });
}

// Quantidade de download currículo jovem

async function quantDownloadsCurriculo(request, response) {

  const params = Array(request.params.id);

  const query = "UPDATE user_jovem SET download_curriculo = download_curriculo + 1 WHERE id = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso quantidade downloads!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas na quantidade downloads!!",
        data: err,
      });
    }
  });
}

// Buscando dúvidas sorteadas

async function sorteandoDuvida(request, response) {
  const query = "SELECT * FROM duvidas WHERE id_duvida IS NOT NULL ORDER BY RAND() LIMIT 3;";

  connection.query(query, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com busca das 3 dúvidas!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas busca das 3 dúvidas!!",
        data: err,
      });
    }
  });
}

// Deletando Usuário Empresa (DELETE)

async function deleteUsuarioEmpresa(request, response) {
  const params = Array(request.params.id);

  const query = "DELETE FROM user_empresa WHERE `id` = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso ao deletar a conta!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas ao deletar a conta!",
        data: err,
      });
    }
  });
}

module.exports = {
  cadastroEmpresa,
  deleteUsuarioEmpresa,

  getDadosUser,

  uptadeUserEmpresa,

  criandoVaga,
  getVagas,
  putDadosVagas,
  deleteVagas,

  buscaCurriculos,
  quantDownloadsCurriculo,

  sorteandoDuvida
};
