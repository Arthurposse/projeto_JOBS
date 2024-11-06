const app = require('./app');
const PORT = app.get("port");

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});