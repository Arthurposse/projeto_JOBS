const dotenv = require("dotenv").config();

async function BuscarVaga(req, res) {
    const { keywords, location, page } = req.body.payload;

    const baseUrl = "https://api.adzuna.com/v1/api/jobs/br/search";
    const appId = process.env.ADZUNA_ID;
    const appKey = process.env.ADZUNA_KEY;

    try {
        // Importação dinâmica da função fetch a partir do módulo 'node-fetch'
        // Isso permite que 'fetch' seja usado de forma nativa no Node.js
        const fetch = await import('node-fetch').then(mod => mod.default);

        // Constrói a URL com base nos parâmetros da requisição e nas credenciais do Adzuna
        const url = `${baseUrl}/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(
            keywords
        )}&where=${encodeURIComponent(location || "")}`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao fazer a solicitação: ${response.status}`);
        }

        // Converte a resposta da API para JSON
        const data = await response.json();

        // Retorna os dados em formato JSON na resposta da API (res)
        res.json(data);
    } catch (error) {
        console.error("Erro ao processar requisição:", error);
        res.status(500).json({ error: "Erro interno ao processar a requisição" });
    }
}

module.exports = {
    BuscarVaga
};