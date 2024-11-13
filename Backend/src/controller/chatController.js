let userConnections = {}; // Armazena as conexões dos usuários por sala

// Função para gerar o ID da sala com IDs em ordem
function getRoomId(userId, otherUserId, userType, otherUserType) {
    const prefix1 = userType === 'empresa' ? 'E' : 'J';
    const prefix2 = otherUserType === 'empresa' ? 'E' : 'J';

    // Ordena os IDs para que o maior ID sempre venha primeiro
    let roomId = "";
    if (userId > otherUserId) {
        roomId = `${prefix1}${userId}-${prefix2}${otherUserId}`;
    } else {
        roomId = `${prefix2}${otherUserId}-${prefix1}${userId}`;
    }

    console.log("ID da sala gerado:", roomId); // Debugging
    return roomId;
}

// Importa a função de conexão ao banco de dados
const { connectToDatabase, connection } = require('../config/db');

// Função para salvar uma mensagem no banco de dados
async function saveMessage(roomId, userId, messageText) {
    console.log(`Salvando mensagem para sala ${roomId}, usuário ${userId}: ${messageText}`);
    try {
        const connection = await connectToDatabase();
        const [result] = await connection.query(
            'INSERT INTO mensagens (room_id, user_id, message_text, timestamp) VALUES (?, ?, ?, ?)',
            [roomId, userId, messageText, new Date()]
        );
        await connection.end(); // Fecha a conexão após a execução
        console.log(`Mensagem salva na sala ${roomId} por usuário ${userId}: ${messageText}`);
        return result; // Retorna o resultado da inserção
    } catch (error) {
        console.error("Erro ao salvar mensagem:", error);
        throw error; // Lança o erro para ser tratado na camada superior
    }
}

// Função para obter o histórico de mensagens de uma sala
async function getMessages(roomId) {
    try {
        const connection = await connectToDatabase();
        const [rows] = await connection.query('SELECT * FROM mensagens WHERE room_id = ? ORDER BY timestamp ASC', [roomId]);
        await connection.end(); // Fecha a conexão após a execução
        return rows; // Retorna as mensagens recuperadas
    } catch (error) {
        console.error("Erro ao obter mensagens:", error);
        throw error; // Lança o erro para ser tratado na camada superior
    }
}

// Função para enviar uma mensagem para todos os clientes na sala
function sendMessageToRoom(roomId, message) {
    if (userConnections[roomId]) {
        userConnections[roomId].forEach((client) => {
            if (client.readyState === client.OPEN) {
                client.send(JSON.stringify({
                    type: "message",
                    senderId: message.userId, // Inclui o ID do remetente para controle no frontend
                    text: message.text,
                    timestamp: new Date().toISOString()
                }));
            }
        });
    }
}

// Função para tratar a conexão de um WebSocket
async function handleConnection(ws) {
    let currentRoom = null;
    let currentUserId = null;

    ws.on("message", async (data) => {
        try {
            const message = JSON.parse(data);

            // Usuário entra na sala
            if (message.type === "join") {
                currentUserId = message.userId;
                currentRoom = getRoomId(
                    message.userId,
                    message.otherUserId,
                    message.userType,
                    message.otherUserType
                );
                ws.roomId = currentRoom;
                userConnections[currentRoom] = userConnections[currentRoom] || [];
                userConnections[currentRoom].push(ws);

                console.log(`Usuário ${currentUserId} entrou na sala ${currentRoom}`);

                // Obtenção do histórico de mensagens
                const messages = await getMessages(currentRoom);
                ws.send(JSON.stringify({ type: "history", messages }));
            }

            // Salvando e enviando mensagens na sala
            if (message.type === "message") {
                await saveMessage(currentRoom, message.senderId, message.text);  // Salva a mensagem no banco de dados
                sendMessageToRoom(currentRoom, message);  // Envia a mensagem para todos os usuários na sala
            }

        } catch (error) {
            console.error("Erro ao processar mensagem:", error);
        }
    });


    ws.on("close", () => {
        if (currentRoom && userConnections[currentRoom]) {
            userConnections[currentRoom] = userConnections[currentRoom].filter(client => client !== ws);
            console.log(`Usuário ${currentUserId} desconectado da sala ${currentRoom}`);
        }
    });
}

// Buscar usuários através da pesquisa

async function buscaUsuarios(request, response) {
    const nome_usuario = request.body.nome_usuario;

    // Ajuste da query para usar placeholders corretamente
    const query = `
        (SELECT DISTINCT uj.id as 'id_jovem', uj.name AS 'jovem', NULL AS 'empresa' 
         FROM user_jovem uj 
         WHERE uj.name LIKE ?) 
        UNION 
        (SELECT DISTINCT NULL AS 'jovem', ue.id as 'id_empresa', ue.name AS 'empresa' 
         FROM user_empresa ue 
         WHERE ue.name LIKE ?) 
        LIMIT 5;
    `;
    const params = [`${nome_usuario}%`, `${nome_usuario}%`];

    connection.query(query, params, (err, results) => {
        if (err) {
            return response.status(400).json({
                success: false,
                message: "Ops, deu problemas com a busca de usuários!",
                data: err,
            });
        }

        response.status(200).json({
            success: true,
            message: "Sucesso com a busca de usuários!",
            data: results,
        });
    });
}

module.exports = {
    handleConnection,
    buscaUsuarios
};