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

    const query = "INSERT INTO user_empresa(name, email, password, telefone, cidade, cnpj, razao_social, setor_atividade) VALUES(?,?,?,?,?,?,?,?)";

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

// LogIn (GET)

async function logIn(request, response) {

    const query = "SELECT email, password FROM jobs.user_empresa UNION SELECT email, password FROM jobs.user_jovem;";

    connection.query(query, (err, results) => {
        if(results) {
            response
            .status(201)
            .json({
                sucess: true,
                message: "Sucesso com GET LogIn!!",
                data: results
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
        request.body.teste_duvida
    )

    const query = "INSERT INTO duvidas(duvida) VALUES(?)";

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

module.exports = {
    userJovem,
    userEmpresa,
    logIn,
    duvidaJovem
}