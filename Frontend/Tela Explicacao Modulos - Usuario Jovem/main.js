// Removendo localStorage que não será utilizado na página

localStorage.removeItem('User_name_antigo');
localStorage.removeItem('tema_escolhido');

// Verificando se o usuário esta logado

document.addEventListener("DOMContentLoaded", () => {
  const fundoEscuro = document.querySelector(".fundo_escuro");
  const footer = document.querySelector("footer");

  if (!localStorage.getItem("ID_user")) {
    // Adiciona a classe 'active' para exibir o fundo
    fundoEscuro.classList.add("active");
    footer.style.display = "none";

    // Usa requestAnimationFrame para garantir que o fundo seja renderizado antes do SweetAlert
    requestAnimationFrame(() => {
      Swal.fire({
        title: "É necessário realizar o LogIn!!",
        text: "Se ainda não possui, realize o cadastro!!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2400,
        willClose: () => {
          // Remove o fundo após o SweetAlert fechar
          fundoEscuro.classList.remove("active");
          window.location.href = "../Tela Home - Sem Usuario Logado/index.html";
        },
      });
    });
  }
});

const tipo_modulo_escolhido = localStorage.getItem("Modulo");
const h2_quant_acertos = document.getElementById("quant_acertos");

let total_acertos = localStorage.getItem("Pontos");
let total_questoes = localStorage.getItem("Total_questoes");

h2_quant_acertos.textContent = `Você acertou ${total_acertos}/${total_questoes}!!`;

let explicacao = document.getElementById("explicacao");

if (tipo_modulo_escolhido == "email") {
  explicacao.textContent =
    "Enviar e-mails de forma profissional é uma habilidade essencial no ambiente de trabalho. Um e-mail bem escrito deve ser claro, direto e objetivo, com um tom respeitoso e adequado ao contexto. A escolha de um assunto conciso e específico facilita a leitura e compreensão do destinatário. Além disso, é importante revisar o conteúdo para evitar erros gramaticais ou de digitação, que podem prejudicar a imagem profissional. Uma saudação e uma assinatura adequadas também são fundamentais para concluir o e-mail de maneira correta. Esses cuidados ajudam a garantir que a mensagem seja bem recebida e compreendida, reforçando a credibilidade e o profissionalismo de quem a envia.";
} else if (tipo_modulo_escolhido == "entrevista") {
  explicacao.textContent =
    "Uma entrevista de emprego é uma etapa crucial no processo de seleção. Ela oferece ao candidato a oportunidade de demonstrar suas habilidades, experiências e adequação à vaga, ao mesmo tempo em que permite à empresa avaliar se o perfil do candidato se alinha às necessidades e à cultura organizacional. Preparar-se para a entrevista é fundamental: conhecer a empresa, revisar seu próprio histórico profissional e praticar respostas para perguntas comuns ajudam a criar confiança. Além disso, apresentar-se de maneira adequada, manter uma postura positiva e comunicar-se com clareza são elementos chave para causar uma boa impressão. A entrevista vai além das respostas; é uma chance de mostrar interesse genuíno e de estabelecer uma conexão com o entrevistador.";
} else if (tipo_modulo_escolhido == "trabalho_equipe") {
  explicacao.textContent =
    "O trabalho em equipe é fundamental para o sucesso em qualquer ambiente profissional. Ele envolve a colaboração entre indivíduos com habilidades e perspectivas diferentes, que se unem para alcançar objetivos comuns. Quando uma equipe trabalha de forma eficaz, as forças de cada membro são potencializadas, permitindo a superação de desafios e a criação de soluções inovadoras. A comunicação aberta, o respeito mútuo e a capacidade de ouvir e considerar as ideias dos outros são pilares essenciais para o bom funcionamento de uma equipe. Além disso, o reconhecimento e a valorização das contribuições individuais fortalecem o espírito de cooperação, promovendo um ambiente onde todos se sentem motivados a dar o seu melhor. Trabalhar em equipe não só aumenta a eficiência, mas também cria um ambiente de apoio e crescimento profissional contínuo.";
} else if (tipo_modulo_escolhido == "res_problema") {
  explicacao.textContent =
    "A resolução de problemas é uma competência essencial no ambiente de trabalho, pois permite lidar de maneira eficaz com desafios e obstáculos que surgem no dia a dia. Esse processo envolve identificar claramente o problema, analisar suas causas, considerar diferentes soluções e implementar a mais adequada. Habilidades como pensamento crítico, criatividade e tomada de decisão são fundamentais para encontrar soluções eficazes. Além disso, a capacidade de manter a calma sob pressão e colaborar com outros para obter diferentes perspectivas pode ser decisiva para o sucesso. A resolução de problemas não apenas resolve situações imediatas, mas também contribui para o crescimento pessoal e profissional, melhorando continuamente processos e resultados.";
}

// Comparação questões

async function addDadosTabela(buscar_modulo) {
  const response = await fetch(
    `http://localhost:3008/api/modulosJovem?tipo_modulo=${buscar_modulo}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  content = await response.json();
  console.log(content)

  if (content.success) {
    for (let i = 0; i < content.data.length; i++) {
      const ordem_questoes = JSON.parse(localStorage.getItem("Ordem_questoes"));
      let respostas_marcadas = JSON.parse(localStorage.getItem("Res_user"));

      const table = document.querySelector("table");

      // Criar a linha
      const tr = document.createElement("tr");

      // Criar as tags e adicionar suas infos
      const tdPergunta = document.createElement("td");
      tdPergunta.textContent = content.data[ordem_questoes[i]].pergunta;
      tr.appendChild(tdPergunta);

      const tdRespostaUser = document.createElement("td");
      tdRespostaUser.textContent = respostas_marcadas[i];
      tr.appendChild(tdRespostaUser);

      const tdRespostaCorreta = document.createElement("td");
      tdRespostaCorreta.textContent =
        content.data[ordem_questoes[i]].res_correta;
      tr.appendChild(tdRespostaCorreta);

      if (tdRespostaUser.textContent === tdRespostaCorreta.textContent) {
        tdRespostaUser.style.backgroundColor = "green";
      } else {
        tdRespostaUser.style.backgroundColor = "red";
      }

      const tdExplicacao = document.createElement("td");
      tdExplicacao.textContent = content.data[ordem_questoes[i]].explicacao;
      tr.appendChild(tdExplicacao);

      // Adicionar a linha na tabela
      table.appendChild(tr);
    }
  } else {
    alert("ERROR!!");
    console.error();
  }
}

addDadosTabela(tipo_modulo_escolhido);

// Botão voltar para home
const botao_voltar_inicio = document.querySelector("button");

botao_voltar_inicio.onclick = function () {
  localStorage.removeItem("Total_questoes");
  localStorage.removeItem("Pontos");
  localStorage.removeItem("Modulo");
  localStorage.removeItem("Res_user");
  localStorage.removeItem("Ordem_questoes");

  window.location.href = "../Tela Home - Usuario Jovem/index.html";
};
