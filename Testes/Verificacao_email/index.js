const nodemailer = require('nodemailer');

// Configurar as credenciais do email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    pass: ''
  }
});

// Função para enviar o código de verificação para o email
async function sendVerificationCode(email) {
  const verificationCode = Math.floor(100000 + Math.random() * 900000);
  
  const mailOptions = {
    from: 'enviarcodigo2024@gmail.com',
    to: email,
    subject: 'Código de Verificação - JOBS',
    text: `Seu código de verificação é: ${verificationCode}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Código de verificação enviado para ${email}`);
    return verificationCode;

  } catch (error) {
    console.error(`Erro ao enviar código de verificação: ${error}`);
    return null;
  }
}

// Exemplo de uso
const email = 'apossebonn@gmail.com';
sendVerificationCode(email).then((code) => {
  console.log(`Código de verificação: ${code}`);

}).catch((error) => {
  console.error(`Erro: ${error}`);
});