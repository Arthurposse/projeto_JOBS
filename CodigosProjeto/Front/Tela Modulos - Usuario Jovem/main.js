const tipo_modulo_escolhido = localStorage.getItem("Modulo");
let buscar = null;

if (tipo_modulo_escolhido === "Enviar email") {
  buscar = "email";
} else if (tipo_modulo_escolhido === "Realizando entrevista") {
  buscar = "entrevista";
} else if (tipo_modulo_escolhido === "Trabalho em equipe") {
  buscar = "trabalho_equipe";
} else if (tipo_modulo_escolhido === "Resolução de problemas") {
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
  console.log(content);

  if (content.sucess) {
    alert("Deu bom os MODULOS");
  } else {
    alert("Deu ruim os MODULOS");
  }
}

getModulos(buscar);

const botao_concluir = document.querySelector('button');

const inputs = document.querySelectorAll('input[type="checkbox"]');

botao_concluir.onclick = function () {
  let marcados = 0;
  inputs.forEach(function (c) {
    if (c.checked) {
      marcados++;
      console.log(c.parentElement.textContent.trim());
    }
  });

  if (marcados === 1) {
    console.log("Apenas uma opção foi selecionada.");
  } else {
    console.log("Por favor, selecione apenas uma opção.");
  }
};