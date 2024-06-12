const tipo_modulo_escolhido = localStorage.getItem("Modulo");
let buscar = null;

if (tipo_modulo_escolhido == "Enviar email") {
  buscar = "email";
} else if (tipo_modulo_escolhido == "Realizando entrevista") {
  buscar = "entrevista";
} else if (tipo_modulo_escolhido == "Trabalho em equipe") {
  buscar = "trabalho_equipe";
} else if (tipo_modulo_escolhido == "Resolução de problemas") {
  buscar = "res_problema";
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

  // Verificação da estrutura de sucesso
  if (content.sucess) {
    const pergunta_p = document.getElementById('pergunta');
    pergunta_p.textContent = content.data[0].pergunta;

    const respostas = document.getElementById('respostas');
    respostas.innerHTML = ''; // Limpar respostas antes de adicionar novas

    for (let i = 0; i < 1; i++) {
      for (let j = 1; j <= 3; j++) {
        let questao = `questao_${j}`;
        if (content.data[i] && content.data[i][questao]) {
          let buscando = content.data[i][questao];
          let elemento = `<p><input type="checkbox"> ${buscando} </p>`;
          respostas.innerHTML += elemento;
        } else {
          console.error(`Propriedade ${questao} não encontrada em content.data[${i}]`);
        }
      }
    }
  } else {
    alert("Deu ruim os MODULOS");
  }
}

getModulos(buscar);

// Adicionando infos no html
const botao_concluir = document.querySelector('button');

botao_concluir.onclick = function () {
  const inputs = document.querySelectorAll('input[type="checkbox"]');
  let marcados = 0;
  inputs.forEach(function (c) {
    if (c.checked) {
      marcados++;
      console.log(c.parentElement.textContent.trim());
    }
  });

  if (marcados === 1) {
    console.log("Apenas uma opção foi selecionada.");
    // Somar acerto
  } else {
    console.log("Por favor, selecione apenas uma opção.");
    // Somar erro
  }
};
