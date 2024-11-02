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
    document.title = "JOBS - Dica Currículo";
    titulo_header.textContent = "Como desenvolver um currículo ideial?";
    titulo_main.textContent = "Currículo";
    img_dica.src = "../../images/img_curriculo.svg";
}
else if (tema_escolhido == 'Entrevista') {
    document.title = "JOBS - Dica Entrevista";
    titulo_header.textContent = "Como sair bem em uma entrevista?";
    titulo_main.textContent = "Entrevista";
    img_dica.src = "../../images/img_entrevista.svg";
}
else if (tema_escolhido == 'Planejamento de carreira') {
    document.title = "JOBS - Dica Planejamento";
    titulo_header.textContent = "Como elaborar o melhor trajeto para sua vida?";
    titulo_main.textContent = "Planejamento de Carreira";
    img_dica.src = "../../images/img_planejamento.svg";
}
else if (tema_escolhido == 'Escolhendo sua área') {
    document.title = "JOBS - Dica Área";
    titulo_header.textContent = "Qual área é melhor escolher para minha vida?";
    titulo_main.textContent = "Escolhendo sua Área";
    img_dica.src = "../../images/img_escolhendo_area.svg";
}
else if(tema_escolhido == 'Cuidados físicos e com a saúde mental') {
    document.title = "JOBS - Dica Saúde";
    titulo_header.textContent = "Como posso equilibrar meus cuidados físicos e mentais?";
    titulo_main.textContent = "Cuidados físicos e com a saúde mental";
    img_dica.src = "../../images/img_coracao.svg";
}
else if(tema_escolhido == 'Gestão de tempo') {
    document.title = "JOBS - Dica Tempo";
    titulo_header.textContent = "Como posso gerenciar meu tempo de forma mais eficaz?";
    titulo_main.textContent = "Gestão de tempo";
    img_dica.src = "../../images/img_gestao_tempo.svg";
}
else {
    alert("ERROR! Não foi escolhida a dica!!");
    window.location.href = "../index.html";
}

const container_dica = document.querySelector('.container_dica');
const fundo_escuro = document.querySelector('.fundo_escuro');

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

    if(dica.includes('#')) {
        Swal.fire({
            title: "Erro ao criar a dica!!",
            text: "Tente novamente!!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });

          setTimeout(() => {
            window.location.href = "../index.html";
          }, 2000);
    }
    else {
        container_dica.innerHTML += dica;
    
        Swal.fire({
            title: "Sucesso ao criar a dica!!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });

        setTimeout(() => {
            // Faz com que o fundo escuro desapareça
            fundo_escuro.style.display = "none";
    
            // Desbloqueando a rolagem
            document.body.style.overflow = 'auto';
    
            Swal.close();
        }, 2000);
    }
};

// Foi acrescentado o setTimeout para que o HTML seja carregado primeiramente
setTimeout(() => {
    gerarDica();
}, 10);

const botao_voltar = document.getElementById('botao_voltar');

botao_voltar.onclick = function() {
    localStorage.removeItem('tema_escolhido');
    window.location.href = "../index.html";
}