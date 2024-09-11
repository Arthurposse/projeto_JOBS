const { GoogleGenerativeAI } = require('@google/generative-ai');
const api_key = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(api_key);

async function apiGoogleBard(req, res) {

    const { area_usuario } = req.body;

    // Seleciona o modelo generativo da API (neste caso, o modelo 'gemini-1.5-flash')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Cria um prompt para a API gerar o plano de carreira baseado na área de interesse do usuário
    const prompt = `ESCREVA UMA ESTRUTURA USANDO A LINGUAGEM DE MARCAÇÃO HTML EM QUE DEVERÁ CONTER (Não precisa acrescentar o CSS. Não precisa também acrescentar as tags: html, body, meta. Retire os textos que estão fora de alguma tag, quero apenas os conteudos que estão dentro das tags. Se for gerado alguma lista, ajuste os tabs (acrescentando um style dentro do próprio elemento)): Um plano de carreira para um jovem (entre 14 a 24 anos) que gostaria de seguir uma carreira como ${area_usuario}. Pense que este jovem esta iniciando sua carreira profissional e ele precisa de um norte para iniciar. Faça uma introdução detalhada sobre a área (falando seus requisitos necessários). Ajude-o sugerindo faculdades para fazer, como é esta área no Brasil e no exterior hoje em dia (e como será seu panorama a longo prazo), networkings e outras coisas importantes que um jovem precisa saber para estar totalmente ciente sobre o trajeto que irá precisar seguir. Ao final, juntamente com a conclusão, diga uma mensagem de motivação.`;

    // Envia o prompt para o modelo generativo da Google
    const result = await model.generateContent(prompt);

    // Extrai a resposta gerada pela API
    const response = await result.response;

    // Converte a resposta em texto
    const text = response.text();

    // Envia a resposta gerada pela API como resposta HTTP para o cliente
    res.send(text);
}

module.exports = {
    apiGoogleBard
}