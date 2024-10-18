const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

// Cria o servidor HTTP com o Express
const server = http.createServer(app);

// Inicializa o Socket.IO com o servidor
const io = new Server(server);

// Objeto para armazenar os usuários e suas salas
const usersRooms = {};

io.on('connection', (socket) => {
  console.log('Novo usuário conectado', socket.id);

  // Quando o usuário quer se conectar a uma sala
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);  // O usuário entra em uma sala
    console.log(`Usuário ${socket.id} entrou na sala: ${roomId}`);
    usersRooms[socket.id] = roomId;  // Armazena a sala do usuário
  });

  // Receber a mensagem do front-end e enviar para os outros usuários da sala
  socket.on('sendMessage', (message) => {
    const roomId = usersRooms[socket.id];  // Obter a sala do usuário atual
    if (roomId) {
      console.log(`Mensagem de ${socket.id}: ${message}`);
      // Enviar a mensagem para todos os outros usuários da sala, exceto o remetente
      socket.broadcast.to(roomId).emit('receiveMessage', { message, id: socket.id });
    }
  });

  // Quando o usuário desconectar
  socket.on('disconnect', () => {
    const roomId = usersRooms[socket.id];
    if (roomId) {
      console.log(`Usuário ${socket.id} desconectado da sala: ${roomId}`);
      // Mantemos a sala associada ao usuário para que ele possa se reconectar
    }
  });

  // Quando o usuário voltar a se conectar
  socket.on('reconnectUser', () => {
    const roomId = usersRooms[socket.id];  // Tentar obter a sala anterior
    if (roomId) {
      socket.join(roomId);  // Reentrar na sala anterior
      console.log(`Usuário ${socket.id} reconectado à sala: ${roomId}`);
    }
  });
});

const PORT = process.env.PORT || 3000;

// Inicia o servidor HTTP
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});