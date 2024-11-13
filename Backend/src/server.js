// Importando dependências
const app = require("./app");  // Express app (definido no seu app.js)
const http = require("http");  // Módulo http nativo do Node.js
const WebSocket = require("ws");  // Módulo para WebSocket
const { handleConnection } = require("./controller/chatController");  // Função que gerencia a conexão WebSocket

// Criando o servidor HTTP
const server = http.createServer(app);

// Criando o servidor WebSocket e conectando-o ao servidor HTTP
const wss = new WebSocket.Server({ server });  // Integra o WebSocket ao servidor HTTP

// Gerencia a conexão WebSocket
wss.on("connection", handleConnection);

// Inicia o servidor HTTP (que também está lidando com WebSocket)
server.listen(process.env.PORT || 3000, () => {
    console.log(`Servidor HTTP rodando na porta ${process.env.PORT || 3000}`);
});

// Opcional: Exibir a porta do WebSocket
console.log(`Servidor WebSocket rodando na mesma porta do HTTP`);