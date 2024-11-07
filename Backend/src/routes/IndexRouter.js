const { Router } = require("express");
const app = express
const router = Router();


// GET

app.use('/', express.static(path.join(__dirname, '../', 'Frontend', 'Tela Home - Sem Usuario Logado')));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, '../', 'Frontend', 'Tela Home - Sem Usuario Logado', 'index.html');
  console.log(`Acessando o arquivo em: ${filePath}`);
  res.sendFile(filePath);
});


module.exports = router;