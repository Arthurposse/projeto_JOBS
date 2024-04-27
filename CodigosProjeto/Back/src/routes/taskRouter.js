const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { userJovem } = require('../controller/taskController');

router.post('/user/jovem', userJovem);

module.exports = router;