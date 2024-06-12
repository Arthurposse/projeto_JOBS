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
  let num_aleatorio = Math.floor(Math.random() * content.data.length);
  console.log(num_aleatorio);
  // Verificação da estrutura de sucesso
  if (content.sucess) {
    const pergunta_p = document.getElementById('pergunta');
    pergunta_p.textContent = content.data[num_aleatorio].pergunta;

    const respostas = document.getElementById('respostas');
    respostas.innerHTML = ''; // Limpar respostas antes de adicionar novas

    for (let j = 1; j <= 3; j++) {
      let questao = `questao_${j}`;
      if (content.data[num_aleatorio] && content.data[num_aleatorio][questao]) {
        let buscando = content.data[num_aleatorio][questao];
        let elemento = `<p><input type="checkbox"> ${buscando} </p>`;
        respostas.innerHTML += elemento;
      } else {
        console.error(`Propriedade ${questao} não encontrada em content.data[${num_aleatorio}]`);
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
    alert('Uma opção foi selecionada!')
    // Somar acerto
  } else {
    alert('Selecione apenas UMA opção!!')
    // Somar erro
  }
};
