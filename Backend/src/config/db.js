// db.js
const mysql = require("mysql2"); // Usando mysql2 para callbacks
const mysql_chat = require("mysql2/promise"); // Usando mysql2/promise para Promises
const dotenv = require("dotenv").config();

// Conexão padrão para callback (para compatibilidade com outras partes do código)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Conexão assíncrona para o banco de dados (para compatibilidade com Promises, como no chat)
async function connectToDatabase() {
  try {
    const connection = await mysql_chat.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
    console.log("MySQL Connected CHAT!");
    return connection;
  } catch (error) {
    console.error("Erro ao conectar ao MySQL CHAT:", error);
    throw error;
  }
}

// Verificação da conexão para callbacks
connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
  } else {
    console.log("MySQL Connected (Callback)!");
  }
});

// Exporta tanto a conexão com callbacks quanto a conexão com Promises
module.exports = { connection, connectToDatabase };