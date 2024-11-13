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

// Realizando busca de usuários

async function buscandoUsuario() {
  let nome_usuario = document.getElementById("pesquisa_usuario").value;

  const data = { nome_usuario };
  console.log(data);

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
    console.log(content);

    if(content.success) {
      console.log('sucesso ao buscar usuário');
    } else {
      console.log('deu ruim ao buscar usuário');
    }
  } catch (error) {
    console.error('Erro:', error);
  }
}

document.getElementById("pesquisa_usuario").addEventListener('input', function() {
  buscandoUsuario();
});

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
let otherUserId = 11; // ID do outro usuário (ajuste conforme necessário)

// Conectar-se à sala assim que o WebSocket estiver aberto
socket.onopen = () => {
  socket.send(JSON.stringify({ type: "join", userId: currentUserId, otherUserId }));
};

// Receber mensagens e histórico do servidor WebSocket
socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "message") {
    displayMessage(message.text, message.senderId); // Exibe a mensagem recebida
  }

  if (message.type === "history") {
    message.messages.forEach((msg) => {
      displayMessage(msg.message_text, msg.user_id); // Exibe o histórico de mensagens
    });
  }
};

// Função para exibir mensagem na interface
function displayMessage(text, senderId) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message");
  messageDiv.classList.add(senderId === currentUserId ? "sent" : "received");
  messageDiv.textContent = text;
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