// Importa o módulo 'nodemailer', que permite o envio de emails
const nodemailer = require("nodemailer");

const dotenv = require("dotenv").config();

// Configuração do serviço de email utilizando o Gmail como provedor
// As credenciais do email (usuário e senha) são extraídas do arquivo .env
const transporter = nodemailer.createTransport({
  service: "gmail", // Define o serviço de email como Gmail
  auth: {
    user: process.env.ACESS_EMAIL,
    pass: process.env.ACESS_PASS,
  },
});

// Função para enviar o código de verificação para o email
async function sendVerificationCode(req, res) {

  // Obtém o email do destinatário a partir do corpo da requisição
  const email = req.body.email;

  const verificationCode = Math.floor(100000 + Math.random() * 900000);

  // Configura as opções do email, incluindo remetente, destinatário, assunto e corpo do email
  const mailOptions = {
    from: "enviarcodigo2024@gmail.com",
    to: email,
    subject: "Código de Verificação - JOBS",
    text: `Seu código de verificação é: ${verificationCode}`,
  };

  try {
    // Tenta enviar o email usando o 'transporter' configurado
    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({
        success: true,
        message: "Código de verificação enviado com sucesso.",
        verificationCode,
      });
    return verificationCode;
  } catch (error) {
    console.error(`Erro ao enviar código de verificação: ${error.message}`);
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao enviar código de verificação.",
        error: error.message,
      });
    return null;
  }
}

module.exports = {
  sendVerificationCode
};