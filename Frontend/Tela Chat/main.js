// Limpeza de itens do localStorage (caso necessário)
localStorage.removeItem('Modulo');
localStorage.removeItem('Total_questoes');
localStorage.removeItem('Ordem_questoes');
localStorage.removeItem('Pontos');
localStorage.removeItem('Res_user');
localStorage.removeItem('User_name_antigo');
localStorage.removeItem('tema_escolhido');

// Verificando se o usuário está logado
document.addEventListener("DOMContentLoaded", () => {
  const fundoEscuro = document.querySelector(".fundo_escuro");

  if (!localStorage.getItem("ID_user")) {
    fundoEscuro.classList.add("active");
    requestAnimationFrame(() => {
      Swal.fire({
        title: "É necessário realizar o LogIn!!",
        text: "Se ainda não possui, realize o cadastro!!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2400,
        willClose: () => {
          fundoEscuro.classList.remove("active");
          window.location.href = "../Tela Home - Sem Usuario Logado/index.html";
        },
      });
    });
  }
});

// Função para realizar busca de usuários pelo e-mail
async function buscandoUsuario() {
  let email_usuario = document.getElementById("pesquisa_usuario").value;

  const data = { email_usuario };
  try {
    const response = await fetch("http://localhost:3008/api/buscar/usuarios", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.statusText}`);
    }

    const content = await response.json();
    const listaUsuarios = document.getElementById("lista_usuarios");
    listaUsuarios.innerHTML = ''; // Limpa a lista antes de atualizar

    // Exibe os usuários encontrados
    content.data.forEach(user => {
      if (user.user_id !== currentUserId) { // Verifica se não é o próprio usuário
        const userDiv = document.createElement("div");
        userDiv.classList.add("user-item");
        userDiv.textContent = `${user.name} (${user.user_type}) - ${user.email}`;
        userDiv.onclick = () => iniciarConversa(user.user_id, user.user_type);
        listaUsuarios.appendChild(userDiv);
      }
    });

  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para iniciar uma conversa com o usuário selecionado
function iniciarConversa(userId, userType) {
  otherUserId = userId; // Define o ID do outro usuário com quem vai conversar
  otherUserType = userType; // Define o tipo de usuário

  // Envia uma solicitação para abrir uma conversa
  socket.send(JSON.stringify({
    type: "join",
    userId: currentUserId,
    otherUserId,
    userType: localStorage.getItem("Tipo_user"),
    otherUserType
  }));

  // Limpa a área de mensagens e adiciona o input e o botão
  messagesContainer.innerHTML = `
    <div class="mensagens"></div>
    <div class="input-container">
      <input type="text" id="messageInput" placeholder="Digite sua mensagem..." />
      <button id="sendButton">Enviar</button>
    </div>
  `;

  // Redefine referências ao botão e input após recriação no DOM
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  messageInput.style.display = 'block';
  sendButton.style.display = 'block';

  // Envio de mensagem
  sendButton.addEventListener("click", enviarMensagem);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendButton.click();
  });
}

document.getElementById("pesquisa_usuario").addEventListener('input', buscandoUsuario);

// Inicializando variáveis
const id_user = Number(localStorage.getItem("ID_user"));
const User_name = localStorage.getItem("User_name");
const userLogado = document.getElementById("user_logado");
userLogado.textContent = User_name;

// Seleciona o elemento onde as mensagens serão exibidas
const messagesContainer = document.querySelector(".bloco_mensagem");

// Conectar ao servidor WebSocket
const socket = new WebSocket("ws://localhost:3008"); // Endereço do servidor WebSocket
let currentUserId = id_user; // ID do usuário logado
let otherUserId; // Inicialmente indefinido, será atualizado dinamicamente
let otherUserType;

socket.onopen = () => {
  if (otherUserId) {
    socket.send(JSON.stringify({
      type: "join",
      userId: currentUserId,
      otherUserId,
      userType: localStorage.getItem("Tipo_user"),
      otherUserType
    }));
  }
};

// Receber mensagens e histórico do servidor WebSocket
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);
  console.log("Mensagem recebida no frontend:", message);
  if (message.type === "message") {
    displayMessage(message.text, message.senderId, message.senderName, message.timestamp);
  }
  if (message.type === "history") {
    message.messages.forEach((msg) => {
      displayMessage(msg.message_text, msg.user_id, msg.sender_name, msg.timestamp);
    });
  }
};

// Função para exibir mensagem na interface
function displayMessage(text, senderId, senderName, timestamp) {
  const messagesArea = messagesContainer.querySelector(".mensagens");

  const messageDiv = document.createElement("div");
  // Checa se o senderId corresponde ao currentUser Id
  messageDiv.classList.add("message", senderId === currentUserId ? "sent" : "received");

  console.log('SenderID: ', senderId);
  console.log('currentUser ID: ', currentUserId);

  const senderNameDiv = document.createElement("div");
  senderNameDiv.classList.add("sender_name");
  senderNameDiv.textContent = senderId === currentUserId ? "Você" : (senderName && senderName.trim() !== "" ? senderName : "Usuário");

  const timestampDiv = document.createElement("div");
  timestampDiv.classList.add("timestamp");
  timestampDiv.textContent = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.textContent = text;

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("containerDiv");

  containerDiv.appendChild(senderNameDiv);
  containerDiv.appendChild(timestampDiv);
  
  messageDiv.appendChild(containerDiv);
  messageDiv.appendChild(textDiv);

  messagesArea.appendChild(messageDiv);
  messagesArea.scrollTop = messagesArea.scrollHeight; // Rolagem automática para a última mensagem
}

// Enviar mensagem
function enviarMensagem() {
  const messageInput = document.getElementById("messageInput");
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
      const message = {
          type: "message",
          text: messageText,
          senderId: currentUserId, // ID do usuário logado
          senderName: User_name // Nome do usuário logado
      };
      socket.send(JSON.stringify(message));
      messageInput.value = "";
  }
}