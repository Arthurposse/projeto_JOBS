// Arquivo responsável pela configuração e conexão com o BD

// Importar o pacote do mysql
const mysql = require("mysql2");

// Importar o pacote de acesso aos de variáveis de ambiente
const dotenv = require("dotenv").config();

// Estabelece a criação da conexão com BD
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

// Verificando a conexão com o BD
connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Mysql Connected!");
  }
});

module.exports = connection;