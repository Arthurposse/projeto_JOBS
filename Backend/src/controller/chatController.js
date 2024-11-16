let userConnections = {}; // Armazena as conexões dos usuários por sala

// Função para gerar o ID da sala com IDs em ordem
function getRoomId(userId, otherUserId, userType, otherUserType) {
    const prefix1 = userType === 'Empresa' ? 'E' : 'J';
    const prefix2 = otherUserType === 'Empresa' ? 'E' : 'J';

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
        const [rows] = await connection.query(`
            SELECT 
                m.id,
                m.message_text,
                m.room_id,
                m.timestamp,
                m.user_id,
                COALESCE(uj.name, ue.name) AS sender_name
            FROM 
                mensagens m
            LEFT JOIN 
                user_jovem uj ON m.user_id = uj.id
            LEFT JOIN 
                user_empresa ue ON m.user_id = ue.id
            WHERE 
                m.room_id = ?
            ORDER BY 
                m.timestamp ASC
        `, [roomId]);
        await connection.end(); // Fecha a conexão após a execução
        return rows; // Retorna as mensagens recuperadas com o nome do remetente
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
                    senderId: message.senderId,  // ID do usuário que enviou a mensagem
                    senderName: message.senderName, // Nome do usuário que enviou a mensagem
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
    const email_usuario = request.body.email_usuario;

    const query = `
        (SELECT uj.id as 'user_id', uj.email AS 'email', uj.name AS 'name', 'Jovem' AS 'user_type'
         FROM user_jovem uj 
         WHERE uj.email LIKE ?) 
        UNION 
        (SELECT ue.id as 'user_id', ue.email AS 'email', ue.name AS 'name', 'Empresa' AS 'user_type'
         FROM user_empresa ue 
         WHERE ue.email LIKE ?)
        LIMIT 5;
    `;
    const params = [`${email_usuario}%`, `${email_usuario}%`];

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

// Função para buscar as conversas do usuário logado
async function getConversas(userId) {
    const query = `
        SELECT 
            m.room_id,
            CASE 
                WHEN SUBSTRING_INDEX(m.room_id, '-', 1) = CONCAT('J', ?) THEN SUBSTRING_INDEX(m.room_id, '-', -1)
                ELSE SUBSTRING_INDEX(m.room_id, '-', 1)
            END AS otherUserId
        FROM 
            mensagens m
        WHERE 
            SUBSTRING_INDEX(m.room_id, '-', 1) = CONCAT('J', ?) OR 
            SUBSTRING_INDEX(m.room_id, '-', -1) = CONCAT('J', ?)
    `;

    try {
        const connection = await connectToDatabase();
        const [results] = await connection.query(query, [userId, userId, userId]);

        // Array para armazenar as conversas com os nomes dos usuários
        const conversasComNomes = [];

        for (const result of results) {
            const otherUserId = result.otherUserId;

            // Verifica se o ID do outro usuário começa com 'J' ou 'E'
            let userName;
            let userType;
            if (otherUserId.startsWith('J')) {
                // Busca o nome na tabela user_jovem
                const [userJovem] = await connection.query('SELECT name FROM user_jovem WHERE id = ?', [otherUserId.substring(1)]);
                userName = userJovem.length > 0 ? userJovem[0].name : null;
                userType = 'Jovem';
            } else if (otherUserId.startsWith('E')) {
                // Busca o nome na tabela user_empresa
                const [userEmpresa] = await connection.query('SELECT name FROM user_empresa WHERE id = ?', [otherUserId.substring(1)]);
                userName = userEmpresa.length > 0 ? userEmpresa[0].name : null;
                userType = 'Empresa';
            }

            // Adiciona a conversa com o nome do usuário
            conversasComNomes.push({
                room_id: result.room_id,
                otherUserId: otherUserId.substring(1),
                otherUserName: userName,
                userType: userType
            });
        }

        return {
            success: true,
            message: "Conversas carregadas com sucesso.",
            data: conversasComNomes,
        };
    } catch (error) {
        console.error("Erro ao buscar conversas:", error);
        throw new Error("Erro ao carregar conversas.");
    }
}

module.exports = {
    handleConnection,
    buscaUsuarios,
    getConversas
};