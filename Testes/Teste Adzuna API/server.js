import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/jobs", async (req, res) => {

});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});