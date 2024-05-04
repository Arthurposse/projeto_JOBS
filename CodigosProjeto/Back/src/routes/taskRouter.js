const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { userJovem, userEmpresa, logIn, duvidaJovem, getUserJovem } = require('../controller/taskController');

router.post('/user/jovem', userJovem);

router.post('/user/empresa', userEmpresa);

router.post('/user/enviando_duvida', duvidaJovem)

router.get('/verif/logIn', logIn);

router.get('/uptade/userJovem/:id', getUserJovem)

// router.put('/uptade/userJovem/:id', uptadeUserJovem);

// router.put('/uptade/userJovem/:id', uptadeUserEmpresa);

module.exports = router;