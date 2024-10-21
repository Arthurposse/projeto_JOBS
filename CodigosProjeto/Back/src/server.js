const app = require('./app');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server);

// Configuração básica do Socket.IO
io.on('connection', (socket) => {
    console.log('Novo usuário conectado:', socket.id);

    socket.on('sendMessage', (message) => {
        console.log(`Mensagem recebida de ${socket.id}: ${message}`);
        socket.broadcast.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
    });
});

const PORT = app.get("port");
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});