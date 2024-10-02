// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Verificando a dica escolhida

let tema_escolhido = localStorage.getItem("tema_escolhido");

let titulo_header = document.getElementById("titulo_header");
let titulo_main = document.getElementById("titulo_main");

if (tema_escolhido == 'Currículo') {
    titulo_header.textContent = "Como desenvolver um currículo ideial?";
    titulo_main.textContent = "Currículo";
}
else if (tema_escolhido == 'Entrevista') {
    titulo_header.textContent = "Como sair bem em uma entrevista?";
    titulo_main.textContent = "Entrevista";
}
else if (tema_escolhido == 'Planejamento de carreira') {
    titulo_header.textContent = "";
    titulo_main.textContent = "Planejamento de Carreira";
}
else if (tema_escolhido == 'Escolhendo sua área') {
    titulo_header.textContent = "Qual área é melhor escolher para minha vida?";
    titulo_main.textContent = "Escolhendo sua Área";
}
else {
    alert("ERROR! Não foi escolhida a dica!!");
    alert(tema_escolhido)
    window.location.href = "../index.html";
}

const main = document.querySelector('main');
const container_dica = document.querySelector('.container_dica');

async function gerarDica() {
    const response = await fetch(`http://localhost:3008/api/apiGB_dicas`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ tema_escolhido }),
    });

    
    container_dica.innerHTML += "";
    const dica = await response.text();
    
    main.style.heigth = "auto";
    container_dica.innerHTML += dica;
};

gerarDica();