// Verificando se o usuário esta logado

document.addEventListener("DOMContentLoaded", () => {
  const fundoEscuro = document.querySelector(".fundo_escuro");
  const footer = document.querySelector("footer");

  if (!localStorage.getItem("ID_user")) {
    // Adiciona a classe 'active' para exibir o fundo
    fundoEscuro.classList.add("active");

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
let buscar = null;
let res_BD;

if (tipo_modulo_escolhido == "Enviar email") {
  buscar = "email";
  localStorage.setItem("Modulo", buscar);
} else if (tipo_modulo_escolhido == "Realizando entrevista") {
  buscar = "entrevista";
  localStorage.setItem("Modulo", buscar);
} else if (tipo_modulo_escolhido == "Trabalho em equipe") {
  buscar = "trabalho_equipe";
  localStorage.setItem("Modulo", buscar);
} else if (tipo_modulo_escolhido == "Resolução de problemas") {
  buscar = "res_problema";
  localStorage.setItem("Modulo", buscar);
}

let respostas_marcadas = [];
let ordem_questoes = [];
let questoes_corretas = [];

function exibirPergunta(content_) {
  const pergunta_p = document.getElementById("pergunta");
  const respostas = document.getElementById("respostas");

  pergunta_p.innerHTML = "";
  respostas.innerHTML = "";

  pergunta_p.textContent = content_.data[ordem_questoes[0]].pergunta;

  for (let j = 1; j <= 3; j++) {
    let questao = `questao_${j}`;
    if (
      content_.data[ordem_questoes[0]] &&
      content_.data[ordem_questoes[0]][questao]
    ) {
      let buscando = content_.data[ordem_questoes[0]][questao];
      questoes_corretas.push(content_.data[ordem_questoes[0]].res_correta);
      let elemento = `<p><input type="checkbox"> ${buscando} </p>`;
      respostas.innerHTML += elemento;
    } else {
      console.error(
        `Propriedade ${questao} não encontrada em content_.data[${ordem_questoes[0]}]`
      );
    }
  }
}

// GET Perguntas e Respostas
async function getModulos(buscar_modulo) {
  const response = await fetch(
    `http://localhost:3008/api/modulosJovem?tipo_modulo=${buscar_modulo}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  let content = await response.json();
  res_BD = content;

  let totalQuestoes = content.data.length;
  localStorage.setItem("Total_questoes", totalQuestoes);

  let numerosUsados = [];

  for (let i = 0; i < totalQuestoes; i++) {
    let num_aleatorio;
    do {
      num_aleatorio = Math.floor(Math.random() * totalQuestoes);
    } while (numerosUsados.includes(num_aleatorio)); // Verifica se o número já foi usado
    ordem_questoes.push(num_aleatorio);
    numerosUsados.push(num_aleatorio); // Adiciona o número à lista de números usados
  }

  // Verificação da estrutura de sucesso
  if (content.success) {
    localStorage.setItem("Ordem_questoes", JSON.stringify(ordem_questoes));
    exibirPergunta(content);
  } else {
    alert("Deu ruim os MODULOS");
  }
}

getModulos(buscar);

// Adicionando infos no html
const botao_concluir = document.querySelector("button");

let cont_pontos = 0;

botao_concluir.onclick = function () {
  const inputs = document.querySelectorAll('input[type="checkbox"]');
  let marcados = 0;
  let res_marcada;

  if (botao_concluir.textContent !== "Concluir") {
    inputs.forEach(function (c) {
      if (c.checked) {
        marcados++;
        res_marcada = c.parentElement.textContent.trim();
      }
    });

    if (marcados === 1) {
      respostas_marcadas.push(res_marcada[0]);

      if (res_marcada[0] == questoes_corretas[0]) {
        Swal.fire({
          title: "Parábens, você acertou!!",
          text: "Bora ver quantas você acertou?",
          imageUrl: "../images/Img_final.svg",
          imageHeight: 300,
          confirmButtonColor: "#0e566a",
        });

        // Limpando lista com a resposta correta
        while (questoes_corretas.length !== 0) {
          questoes_corretas.shift();
        }

        // Remove a primeira pergunta da lista
        ordem_questoes.shift();

        // Verifica se ainda há perguntas restantes
        if (ordem_questoes.length > 0) {
          // alert('Próxima pergunta!');
          Swal.fire({
            title: "Parábens, você acertou!!",
            text: "Bora pra próxima!!",
            imageUrl: "../images/Img_final.svg",
            imageHeight: 300,
            confirmButtonColor: "#0e566a",
          });

          cont_pontos += 1;

          // Exiba a próxima pergunta e suas opções de resposta
          exibirPergunta(res_BD);
        } else {
          cont_pontos += 1;

          botao_concluir.textContent = "Concluir";

          // alert('Você respondeu todas as perguntas!');
        }
      } else {
        Swal.fire({
          title: "Infelizmente você errou.",
          text: "Mais sorte na próxima vez!!",
          imageUrl: "../images/Img_boneco_errou.svg",
          imageHeight: 300,
          confirmButtonColor: "#0e566a",
        });

        // Limpando lista com a resposta correta
        while (questoes_corretas.length !== 0) {
          questoes_corretas.shift();
        }

        // Remove a primeira pergunta da lista
        ordem_questoes.shift();

        if (ordem_questoes.length > 0) {
          // Exiba a próxima pergunta e suas opções de resposta
          exibirPergunta(res_BD);
        } else {
          localStorage.setItem("Pontos", cont_pontos);

          botao_concluir.textContent = "Concluir";
        }
      }
    } else {
      alert("Selecione apenas UMA opção!!");
    }
  } else {
    localStorage.setItem("Pontos", cont_pontos);
    localStorage.setItem("Res_user", JSON.stringify(respostas_marcadas));

    window.location.href =
      "../Tela Explicacao Modulos - Usuario Jovem/index.html";
  }
};
