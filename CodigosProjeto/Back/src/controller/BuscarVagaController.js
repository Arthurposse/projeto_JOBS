const dotenv = require("dotenv").config();

async function BuscarVaga(req, res) {
    const { keywords, location, page } = req.body.payload;

    const baseUrl = "https://api.adzuna.com/v1/api/jobs/br/search";
    const appId = process.env.ADZUNA_ID;
    const appKey = process.env.ADZUNA_KEY;

    try {
        const fetch = await import('node-fetch').then(mod => mod.default); // Importação dinâmica
        const url = `${baseUrl}/${page}?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(
            keywords
        )}&where=${encodeURIComponent(location || "")}`;

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
}

module.exports = {
    BuscarVaga
};