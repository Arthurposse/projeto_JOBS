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

        // Adicionando o card dentro da tag HTML
        document.querySelector(".secao_cards").appendChild(cardDuvida);

        // Adicionando o evento de clique ao card
        cardDuvida.addEventListener("click", () => {
          localStorage.setItem('id_duvida', content.data[i].id_duvida);
          localStorage.setItem('texto_duvida', content.data[i].duvida);
          window.location.href = '../Tela Visualizando Duvida/index.html';
        });
      }
    }
  } else {
    alert("Deu erro!!");
  }
}

carregarDuvidas();

// Compartilhamento da dúvida

const botao_criar_duvida = document.getElementById("criar_duvida");

botao_criar_duvida.addEventListener("click", function () {
  Swal.fire({
    title: "Compartilhe sua dúvida!!",
    input: "textarea",
    inputPlaceholder: "Digite sua pergunta",
    inputAttributes: {
      maxlength: 200, // Limite de caracteres
    },
    customClass: {
      input: "alert_textarea", // Classe CSS personalizada para o textarea
    },
    showCancelButton: true,
    confirmButtonText: "Postar",
    confirmButtonColor: "#0e566a",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#d33",
    inputValidator: (value) => {
      if (!value) {
        return "Por favor, digite algo!!";
      }
      if (value.length > 200) {
        // Verifica se o valor excede o limite
        return "A dúvida deve ter no máximo 200 caracteres!!";
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

        if (content.success) {
          Swal.fire({
            title: "Dúvida enviada com sucesso!!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000
          });
        }
        else {
          Swal.fire({
            title: "Erro ao enviar a dúvida!!",
            text: "Tente novamente!!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000
          });
        }
      }

      enviandoDuvida();
    }
  });
});