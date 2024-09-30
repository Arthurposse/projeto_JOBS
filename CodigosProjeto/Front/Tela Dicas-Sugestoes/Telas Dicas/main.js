// Verificando a dica escolhida

let tema_escolhido = localStorage.getItem("tema_escolhido");

if(tema_escolhido === 'Currículo') {

}
else if(tema_escolhido === 'Entrevista') {

}
else if(tema_escolhido === 'Planejamento de carreira') {

}
else if(tema_escolhido === 'Escolhendo sua área') {

}
else {
    alert("ERROR! Não foi escolhida a dica!!");
    window.location.href = "../index.html";
}