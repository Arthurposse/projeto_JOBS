const socket = io();

const sendMessage = () => {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    // Enviar a mensagem via socket
    socket.emit('sendMessage', { sender: 'user1', receiver: 'user2', text: message });
    messageInput.value = '';
};

socket.on('receiveMessage', (message) => {
    const messagesDiv = document.getElementById('messages');
    const newMessage = document.createElement('p');
    newMessage.textContent = `${message.sender}: ${message.text}`;
    messagesDiv.appendChild(newMessage);
});

document.getElementById('send-button').addEventListener('click', sendMessage);