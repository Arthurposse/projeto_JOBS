const { Router } = require('express');
const router = Router();

const { logIn, userEmpresa, uptadeUserEmpresa } = require('../controller/UserEmpresaController');

// GET

router.get('/verif/logIn', logIn);

// POST

router.post('/user/empresa', userEmpresa);

// PUT

router.put('/uptade/userEmpresa/:id', uptadeUserEmpresa);

module.exports = router;