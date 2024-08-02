const { GoogleGenerativeAI } = require('@google/generative-ai');
const api_key = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(api_key);

async function apiGoogleBard(req, res) {

    const { area_usuario } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Realize um plano de carreira para uma pessoa que gostaria de seguir uma carreira como ${area_usuario}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
}

module.exports = {
    apiGoogleBard
}