const { Router } = require('express');
const router = Router();

const { sendVerificationCode } = require('../controller/enviarEmailController')

router.post("/enviarEmail", sendVerificationCode);

module.exports = router;