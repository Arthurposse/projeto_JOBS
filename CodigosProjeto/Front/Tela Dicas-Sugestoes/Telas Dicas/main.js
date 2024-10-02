// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Verificando a dica escolhida

let tema_escolhido = localStorage.getItem("tema_escolhido");

let titulo_header = document.getElementById("titulo_header");
let titulo_main = document.getElementById("titulo_main");
const img_dica = document.getElementById("img_dica");

if (tema_escolhido == 'Currículo') {
    titulo_header.textContent = "Como desenvolver um currículo ideial?";
    titulo_main.textContent = "Currículo";
    img_dica.src = "../../images/img_curriculo.svg";
}
else if (tema_escolhido == 'Entrevista') {
    titulo_header.textContent = "Como sair bem em uma entrevista?";
    titulo_main.textContent = "Entrevista";
    img_dica.src = "../../images/img_entrevista.svg";
}
else if (tema_escolhido == 'Planejamento de carreira') {
    titulo_header.textContent = "";
    titulo_main.textContent = "Planejamento de Carreira";
    img_dica.src = "../../images/img_planejamento.svg";
}
else if (tema_escolhido == 'Escolhendo sua área') {
    titulo_header.textContent = "Qual área é melhor escolher para minha vida?";
    titulo_main.textContent = "Escolhendo sua Área";
    img_dica.src = "../../images/img_escolhendo_area.svg";
}
else {
    alert("ERROR! Não foi escolhida a dica!!");
    window.location.href = "../index.html";
}

const container_dica = document.querySelector('.container_dica');

async function gerarDica() {

    // Bloqueando a rolagem
    document.body.style.overflow = 'hidden';

    Swal.fire({
        title: 'Sua dica esta sendo escrita',
        text: 'Aguarde enquanto processamos...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();  // Mostra o ícone de carregamento
        }
    });

    const response = await fetch(`http://localhost:3008/api/apiGB_dicas`, {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ tema_escolhido }),
    });

    container_dica.innerHTML += "";
    const dica = await response.text();
    
    container_dica.innerHTML += dica;

    // Desbloquando a rolagem
    document.body.style.overflow = 'auto';

    Swal.close();
};

// Foi acrescentado o setTimeout para que o HTML seja carregado primeiramente
setTimeout(() => {
    gerarDica();
}, 10);