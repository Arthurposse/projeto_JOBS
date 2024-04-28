const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { userJovem, userEmpresa, logIn } = require('../controller/taskController');

router.post('/user/jovem', userJovem);

router.post('/user/empresa', userEmpresa);

router.get('/verif/logIn', logIn);

module.exports = router;