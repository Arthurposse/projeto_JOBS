const { Router } = require('express');
const router = Router();

const { userJovem, userEmpresa, logIn, duvidaJovem, getUserJovem, uptadeUserJovem, getMetasJovem, uptadeMetasJovem, postMetasJovem, deleteMetasJovem, getModulos } = require('../controller/taskController');

// POST

router.post('/user/jovem', userJovem);

router.post('/user/empresa', userEmpresa);

router.post('/user/enviando_duvida', duvidaJovem);

router.post('/metas/criando', postMetasJovem);

// GET

router.get('/verif/logIn', logIn);

router.get('/get/userJovem/:id', getUserJovem);

router.get('/metaJovem', getMetasJovem);

router.get('/modulosJovem', getModulos);

// PUT

router.put('/uptade/userJovem/:id', uptadeUserJovem);

router.put('/metas/atualizando', uptadeMetasJovem);

// router.put('/uptade/userJovem/:id', uptadeUserEmpresa);

// DELETE 

router.delete('/metas/deletando', deleteMetasJovem);

module.exports = router;