const connection = require('../config/db');
const dotenv = require('dotenv').config();

// Cadastrando Usuário (POST)

async function userEmpresa(request, response) {
    const params = Array(
        request.body.name,
        request.body.email,
        request.body.password,
        request.body.telefone,
        request.body.cidade,
        request.body.razao_social,
        request.body.cnpj,
        request.body.setor_atividade
    )

    const query = "INSERT INTO user_empresa(name, email, password, telefone, cidade, razao_social, cnpj, setor_atividade) VALUES(?,?,?,?,?,?,?,?)";

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

// Atualizando dados do usuário (PUT)

async function uptadeUserEmpresa(request, response) {

    const params = Array(
        // request.body.ft_user,
        request.body.name,
        request.body.email,
        request.body.telefone,
        request.body.cidade,
        request.body.setor_atividade,
        request.params.id
    )

    // SEM var ft_user
    const query = "UPDATE `user_empresa` SET `name` = ?, `email` = ?, `telefone` = ?, `cidade` = ?, `setor_atividade` = ? WHERE `id` = ?;";

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

module.exports = {
    userEmpresa,
    uptadeUserEmpresa
}