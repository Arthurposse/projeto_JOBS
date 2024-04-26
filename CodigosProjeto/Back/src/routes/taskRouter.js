const { Router } = require('express');
const router = Router();

const { storeTask, getElements, deletarItens } = require('../controller/taskController');

router.post('/store/task', storeTask);

router.get('/dados', getElements);

router.delete('/deletar', deletarItens)

module.exports = router;