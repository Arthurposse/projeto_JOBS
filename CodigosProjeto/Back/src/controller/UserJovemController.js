const connection = require('../config/db');
const dotenv = require('dotenv').config();

// Cadastrando Usuário (POST)

async function userJovem(request, response) {
    const params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.data_nascimento,
        request.body.telefone,
        request.body.cidade
    )

    const query = "INSERT INTO user_jovem(name, email, password, data_nascimento, telefone, cidade) VALUES(?,?,?,?,?,?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas!",
                    data: err
                })
        }
    })
}

// LogIn / Buscar ID user (GET)

async function logIn(request, response) {
    const query = "SELECT id, name, email, password, 'user_empresa' as origin FROM jobs.user_empresa UNION SELECT id, name, email, password, 'user_jovem' as origin FROM jobs.user_jovem;";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com GET LogIn!!",
                    data: results,
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com GET LogIn!",
                    data: err
                })
        }
    })
}

// Dúvida Jovem (POST)

async function duvidaJovem(request, response) {
    const params = Array(
        request.body.id_user,
        request.body.userInput
    )

    const query = "INSERT INTO duvidas(id_user, duvida) VALUES(?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com POST dúvida!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com POST dúvida!",
                    data: err
                })
        }
    })
}

// Coletando dados do usuário (GET)

// Jovem

async function getUserJovem(request, response) {

    const params = Array(
        request.params.id
    )

    const query = "SELECT name, email, telefone, cidade, data_nascimento FROM user_jovem WHERE id = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com GET dados!!",
                    data: results,
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com GET dados!",
                    data: err
                })
        }
    })
}

// Atualizando dados do usuário (PUT)

async function uptadeUserJovem(request, response) {

    const params = Array(
        // request.body.ft_user,
        request.body.nome_user,
        request.body.idade_user,
        request.body.email_user,
        request.body.telefone_user,
        request.body.cidade_user,
        request.params.id
    )

    // COM var ft_user
    // const query = "UPDATE `user_jovem` SET `ft_perfil` = ?, `name` = ?, `data_nascimento` = ?, `email` = ?, `telefone` = ?, `cidade` = ? WHERE `id` = ?;";

    // SEM var ft_user
    const query = "UPDATE `user_jovem` SET `name` = ?, `data_nascimento` = ?, `email` = ?, `telefone` = ?, `cidade` = ? WHERE `id` = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com PUT user jovem!!",
                    data: results,
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas PUT user jovem!",
                    data: err
                })
        }
    })
}

// Buscar metas Usuário Jovem (GET)

async function getMetasJovem(request, response) {
    const params = Array(
        request.query.User_name
    )

    const query = "SELECT `user_name`, `titulo`, `infos`, `data_conclusao`, `prioridade` FROM jobs.metas WHERE user_name = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com GET metas!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com GET metas!",
                    data: err
                })
        }
    })
}

// Atualizando metas Usuário Jovem (PUT)

async function uptadeMetasJovem(request, response) {

    const params = Array(
        request.body.nome,
        request.body.nome_antigo
    )

    const query = "UPDATE `metas` SET `user_name` = ? WHERE `user_name` = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com PUT METAS!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com PUT METAS!",
                    data: err
                })
        }
    })
}

// Criando meta Usuário Jovem (POST)

async function postMetasJovem(request, response) {
    const params = Array(
        request.body.User_name,
        request.body.titulo,
        request.body.infos,
        request.body.data_alterar,
        request.body.prioridade
    )

    const query = "INSERT INTO metas(`user_name`, `titulo`, `infos`, `data_conclusao`, `prioridade`) VALUES(?, ?, ?, ?, ?)";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com POST meta!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com POST meta!",
                    data: err
                })
        }
    })
}

// Deletando meta Usuário Jovem (DELETE)

async function deleteMetasJovem(request, response) {
    const params = Array(
        request.body.metas_deletar
    )

    const query = "DELETE FROM metas WHERE `titulo` = ?";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com DELETE meta!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com DELETE meta!",
                    data: err
                })
        }
    })
}

// Buscando módulos

async function getModulos(request, response) {
    const params = Array(
        request.query.tipo_modulo
    )

    const query = "SELECT `pergunta`, `questao_1`, `questao_2`, `questao_3`, `res_correta` FROM jobs.questoes_modulos WHERE tipo_modulo = ?;";

    connection.query(query, params, (err, results) => {
        if (results) {
            response
                .status(201)
                .json({
                    sucess: true,
                    message: "Sucesso com GET questoes modulos!!",
                    data: results
                });

        } else {
            response
                .status(400)
                .json({
                    sucess: false,
                    message: "Ops, deu problemas com GET questoes modulos!!",
                    data: err
                })
        }
    })
}

module.exports = {
    userJovem,

    logIn,

    duvidaJovem,

    getUserJovem,
    uptadeUserJovem,

    getMetasJovem,
    uptadeMetasJovem,
    postMetasJovem,
    deleteMetasJovem,

    getModulos
}