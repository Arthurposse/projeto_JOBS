// Verificando a dica escolhida

let tema_escolhido = localStorage.getItem("tema_escolhido");

let titulo_header = document.getElementById("titulo_header");

if(tema_escolhido === 'Currículo') {
    titulo_header.textContent = "Como desenvolver um currículo ideial?";
}
else if(tema_escolhido === 'Entrevista') {
    titulo_header.textContent = "Como sair bem em uma entrevista?";
}
else if(tema_escolhido === 'Planejamento de carreira') {
    titulo_header.textContent = "";
}
else if(tema_escolhido === 'Escolhendo sua área') {
    titulo_header.textContent = "Qual área é melhor escolher para minha vida?";
}
else {
    alert("ERROR! Não foi escolhida a dica!!");
    window.location.href = "../index.html";
}