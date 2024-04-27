const connection = require('../config/db');
const dotenv = require('dotenv').config();

// Cadastro usuários (POST)

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

// async function getElements(request, response) {
//     const query = "SELECT * FROM users";

//     connection.query(query, (err, results) => {
//         if(results) {
//             response
//             .status(201)
//             .json({
//                 sucess: true,
//                 message: "Sucesso com o GET!!",
//                 data: results
//             });

//         } else {
//             response
//             .status(400)
//             .json({
//                 sucess: false,
//                 message: "Ops, deu problemas no GET!",
//                 data: err
//             })
//         }
//     })
// }

// async function deletarItens(request, response) {
//     const query = "DELETE FROM users";

//     connection.query(query, (err, results) => {
//         if(results) {
//             response
//             .status(201)
//             .json({
//                 sucess: true,
//                 message: "Sucesso com o DELETE!!",
//                 data: results
//             });

//         } else {
//             response
//             .status(400)
//             .json({
//                 sucess: false,
//                 message: "Ops, deu problemas no DELETE!",
//                 data: err
//             })
//         }
//     })
// }

module.exports = {
    userJovem
    // getElements,
    // deletarItens
}