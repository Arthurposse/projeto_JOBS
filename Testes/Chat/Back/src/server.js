// src/server.js
const app = require('./app');
const http = require('http');
const socketIO = require('socket.io');

// Criar o servidor HTTP
const server = http.createServer(app);

// Configurar o Socket.IO para trabalhar com o servidor HTTP
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Usuário conectado!');

    socket.on('sendMessage', (message) => {
        // Emitir a mensagem para todos os usuários conectados
        io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado');
    });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3010;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});