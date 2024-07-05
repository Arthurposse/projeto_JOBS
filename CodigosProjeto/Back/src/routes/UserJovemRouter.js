const { Router } = require('express');
const router = Router();

const { logIn, getUserJovem, getMetasJovem, getModulos, userJovem, duvidaJovem, postMetasJovem, uptadeUserJovem, uptadeMetasJovem, deleteMetasJovem } = require('../controller/UserJovemController');

// GET

router.get('/verif/logIn', logIn);

router.get('/get/userJovem/:id', getUserJovem);

router.get('/metaJovem', getMetasJovem);

router.get('/modulosJovem', getModulos);

// POST

router.post('/user/jovem', userJovem);

router.post('/user/enviando_duvida', duvidaJovem);

router.post('/metas/criando', postMetasJovem);

// PUT

router.put('/uptade/userJovem/:id', uptadeUserJovem);

router.put('/metas/atualizando', uptadeMetasJovem);

// DELETE 

router.delete('/metas/deletando', deleteMetasJovem);

module.exports = router;