const connection = require("../config/db");
const dotenv = require("dotenv").config();
const fs = require("fs");
const path = require("path");

const uploadPath = path.join(__dirname, "..", "uploads");

// Irá criar a pasta uploads se ela já não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Caminhos para as subpastas curriculos e img_perfil
const curriculosPath = path.join(uploadPath, "curriculos");
const imgPerfilPath = path.join(uploadPath, "img_perfil");

// Irá criar a pasta curriculos se ela já não existir
if (!fs.existsSync(curriculosPath)) {
  fs.mkdirSync(curriculosPath);
}

// Irá criar a pasta img_perfil se ela já não existir
if (!fs.existsSync(imgPerfilPath)) {
  fs.mkdirSync(imgPerfilPath);
}

// Cadastrando Usuário (POST)

async function cadastroJovem(request, response) {
  const params = Array(
    request.body.name,
    request.body.email,
    request.body.password,
    request.body.data_nascimento,
    request.body.telefone,
    request.body.cidade
  );

  const query =
    "INSERT INTO user_jovem(name, email, password, data_nascimento, telefone, cidade) VALUES(?,?,?,?,?,?)";

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

// Dúvida Jovem (POST)

async function duvidaJovem(request, response) {
  const params = Array(request.body.id_user, request.body.userInput);

  const query = "INSERT INTO duvidas(id_user, duvida) VALUES(?, ?)";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com POST dúvida!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com POST dúvida!",
        data: err,
      });
    }
  });
}

// Coletando dados do usuário (GET)

// Jovem

async function getUserJovem(request, response) {
  const params = Array(request.params.id);

  const query =
    "SELECT ft_perfil, name, email, telefone, cidade, data_nascimento FROM user_jovem WHERE id = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com GET dados!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com GET dados!",
        data: err,
      });
    }
  });
}

// Atualizando dados do usuário (PUT)
async function uptadeUserJovem(request, response) {
  // Verifique se há arquivos no request
  if (!request.files || !request.files.ft_user) {
    // Se não houver arquivos, execute o bloco de código sem imagem
    const params = Array(
      request.body.nome_user,
      request.body.idade_user,
      request.body.email_user,
      request.body.telefone_user,
      request.body.cidade_user,
      request.params.id
    );

    const query =
      "UPDATE `user_jovem` SET `name` = ?, `data_nascimento` = ?, `email` = ?, `telefone` = ?, `cidade` = ? WHERE `id` = ?;";

    connection.query(query, params, (err, results) => {
      if (results) {
        response.status(201).json({
          success: true,
          message: "Sucesso com PUT user jovem!!",
          data: results,
        });
      } else {
        response.status(400).json({
          success: false,
          message: "Ops, deu problemas PUT user jovem!",
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
          request.body.idade_user,
          request.body.email_user,
          request.body.telefone_user,
          request.body.cidade_user,
          request.params.id
        );

        const query =
          "UPDATE `user_jovem` SET `ft_perfil` = ?, `name` = ?, `data_nascimento` = ?, `email` = ?, `telefone` = ?, `cidade` = ? WHERE `id` = ?;";

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

// Buscar metas Usuário Jovem (GET)
async function getMetasJovem(request, response) {
  const params = request.query.User_name;

  const query =
    "SELECT `user_name`, `titulo`, `infos`, `data_conclusao`, `prioridade` FROM metas WHERE user_name = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com GET metas!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com GET metas!",
        data: err,
      });
    }
  });
}

// Atualizando metas Usuário Jovem (PUT)
async function uptadeMetasJovem(request, response) {
  const params = Array(request.body.nome, request.body.nome_antigo);

  const query = "UPDATE `metas` SET `user_name` = ? WHERE `user_name` = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com PUT METAS!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com PUT METAS!",
        data: err,
      });
    }
  });
}

// Criando meta Usuário Jovem (POST)
async function postMetasJovem(request, response) {
  const params = Array(
    request.body.User_name,
    request.body.titulo,
    request.body.infos,
    request.body.data_alterar,
    request.body.prioridade
  );

  const query =
    "INSERT INTO metas(`user_name`, `titulo`, `infos`, `data_conclusao`, `prioridade`) VALUES(?, ?, ?, ?, ?)";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com POST meta!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com POST meta!",
        data: err,
      });
    }
  });
}

// Deletando meta Usuário Jovem (DELETE)

async function deleteMetasJovem(request, response) {
  const params = Array(request.body.metas_deletar);

  const query = "DELETE FROM metas WHERE `titulo` = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com DELETE meta!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com DELETE meta!",
        data: err,
      });
    }
  });
}

// Buscando módulos

async function getModulos(request, response) {
  const params = Array(request.query.tipo_modulo);

  const query =
    "SELECT `pergunta`, `questao_1`, `questao_2`, `questao_3`, `res_correta`, `explicacao` FROM jobs.questoes_modulos WHERE tipo_modulo = ?;";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso com GET questoes modulos!!",
        data: results,
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas com GET questoes modulos!!",
        data: err,
      });
    }
  });
}

// Enviando currículo 

async function envioCurriculo(request, response) {
  const curriculo = request.files.curriculo_jovem;
  const curriculoNome = Date.now() + path.extname(curriculo.name);

  const imgPerfilPath = path.join(__dirname, "..", "uploads", "curriculos");

  curriculo.mv(path.join(imgPerfilPath, curriculoNome), (erro) => {
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo."
      });
    } else {
      const params = Array(
        curriculoNome,
        request.body.area_escolhida,
        request.params.id
      );

      const query = "UPDATE `user_jovem` SET `curriculo` = ?, `area_curriculo` = ? WHERE `id` = ?;";

      connection.query(query, params, (err, results) => {
        if (results) {
          response.status(201).json({
            success: true,
            message: "Sucesso com o envio do currículo!!",
            data: results
          });
        } else {
          response.status(400).json({
            success: false,
            message: "Ops, deu problemas com o envio do currículo!!",
            data: err
          });
        }
      });
    }
  });
}

module.exports = {
  cadastroJovem,

  duvidaJovem,

  getUserJovem,
  uptadeUserJovem,

  getMetasJovem,
  uptadeMetasJovem,
  postMetasJovem,
  deleteMetasJovem,

  getModulos,

  envioCurriculo
};
