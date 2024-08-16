const tipo_modulo_escolhido = localStorage.getItem("Modulo");
const h2_quant_acertos = document.getElementById("quant_acertos");

let total_acertos = localStorage.getItem("Pontos");
let total_questoes = localStorage.getItem("Total_questoes");

h2_quant_acertos.textContent = `Você acertou ${total_acertos}/${total_questoes}!!`;

let explicacao = document.getElementById("explicacao");

if (tipo_modulo_escolhido == "Enviar email") {
  explicacao.textContent = "Enviar e-mails de forma profissional é uma habilidade essencial no ambiente de trabalho. Um e-mail bem escrito deve ser claro, direto e objetivo, com um tom respeitoso e adequado ao contexto. A escolha de um assunto conciso e específico facilita a leitura e compreensão do destinatário. Além disso, é importante revisar o conteúdo para evitar erros gramaticais ou de digitação, que podem prejudicar a imagem profissional. Uma saudação e uma assinatura adequadas também são fundamentais para concluir o e-mail de maneira correta. Esses cuidados ajudam a garantir que a mensagem seja bem recebida e compreendida, reforçando a credibilidade e o profissionalismo de quem a envia.";

} else if (tipo_modulo_escolhido == "Realizando entrevista") {
  explicacao.textContent = "Uma entrevista de emprego é uma etapa crucial no processo de seleção. Ela oferece ao candidato a oportunidade de demonstrar suas habilidades, experiências e adequação à vaga, ao mesmo tempo em que permite à empresa avaliar se o perfil do candidato se alinha às necessidades e à cultura organizacional. Preparar-se para a entrevista é fundamental: conhecer a empresa, revisar seu próprio histórico profissional e praticar respostas para perguntas comuns ajudam a criar confiança. Além disso, apresentar-se de maneira adequada, manter uma postura positiva e comunicar-se com clareza são elementos chave para causar uma boa impressão. A entrevista vai além das respostas; é uma chance de mostrar interesse genuíno e de estabelecer uma conexão com o entrevistador.";

} else if (tipo_modulo_escolhido == "Trabalho em equipe") {
  explicacao.textContent = "O trabalho em equipe é fundamental para o sucesso em qualquer ambiente profissional. Ele envolve a colaboração entre indivíduos com habilidades e perspectivas diferentes, que se unem para alcançar objetivos comuns. Quando uma equipe trabalha de forma eficaz, as forças de cada membro são potencializadas, permitindo a superação de desafios e a criação de soluções inovadoras. A comunicação aberta, o respeito mútuo e a capacidade de ouvir e considerar as ideias dos outros são pilares essenciais para o bom funcionamento de uma equipe. Além disso, o reconhecimento e a valorização das contribuições individuais fortalecem o espírito de cooperação, promovendo um ambiente onde todos se sentem motivados a dar o seu melhor. Trabalhar em equipe não só aumenta a eficiência, mas também cria um ambiente de apoio e crescimento profissional contínuo.";

} else if (tipo_modulo_escolhido == "Resolução de problemas") {
  explicacao.textContent = "A resolução de problemas é uma competência essencial no ambiente de trabalho, pois permite lidar de maneira eficaz com desafios e obstáculos que surgem no dia a dia. Esse processo envolve identificar claramente o problema, analisar suas causas, considerar diferentes soluções e implementar a mais adequada. Habilidades como pensamento crítico, criatividade e tomada de decisão são fundamentais para encontrar soluções eficazes. Além disso, a capacidade de manter a calma sob pressão e colaborar com outros para obter diferentes perspectivas pode ser decisiva para o sucesso. A resolução de problemas não apenas resolve situações imediatas, mas também contribui para o crescimento pessoal e profissional, melhorando continuamente processos e resultados.";
}

// Explicação das questões



// Botão voltar para home
const botao_voltar_inicio = document.querySelector("button");

botao_voltar_inicio.onclick = function () {

  localStorage.removeItem('Total_questoes');
  localStorage.removeItem('Pontos');
  localStorage.removeItem('Modulo');
  
  window.location.href = "../Tela Home - Usuario Jovem/index.html";
};