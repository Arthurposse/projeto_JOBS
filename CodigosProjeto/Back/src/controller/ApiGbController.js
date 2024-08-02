const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyAWo2kjRoj4FNV1pvm5416n3SgnvpuD6MI');

async function apiGoogleBard(req, res) {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = 'Realize um plano de carreira para uma pessoa que gostaria de seguir uma carreira como Desenvolvedor Full Stack';
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
}

module.exports = {
    apiGoogleBard
}