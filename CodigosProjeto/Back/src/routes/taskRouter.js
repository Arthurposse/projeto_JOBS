const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { userJovem, userEmpresa } = require('../controller/taskController');

router.post('/user/jovem', userJovem);

router.post('/user/empresa', userEmpresa);

module.exports = router;