const tipo_modulo_escolhido = localStorage.getItem("Modulo");
const h2_quant_acertos = document.getElementById('quant_acertos');

let acertos = 5;
let erros = 10;

h2_quant_acertos.textContent = `Você acertou ${acertos}/${erros}!!`

let explicacao = document.getElementById("explicacao");

if (tipo_modulo_escolhido == "Enviar email") {
  explicacao.textContent = "EMAIL";

} else if (tipo_modulo_escolhido == "Realizando entrevista") {
  explicacao.textContent = "ENTREVISTA";

} else if (tipo_modulo_escolhido == "Trabalho em equipe") {
  explicacao.textContent = "TRABALHO EM EQUIPE";

} else if (tipo_modulo_escolhido == "Resolução de problemas") {
  explicacao.textContent = "RESOLUÇÃO DE PROBLEMAS";
}

const botao_voltar_inicio = document.querySelector('button');

botao_voltar_inicio.onclick = function(){
    window.location.href = '../Tela Home - Usuario Jovem/index.html';
}