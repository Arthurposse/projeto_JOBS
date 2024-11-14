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
          const userDiv = document.createElement("div");
          userDiv.classList.add("user-item");
          userDiv.textContent = `${user.name} (${user.user_type}) - ${user.email}`;
          userDiv.onclick = () => iniciarConversa(user.user_id, user.user_type);
          listaUsuarios.appendChild(userDiv);
      });

  } catch (error) {
      console.error('Erro:', error);
  }
}

// Função para iniciar uma conversa com o usuário selecionado
function iniciarConversa(userId, userType) {
  otherUserId = userId; // Atualiza o ID do outro usuário com quem vai conversar
  otherUserType = userType; // Atualiza o tipo de usuário

  // Envia uma solicitação para abrir uma conversa
  socket.send(JSON.stringify({
      type: "join",
      userId: currentUserId,
      otherUserId,
      userType: localStorage.getItem("Tipo_user"),
      otherUserType
  }));

  // Oculta o ícone e a mensagem "Inicie uma conversa!!"
  document.querySelector(".bloco_mensagem i").style.display = "none";
  document.querySelector(".bloco_mensagem h1").style.display = "none";
  
  // Exibe o campo de input e o botão de envio
  document.getElementById("messageInput").style.display = "block";
  document.getElementById("sendButton").style.display = "block";

  // Limpa a área de mensagens e define um cabeçalho com o nome do usuário
  messagesContainer.innerHTML = "";
  document.querySelector(".bloco_mensagem h1").textContent = `Conversa com ${userType}`;
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
  if (otherUserId) {  // Verifica se otherUserId já foi definido
    socket.send(JSON.stringify({
      type: "join",
      userId: currentUserId,
      otherUserId,
      userType: localStorage.getItem("Tipo_user"), // Tipo do usuário logado
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
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(senderId === currentUserId ? "sent" : "received");

  // Verifica se senderName existe e se não está vazio
  const senderNameDiv = document.createElement("div");
  senderNameDiv.classList.add("sender-name");
  senderNameDiv.textContent = senderName && senderName.trim() !== "" ? senderName : "Usuário"; // Alterado aqui

  const timestampDiv = document.createElement("div");
  timestampDiv.classList.add("timestamp");
  timestampDiv.textContent = new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.textContent = text;

  // Adiciona os elementos à mensagem
  messageDiv.appendChild(senderNameDiv);
  messageDiv.appendChild(textDiv);
  messageDiv.appendChild(timestampDiv);

  messagesContainer.appendChild(messageDiv);
}

// Captura do campo de entrada e botão de envio
const messageInput = document.getElementById("messageInput"); // Campo de entrada de mensagem
const sendButton = document.getElementById("sendButton"); // Botão de envio

// Enviar mensagem ao clicar no botão de envio
sendButton.addEventListener("click", () => {
  const messageText = messageInput.value.trim();
  if (messageText !== "") {
    const message = { type: "message", text: messageText, senderId: currentUserId }; // Inclui o ID do remetente
    socket.send(JSON.stringify(message)); // Envia a mensagem pelo WebSocket
    messageInput.value = ""; // Limpa o campo de entrada
  }
});

// Permitir envio ao pressionar Enter
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendButton.click();
  }
});