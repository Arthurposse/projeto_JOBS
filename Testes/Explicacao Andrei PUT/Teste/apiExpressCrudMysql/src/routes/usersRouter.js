/**
 INFORMAÇÕES DO ROUTER

 Uma rota em uma API é um “caminho” que será “chamado” por uma aplicação ou cliente e responderá alguma informação. Cada rota pode ter uma ou mais funções, e ela deve ser única na API com o seu método HTTP definido, ao receber uma chamada ela faz todo o processamento necessário para retornar os dados que foi solicitado
*/

// Importar o modulo de Router do express
const { Router } = require('express');

// Instanciar o Router na variável router
const router = Router();

// Importar as funções (processamento da requisição) do controller
const { 
    listUsers,
    storeUser,
    updateUser,
    deleteUser
} = require('../controller/usersController')

// Criar os endpoints (rotas) que serão acessados a partir dos métodos HTTP (get,post,put,delete)
router.get('/users', listUsers);
router.post('/users', storeUser);
router.put('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;