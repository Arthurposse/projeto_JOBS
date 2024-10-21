const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");

const routerJovem = require("./routes/UserJovemRouter");
const routerEmpresa = require("./routes/UserEmpresaRouter");
const enviarEmailRouter = require("./routes/enviarEmailRouter");
const LoginRouter = require("./routes/LoginRouter");
const BuscarVagaRouter = require("./routes/BuscarVagaRouter");
const ApiGbRouter = require("./routes/ApiGbRouter");

const duvResRouter = require("./routes/duvResRouter");
const chatRouter = require("./routes/chatRouter"); // Importa o roteador de chat

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3010);
app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Rotas da API
app.use("/api", routerJovem);
app.use("/api", routerEmpresa);
app.use("/api", enviarEmailRouter);
app.use("/api", LoginRouter);
app.use("/api", BuscarVagaRouter);
app.use("/api", ApiGbRouter);
app.use("/api", duvResRouter);
app.use('/chat', chatRouter); // Adiciona o roteador de chat

module.exports = app;