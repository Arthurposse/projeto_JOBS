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

// Inicializando variáveis
const id_user = Number(localStorage.getItem("ID_user"));
const User_name = localStorage.getItem("User_name");
const userLogado = document.getElementById("user_logado");
userLogado.textContent = User_name;

// Função para carregar a lista de conversas do usuário logado
async function carregarConversas(userId) {
  const listaUsuarios = document.getElementById("lista_usuarios");
  listaUsuarios.innerHTML = "<p class='texto_inicie_conv'>Carregando...</p>";

  try {
    const response = await fetch(`http://localhost:3008/api/conversas/${userId}`);
    if (!response.ok) {
      throw new Error('Erro ao carregar conversas: ' + response.statusText);
    }
    const content = await response.json();
    console.log(content)

    if (content.data.length === 0) {
      listaUsuarios.innerHTML = "<p class='texto_inicie_conv'> <i class='bi bi-chat-dots-fill'></i> Inicie uma conversa!! </p>";
      return;
    }

    listaUsuarios.innerHTML = "";
    content.data.forEach((conversa) => {
      const conversaDiv = document.createElement("div");
      conversaDiv.classList.add("conversa-item");
      conversaDiv.textContent = conversa.otherUserName;
      conversaDiv.onclick = () => iniciarConversa(conversa.otherUserId, conversa.userType, conversa.otherUserName);
      listaUsuarios.appendChild(conversaDiv);
    });
  } catch (error) {
    console.error("Erro ao carregar conversas:", error);
    listaUsuarios.innerHTML = "<p class='texto_inicie_conv'>Erro ao carregar conversas.</p>";
  }
}

// Chamada inicial para carregar conversas ao abrir a página
document.addEventListener("DOMContentLoaded", carregarConversas(id_user));

// Função para realizar busca de usuários pelo e-mail
async function buscandoUsuario() {
  let email_usuario = document.getElementById("pesquisa_usuario").value;

  const data = { email_usuario };
  try {
    const listaUsuariosPesquisados = document.getElementById("lista_usuarios_pesquisados");

    if (email_usuario !== '') {
      const response = await fetch("http://localhost:3008/api/buscar/usuarios", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.statusText}`);
      }

      const content = await response.json();
      listaUsuariosPesquisados.innerHTML = ''; 

      // Exibe os usuários encontrados na área de sugestões
      content.data.forEach(user => {
        if (user.user_id !== currentUserId) { // Verifica se não é o próprio usuário
          const userDiv = document.createElement("div");
          userDiv.classList.add("user-item");
          userDiv.textContent = `${user.name} (${user.user_type}) - ${user.email}`;
          userDiv.onclick = () => iniciarConversa(user.user_id, user.user_type, user.name); // Passar o nome do usuário
          listaUsuariosPesquisados.appendChild(userDiv);
        }
      });
    } else {
      listaUsuariosPesquisados.innerHTML = '';
    }

  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para iniciar uma conversa com o usuário selecionado
function iniciarConversa(userId, userType, otherUserName) {
  otherUserId = userId;
  otherUserType = userType;

  // Redefina lastMessageDate para garantir que a data da primeira mensagem seja exibida
  lastMessageDate = null;

  // Adiciona o título com o nome do outro usuário
  messagesContainer.innerHTML = `
    <h3 class="nome_outro_usuario">${otherUserName}</h3>
  
    <div class="mensagens"></div>
    <div class="input-container">
      <input type="text" id="messageInput" placeholder="Digite sua mensagem..." />
      <button id="sendButton">Enviar</button>
    </div>
  `;

  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  messageInput.style.display = 'block';
  sendButton.style.display = 'block';

  sendButton.addEventListener("click", enviarMensagem);
  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendButton.click();
  });

  socket.send(JSON.stringify({
    type: "join",
    userId: currentUserId,
    otherUserId,
    userType: localStorage.getItem("Tipo_user"),
    otherUserType
  }));
}

// Ao pesquisar por usuários, atualiza a lista de sugestões de usuários
document.getElementById("pesquisa_usuario").addEventListener('input', buscandoUsuario);

// Seleciona o elemento onde as mensagens serão exibidas
const messagesContainer = document.querySelector(".bloco_mensagem");

// Conectar ao servidor WebSocket
const socket = new WebSocket("ws://localhost:3008"); // Endereço do servidor WebSocket
let currentUserId = id_user; // ID do usuário logado
let otherUserId; // ID do usuário selecionado
let otherUserType; // Tipo do usuário selecionado

// Após a conexão estabelecida, envia a mensagem de conexão
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
let lastMessageDate = null; // Variável para armazenar a última data exibida

function displayMessage(text, senderId, senderName, timestamp) {
  const messagesArea = messagesContainer.querySelector(".mensagens");
  const messageDate = new Date(timestamp);
  const messageDateString = messageDate.toLocaleDateString();

  // Exibir a data se for uma nova data
  if (lastMessageDate !== messageDateString) {
    lastMessageDate = messageDateString;
    const dateHeader = document.createElement("div");
    dateHeader.classList.add("date-header");
    dateHeader.textContent = messageDate.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    messagesArea.appendChild(dateHeader);
  }

  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", senderId === currentUserId ? "sent" : "received");

  const senderNameDiv = document.createElement("div");
  senderNameDiv.classList.add("sender_name");
  senderNameDiv.textContent = senderId === currentUserId ? "Você" : (senderName || "Usuário");

  const timestampDiv = document.createElement("div");
  timestampDiv.classList.add("timestamp");
  timestampDiv.textContent = messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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