const tipo_modulo_escolhido = localStorage.getItem("Modulo");
let buscar = null;
let res_BD;

if (tipo_modulo_escolhido == "Enviar email") {
  buscar = "email";
} else if (tipo_modulo_escolhido == "Realizando entrevista") {
  buscar = "entrevista";
} else if (tipo_modulo_escolhido == "Trabalho em equipe") {
  buscar = "trabalho_equipe";
} else if (tipo_modulo_escolhido == "Resolução de problemas") {
  buscar = "res_problema";
}

let ordem_questoes = [];
let questoes_corretas = [];

function exibirPergunta(content_){
  const pergunta_p = document.getElementById("pergunta");
  const respostas = document.getElementById("respostas");

  pergunta_p.innerHTML = '';
  respostas.innerHTML = '';

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
  if (content.sucess) {
    exibirPergunta(content);

  } else {
    alert("Deu ruim os MODULOS");
  }
}

getModulos(buscar);

// Adicionando infos no html
const botao_concluir = document.querySelector("button");

botao_concluir.onclick = function () {
  const inputs = document.querySelectorAll('input[type="checkbox"]');
  let marcados = 0;
  let res_marcada;
  
  if(botao_concluir.textContent !== 'Concluir') {
    inputs.forEach(function (c) {
      if (c.checked) {
        marcados++;
        res_marcada = c.parentElement.textContent.trim();
      }
    });
  
    if (marcados === 1) {
      alert('Uma opção foi selecionada!');
      
      let img = document.querySelector('img');
      if(res_marcada[0] == questoes_corretas[0]) {
        
        img.setAttribute('src', 'img/Img_final.svg');

        // Limpando lista com a resposta correta
        while(questoes_corretas.length !== 0) {
          questoes_corretas.shift();
        }

        // Remove a primeira pergunta da lista
        ordem_questoes.shift();
  
        // Verifica se ainda há perguntas restantes
        if (ordem_questoes.length > 0) {
          // alert('Próxima pergunta!');
          setTimeout(() => {
            img.setAttribute('src', 'img/Img_boneco.svg');
          // Exiba a próxima pergunta e suas opções de resposta
          exibirPergunta(res_BD);
          }, 2000);
        } else {
          botao_concluir.textContent = 'Concluir';
  
          // alert('Você respondeu todas as perguntas!');
        }
      } else {
        alert('Resposta ERRADA!!');
      }
    } else {
      alert('Selecione apenas UMA opção!!')
    }
  } 
  else{
    window.location.href = '../Tela Explicacao Modulos - Usuario Jovem/index.html';
  }
};