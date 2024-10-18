const socket = io();  // Inicializa a conexão com o servidor Socket.IO

// Verificar se o usuário já estava conectado a uma sala
let roomId = localStorage.getItem('roomId') || 'default-room-id';  // Usa o ID salvo ou um padrão

// Entrar na sala ao carregar a página ou iniciar o chat
socket.emit('joinRoom', roomId);
console.log(`Entrou na sala: ${roomId}`);

// Referências aos elementos da página
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messages = document.getElementById('messages');

// Função para adicionar mensagens ao chat
function appendMessage(message, className) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = className;  // Adiciona uma classe para estilização
  messages.appendChild(messageElement);
}

// Enviar mensagem
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  appendMessage(`Você: ${message}`, 'my-message');  // Adiciona a mensagem no front-end do remetente
  socket.emit('sendMessage', message);  // Envia a mensagem ao servidor
  messageInput.value = '';  // Limpa o campo de input após enviar
});

// Receber mensagem de outros usuários da mesma sala
socket.on('receiveMessage', (data) => {
  appendMessage(`Outro usuário: ${data.message}`, 'other-message');  // Adiciona a mensagem no front-end
});

// Quando o usuário se desconectar e reconectar
socket.on('reconnect', () => {
  console.log('Reconectado ao servidor');
  // Reentrar na sala ao reconectar
  socket.emit('reconnectUser');
});

// Salvar o roomId no localStorage para que o usuário possa se reconectar
localStorage.setItem('roomId', roomId);