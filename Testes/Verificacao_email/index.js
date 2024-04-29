const nodemailer = require('nodemailer');

// Configurar o transporte
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'apossebonn@gmail.com',
        pass: 'Posse_prof_1203T'
    }
});

// Criar o código de confirmação
let codigo = Math.floor(100000 + Math.random() * 900000); // Gera um código de 6 dígitos

// Configurar o email
let mailOptions = {
    from: 'apossebonn@gmail.com',
    to: 'ha3076545@gmail.com',
    subject: 'Código de Confirmação',
    text: 'Seu código de confirmação é: ' + codigo
};

// Enviar o email
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email enviado: ' + info.response);
    }
});