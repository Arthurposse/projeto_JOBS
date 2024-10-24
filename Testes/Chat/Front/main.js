const socket = io();

const form = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message-input');
const messagesContainer = document.querySelector('#messages');
const userSelection = document.querySelector('#user-selection');
const usersDropdown = document.querySelector('#users');
const startChatButton = document.querySelector('#start-chat');
const chatContainer = document.querySelector('#chat-container');

// Definir o usuário atual
const currentUser = 'usuárioExemplo'; // Este valor pode vir da autenticação

let selectedUser = null;

// Carregar a lista de usuários disponíveis
socket.on('userList', (users) => {
    usersDropdown.innerHTML = ''; // Limpa o dropdown antes de adicionar os novos usuários

    users.forEach(user => {
        if (user !== currentUser) {
            const option = document.createElement('option');
            option.value = user;
            option.textContent = user;
            usersDropdown.appendChild(option);
        }
    });
});

// Quando o usuário escolhe com quem conversar
startChatButton.addEventListener('click', () => {
    selectedUser = usersDropdown.value;
    
    if (selectedUser) {
        userSelection.style.display = 'none';
        chatContainer.style.display = 'block';
        socket.emit('joinRoom', { currentUser, selectedUser });
    }
});

// Enviar mensagem ao usuário selecionado
form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const message = {
        content: messageInput.value,
        user: currentUser,
        to: selectedUser // Destinatário
    };

    socket.emit('sendMessage', message);
    messageInput.value = '';
});

// Receber mensagem
socket.on('receiveMessage', (message) => {
    const messageElement = document.createElement('div');
    
    if (message.user === currentUser) {
        messageElement.classList.add('sent-message');
    } else {
        messageElement.classList.add('received-message');
    }

    messageElement.textContent = `${message.user}: ${message.content}`;
    messagesContainer.appendChild(messageElement);
});