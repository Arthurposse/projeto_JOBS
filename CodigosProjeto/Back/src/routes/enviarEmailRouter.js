const { Router } = require('express');
const router = Router();

const { sendVerificationCode } = require('../controller/enviarEmailController')

router.post("/testeEnviarEmail", sendVerificationCode);

module.exports = router;