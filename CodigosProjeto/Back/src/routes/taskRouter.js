const { Router } = require('express');
const router = Router();

// const { storeTask, getElements, deletarItens } = require('../controller/taskController');
const { userJovem, userEmpresa, logIn, duvidaJovem, getUserJovem, uptadeUserJovem, getMetasJovem, postMetasJovem } = require('../controller/taskController');

// POST

router.post('/user/jovem', userJovem);

router.post('/user/empresa', userEmpresa);

router.post('/user/enviando_duvida', duvidaJovem);

router.post('/metas/criando', postMetasJovem)

// GET

router.get('/verif/logIn', logIn);

router.get('/get/userJovem/:id', getUserJovem)

router.get('/metaJovem', getMetasJovem);

// PUT

router.put('/uptade/userJovem/:id', uptadeUserJovem);

// router.put('/uptade/userJovem/:id', uptadeUserEmpresa);

module.exports = router;