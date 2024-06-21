const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();

// Configurar as credenciais do email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ACESS_EMAIL,
    pass: process.env.ACESS_PASS
  }
});

// Função para enviar o código de verificação para o email
async function sendVerificationCode(req, res) {

  const email = req.body.email;

  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
  const mailOptions = {
    from: 'enviarcodigo2024@gmail.com',
    to: email,
    subject: 'Código de Verificação - JOBS',
    text: `Seu código de verificação é: ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Código de verificação enviado com sucesso.", verificationCode });
    return verificationCode;

  } catch (error) {
    console.error(`Erro ao enviar código de verificação: ${error.message}`);
    res.status(500).json({ success: false, message: "Erro ao enviar código de verificação.", error: error.message });
    return null;
  }
}

module.exports = {
  sendVerificationCode
}