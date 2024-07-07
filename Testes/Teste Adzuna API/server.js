import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/jobs", async (req, res) => {
  const apiUrl = "https://api.adzuna.com/v1/api/jobs/br/search/1"; // Endpoint para buscar vagas no Brasil
  const appId = "2f83b376"; // Seu app_id da Adzuna
  const appKey = "9388be172961eea6d70a24fc4bbcd0b2"; // Sua app_key da Adzuna
  const { keywords, location } = req.body;

  try {
    const url = `${apiUrl}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(
      keywords
    )}&where=${encodeURIComponent(location)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Erro ao fazer a solicitação: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro ao processar requisição:", error);
    res.status(500).json({ error: "Erro interno ao processar a requisição" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});