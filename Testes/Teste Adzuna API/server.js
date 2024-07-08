import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/api/jobs", async (req, res) => {
  const baseUrl = "https://api.adzuna.com/v1/api/jobs/br/search";
  const appId = ""; // Seu app_id da Adzuna
  const appKey = ""; // Sua app_key da Adzuna
  const { keywords, location, page } = req.body;

  try {
    const url = `${baseUrl}/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(
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