const connection = require('../config/db');
const dotenv = require('dotenv').config();

// Cadastro usuários (POST)

// Usuário Jovem

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
        if(results) {
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

// Usuário Empresa

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
        if(results) {
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
    const query = "SELECT id, email, password, 'user_empresa' as origin FROM jobs.user_empresa UNION SELECT id, email, password, 'user_jovem' as origin FROM jobs.user_jovem;";

    connection.query(query, (err, results) => {
        if(results) {
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
        if(results) {
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
        if(results) {
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

// Atualizando dados do usuário

// Jovem

async function uptadeUserJovem(request, response) {
    
    const params = Array(
        request.body.nome_user,
        request.body.idade_user,
        request.body.email_user,
        request.body.telefone_user,
        request.body.cidade_user,
        request.params.id
    )
    
    const query = "UPDATE `user_jovem` SET `name` = ?, `data_nascimento` = ?, `email` = ?, `telefone` = ?, `cidade` = ? WHERE `id_user` = ?;";

    connection.query(query, params, (err, results) => {
        if(results) {
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

// Empresa

module.exports = {
    userJovem,
    userEmpresa,
    logIn,
    duvidaJovem,
    getUserJovem,
    uptadeUserJovem
}