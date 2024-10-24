const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const dotenv = require('dotenv');
const db = require('./config/db'); // Caminho para o arquivo de configuração do banco de dados

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let users = [];

// Middleware para parsear JSON
app.use(express.json());
app.use(express.static('public'));

// Serve o arquivo HTML na rota "/chat"
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/../../Front/index.html'); // Ajuste para o caminho correto
});

// Escuta conexões de socket
io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id);

    // Adiciona o usuário conectado
    socket.on('addUser', (user) => {
        if (!users.includes(user)) {
            users.push(user);
        }
        io.emit('userList', users); // Envia a lista de usuários conectados
    });

    // Entrar em uma sala específica
    socket.on('joinRoom', ({ currentUser, selectedUser }) => {
        const room = [currentUser, selectedUser].sort().join('-');
        socket.join(room);
    });

    // Lida com o envio de mensagens
    socket.on('sendMessage', (message) => {
        const room = [message.user, message.to].sort().join('-');
        io.to(room).emit('receiveMessage', message);
    });

    // Remove o usuário ao desconectar
    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
        users = users.filter(user => user !== socket.id);
        io.emit('userList', users); // Atualiza a lista de usuários conectados
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3008;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});