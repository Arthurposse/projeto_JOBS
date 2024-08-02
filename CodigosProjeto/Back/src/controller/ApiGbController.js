const { GoogleGenerativeAI } = require('@google/generative-ai');
const api_key = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(api_key);

async function apiGoogleBard(req, res) {

    const { area_usuario } = req.body;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `ESCREVA UMA ESTRUTURA USANDO A LINGUAGEM DE MARCAÇÃO HTML EM QUE DEVERÁ CONTER (Não precisa acrescentar o CSS): Um plano de carreira para um jovem (entre 14 a 24 anos) que gostaria de seguir uma carreira como ${area_usuario}. Pense que este jovem esta iniciando sua carreira profissional e ele precisa de um norte para iniciar. Ajude-o sugerindo faculdades para fazer, como é esta área no Brasil e no exterior hoje em dia e outras coisas importantes de uma pessoa jovem precisa saber para estar totalmente ciente sobre o trajeto que irá precisar seguir.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.send(text);
}

module.exports = {
    apiGoogleBard
}