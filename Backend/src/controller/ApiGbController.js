const { GoogleGenerativeAI } = require('@google/generative-ai');
const api_key = process.env.GEMINI_KEY;

const genAI = new GoogleGenerativeAI(api_key);

async function api_gb_planejamento(req, res) {

    const { area_usuario } = req.body;

    // Seleciona o modelo generativo da API (neste caso, o modelo 'gemini-1.5-flash')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Cria um prompt para a API gerar o plano de carreira baseado na área de interesse do usuário
    // const prompt = `ESCREVA UMA ESTRUTURA EM HTML, ESTILIZADA, NA QUAL DEVERÁ CONTER (Não precisa acrescentar o CSS. NÃO PRECISA ACRESCENTAR AS TAGS: html, meta, body, header, main e footer. Retire os textos que estão fora de alguma tag, quero apenas os conteudos que estão dentro das tags. Se for gerado alguma lista, ajuste os tabs (acrescentando um style dentro do próprio elemento)): Um plano de carreira para um jovem (entre 14 a 24 anos) que gostaria de seguir uma carreira como ${area_usuario}. Pense que este jovem esta iniciando sua carreira profissional e ele precisa de um norte para iniciar. Faça uma introdução detalhada sobre a área (falando seus requisitos necessários). Ajude-o sugerindo faculdades para fazer, como é esta área no Brasil e no exterior hoje em dia (e como será seu panorama a longo prazo), networkings e outras coisas importantes que um jovem precisa saber para estar totalmente ciente sobre o trajeto que irá precisar seguir. Ao final, juntamente com a conclusão, diga uma mensagem de motivação.`;

    // const prompt = `Crie uma estrutura em HTML organizada e estilizada que apresente um plano de carreira detalhado para um jovem de 14 a 24 anos interessado em seguir na area de ${area_usuario}. A estrutura deve incluir uma introducao sobre a area e seus requisitos, sugestoes de faculdades no Brasil e no exterior, o panorama atual e futuro da area, dicas de networking e outras orientacoes uteis. Finalize com uma mensagem motivacional. Use style inline para ajustar espacamentos em listas ou elementos e evite qualquer texto fora das tags HTML. Nao inclua as tags html, meta, body, header, main, footer ou conteudo desnecessario.`;

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

async function api_gb_dicas(req, res) {

    const { tema_escolhido } = req.body;

    // Seleciona o modelo generativo da API (neste caso, o modelo 'gemini-1.5-flash')
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Cria um prompt para a API gerar o plano de carreira baseado na área de interesse do usuário
    const prompt = `ESCREVA UMA ESTRUTURA USANDO A LINGUAGEM DE MARCAÇÃO HTML EM QUE DEVERÁ CONTER (Não precisa acrescentar o CSS. Não precisa também acrescentar as tags: html, body, meta, header, main e footer. Retire os textos que estão fora de alguma tag, textos dos quais são desnecessários, quero apenas os conteudos que estão dentro das tags. Se houver algum texto em negrito, utilize o CSS para deixa-lo como negrito. Se for gerado alguma lista, ajuste os tabs (acrescentando um style dentro do próprio elemento (faça uma divisão dos elementos para que a leitura não fique tão cansativa)): Deve conter dicas referente ${tema_escolhido}. Traga pontos importantes dos quais um jovem entre 14 a 24 anos precisa saber e dominar para se inserir ao mercado de trabalho atualmente, mas quero dicas das quais irão ajudar 100% o jovem e que serão importantes deles compreenderam hoje em dia. Traga exemplos!!`;

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
    api_gb_planejamento,
    api_gb_dicas
}