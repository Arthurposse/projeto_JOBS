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
        errorDetails: err.message,
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
    "SELECT ft_perfil, name, email, curriculo, download_curriculo, telefone, cidade, data_nascimento FROM user_jovem WHERE id = ?";

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
  const params = request.params.id;

  const query = "SELECT metas.id, titulo, infos, data_conclusao, prioridade FROM metas INNER JOIN user_jovem ON metas.id_criador = user_jovem.id WHERE user_jovem.id = ?;";

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
    request.params.id,
    request.body.titulo,
    request.body.infos,
    request.body.data_alterar,
    request.body.prioridade
  );

  const query =
    "INSERT INTO metas(`id_criador`, `titulo`, `infos`, `data_conclusao`, `prioridade`) VALUES(?, ?, ?, ?, ?)";

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
  const params = Array(
    request.body.metas_deletar,
    request.params.id
  );

  const query = "DELETE m FROM metas m INNER JOIN user_jovem u ON m.id_criador = u.id WHERE m.titulo = ? AND u.id = ?";

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
  const id_user = request.params.id;

  const curriculo = request.files.curriculo_jovem;
  const curriculoNome = id_user + "_" + Date.now() + path.extname(curriculo.name);

  const imgPerfilPath = path.join(__dirname, "..", "uploads", "curriculos");

  curriculo.mv(path.join(imgPerfilPath, curriculoNome), (erro) => {
    if (erro) {
      return response.status(400).json({
        success: false,
        message: "Erro ao mover o arquivo.",
      });
    } else {
      const params = Array(curriculoNome, request.body.area_escolhida, id_user);

      const query = "UPDATE `user_jovem` SET `curriculo` = ?, `area_curriculo` = ? WHERE `id` = ?;";

      connection.query(query, params, (err, results) => {
        if (results) {
          response.status(201).json({
            success: true,
            message: "Sucesso com o envio do currículo!!",
            data: results,
          });
        } else {
          response.status(400).json({
            success: false,
            message: "Ops, deu problemas com o envio do currículo!!",
            data: err,
          });
        }
      });
    }
  });
}

// Deletando currículo

async function apagarCurriculo(request, response) {
  const userId = request.params.id;

  // Primeiro, vamos buscar o nome do currículo associado ao ID do usuário
  const getCurriculoQuery = "SELECT curriculo FROM user_jovem WHERE id = ?;";
  connection.query(getCurriculoQuery, [userId], (err, results) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Erro ao buscar o currículo.",
        error: err,
      });
    }

    if (results.length === 0 || !results[0].curriculo) {
      return response.status(404).json({
        success: false,
        message: "Nenhum currículo encontrado para o usuário especificado.",
      });
    }

    const curriculoNome = results[0].curriculo;
    const curriculoPath = path.join(curriculosPath, curriculoNome);

    // Exclui o arquivo do sistema de arquivos
    fs.unlink(curriculoPath, (unlinkErr) => {
      if (unlinkErr) {
        return response.status(500).json({
          success: false,
          message: "Erro ao deletar o arquivo de currículo.",
          error: unlinkErr,
        });
      }

      // Após excluir o arquivo, atualiza o banco para remover a referência
      const deleteCurriculoQuery = "UPDATE user_jovem SET curriculo = NULL, download_curriculo = 0 WHERE id = ?;";
      connection.query(
        deleteCurriculoQuery,
        [userId],
        (updateErr, updateResults) => {
          if (updateErr) {
            return response.status(500).json({
              success: false,
              message: "Erro ao atualizar o banco de dados.",
              error: updateErr,
            });
          }

          response.status(200).json({
            success: true,
            message: "Currículo deletado com sucesso.",
            data: updateResults,
          });
        }
      );
    });
  });
}

// Deletando Usuário Jovem (DELETE)

async function deleteUsuarioJovem(request, response) {

  const params = Array(request.params.id);

  const query = "DELETE FROM metas WHERE `id_criador` = ?";

  connection.query(query, params, (err, results) => {
    if (results) {
      response.status(201).json({
        success: true,
        message: "Sucesso ao deletar as metas!!",
        data: results,
      });

      const query = "DELETE FROM user_jovem WHERE `id` = ?";

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
    } else {
      response.status(400).json({
        success: false,
        message: "Ops, deu problemas ao deletar as metas!!",
        data: err,
      });
    }
  });
}

module.exports = {
  cadastroJovem,
  deleteUsuarioJovem,

  duvidaJovem,

  getUserJovem,
  uptadeUserJovem,

  getMetasJovem,
  uptadeMetasJovem,
  postMetasJovem,
  deleteMetasJovem,

  getModulos,

  envioCurriculo,
  apagarCurriculo,
};
