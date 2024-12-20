// Importação das bibliotecas utilizadas no projeto
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fileUpload = require("express-fileupload");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const app = express();

// Importação dos arquivos das rotas do projeto
const routerJovem = require("./routes/UserJovemRouter");
const routerEmpresa = require("./routes/UserEmpresaRouter");
const enviarEmailRouter = require("./routes/enviarEmailRouter");
const LoginRouter = require("./routes/LoginRouter");
const BuscarVagaRouter = require("./routes/BuscarVagaRouter");
const ApiGbRouter = require("./routes/ApiGbRouter");
const duvResRouter = require("./routes/duvResRouter");
const chatRouter = require("./routes/chatRouter");

// Configuração do Swegger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3003" }]
    },
    apis: [`${__dirname}/routes/*.js`],
};

dotenv.config();

app.use(express.static(path.join(__dirname, '..', '..', 'Frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'Frontend', 'Tela Home - Sem Usuario Logado', 'index.html'));
});


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
app.use("/api", chatRouter);

// Rota Swagger (Documentação)
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;