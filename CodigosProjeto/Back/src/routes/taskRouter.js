const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { storeTask } = require('../controller/taskController');

router.post('/store/task', storeTask);

module.exports = router;