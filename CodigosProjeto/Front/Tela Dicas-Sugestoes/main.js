// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Carregando as dúvidas

async function carregarDuvidas() {
  let data = { id_user };

  // POST
  const response = await fetch("http://localhost:3008/api/carregarDuvidas", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.success) {
    for (let i = 0; i < content.data.length; i++) {
      if (content.data[i].id_user !== id_user) {
        // Criando o elemento <section> com a classe "card_duv_jovem"
        const cardDuvida = document.createElement("section");
        cardDuvida.className = "card_duv_jovem";

        // Criando o elemento <section> com a classe "usuario_duvida"
        const usuarioDuvida = document.createElement("section");
        usuarioDuvida.className = "usuario_duvida";

        // Criando o elemento <img> para a imagem do perfil
        const imgPerfil = document.createElement("img");
        imgPerfil.src = "../images/Usuario_nao_logado.png";
        imgPerfil.alt = "Foto de perfil do usuário";

        // Criando o elemento <h2> para o nome do usuário
        const nomeUsuario = document.createElement("h2");
        nomeUsuario.textContent = content.data[i].nome_user;

        // Criando o parágrafo <p> para a dúvida
        const duvidaTexto = document.createElement("p");
        duvidaTexto.id = "duvida";
        duvidaTexto.textContent = content.data[i].duvida;

        // Montando a estrutura do DOM
        usuarioDuvida.appendChild(imgPerfil);
        usuarioDuvida.appendChild(nomeUsuario);

        cardDuvida.appendChild(usuarioDuvida);
        cardDuvida.appendChild(duvidaTexto);

        // Adicionando o card ao DOM (em algum elemento pai, como uma <div> existente)
        document.querySelector(".secao_cards").appendChild(cardDuvida);
      }
    }
  }
}

carregarDuvidas();

// Compartilhamento da dúvida

const botao_criar_duvida = document.getElementById("criar_duvida");

botao_criar_duvida.addEventListener("click", function () {
  Swal.fire({
    title: "Compartilhe sua dúvida!!",
    input: "text",
    inputPlaceholder: "Digite sua pergunta",
    showCancelButton: true,
    confirmButtonText: "Postar",
    confirmButtonColor: "#19a7ce",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#d33",
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, digite algo!!";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      async function enviandoDuvida() {
        let duvida = result.value;

        let data = { id_user, User_name, duvida };

        // POST
        const response = await fetch("http://localhost:3008/api/enviarDuvida", {
          method: "POST",
          headers: { "Content-type": "application/json;charset=UTF-8" },
          body: JSON.stringify(data),
        });

        let content = await response.json();
        console.log(content);
      }

      enviandoDuvida();
    }
  });
});