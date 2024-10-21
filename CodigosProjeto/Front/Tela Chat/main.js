// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Lógica para funcionamento do chat

// chat.js
const socket = io(); // Conexão com o Socket.IO

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

// Enviar mensagem
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('sendMessage', message);
        messageInput.value = ''; // Limpa o input
    }
});

// Receber mensagem
socket.on('receiveMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesContainer.appendChild(messageElement);
});