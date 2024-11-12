// Removendo localStorage que não será utilizado na página

localStorage.removeItem('Modulo');
localStorage.removeItem('Total_questoes');
localStorage.removeItem('Ordem_questoes');
localStorage.removeItem('Pontos');
localStorage.removeItem('Res_user');
localStorage.removeItem('User_name_antigo');
localStorage.removeItem('tema_escolhido');

// Verificando se o usuário esta logado

document.addEventListener("DOMContentLoaded", () => {
  const fundoEscuro = document.querySelector(".fundo_escuro");
  const footer = document.querySelector("footer");

  if (!localStorage.getItem("ID_user")) {
    // Adiciona a classe 'active' para exibir o fundo
    fundoEscuro.classList.add("active");
    footer.style.display = "none";

    // Usa requestAnimationFrame para garantir que o fundo seja renderizado antes do SweetAlert
    requestAnimationFrame(() => {
      Swal.fire({
        title: "É necessário realizar o LogIn!!",
        text: "Se ainda não possui, realize o cadastro!!",
        icon: "warning",
        showConfirmButton: false,
        timer: 2400,
        willClose: () => {
          // Remove o fundo após o SweetAlert fechar
          fundoEscuro.classList.remove("active");
          window.location.href = "../Tela Home - Sem Usuario Logado/index.html";
        },
      });
    });
  }
});

// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Direcionamento telas dicas

const cards = document.querySelectorAll(".quadrado_dica");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    const texto_card = this.querySelector("h3").textContent;
    localStorage.setItem("tema_escolhido", texto_card);
    window.location.href = "./Telas Dicas/index.html";
  });
});

// Carregando as dúvidas

// Variáveis para controlar a exibição das dúvidas em blocos de 3
let currentIndex = 0;
let duvidas = [];

// Função para embaralhar o array de dúvidas
function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Função para exibir o próximo grupo de 3 dúvidas
function exibirProximasDuvidas() {
  const secaoCards = document.querySelector(".secao_cards");

  // Verifica se há dúvidas restantes para exibir
  if (currentIndex >= duvidas.length) {
    Swal.fire({
      title: "Não tem mais dúvidas para carregar.",
      icon: "warning",
      showConfirmButton: false,
      timer: 2000,
    });
    return;
  }

  // Exibe até 3 dúvidas por vez
  for (let i = currentIndex; i < currentIndex + 4 && i < duvidas.length; i++) {
    const duvida = duvidas[i];

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
    nomeUsuario.textContent = duvida.nome_user;

    // Criando o parágrafo <p> para a dúvida
    const duvidaTexto = document.createElement("p");
    duvidaTexto.id = "duvida";
    duvidaTexto.textContent = duvida.duvida;

    // Montando a estrutura do DOM
    usuarioDuvida.appendChild(imgPerfil);
    usuarioDuvida.appendChild(nomeUsuario);
    cardDuvida.appendChild(usuarioDuvida);
    cardDuvida.appendChild(duvidaTexto);

    // Adicionando o card dentro da tag HTML
    secaoCards.appendChild(cardDuvida);

    // Adicionando o evento de clique ao card
    cardDuvida.addEventListener("click", () => {
      localStorage.setItem("tipo_usuario", "Jovem");
      localStorage.setItem("id_duvida", duvida.id_duvida);
      window.location.href = "../Tela Visualizando Duvida/index.html";
    });
  }

  // Atualiza o índice para o próximo grupo de 3 dúvidas
  currentIndex += 4
}

// Função para carregar as dúvidas do servidor
async function carregarDuvidas() {
  let data = { id_user };

  // POST
  const response = await fetch("http://localhost:3008/api/carregarDuvidas", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();

  if (content.success) {
    duvidas = content.data; // Armazena as dúvidas recebidas
    embaralharArray(duvidas); // Embaralha as dúvidas para exibição aleatória
    currentIndex = 0; // Reinicia o índice
    exibirProximasDuvidas(); // Exibe o primeiro grupo de 3 dúvidas
  } else {
    Swal.fire({
      title: "Não foi possível carregar a dúvida!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
}

// Evento para carregar mais dúvidas ao clicar em um botão
document.getElementById("botao_mais").addEventListener("click", exibirProximasDuvidas);

// Inicia carregando as dúvidas
carregarDuvidas();

// Carregando a quantidade de dúvidas do usuário

let quant_duv_user = document.getElementById('quant_duv_user');

async function carregarDuvidasUser() {
  const response = await fetch("http://localhost:3008/api/duvidas/carregarDuvUser", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ id_user }),
  });

  let content = await response.json();

  if (content.success) {
    quant_duv_user.textContent = content.data.length;
  }
  else {
    alert('Erro ao carregar a quantidade de dúvidas do usuário');
    console.error();
  }
}

carregarDuvidasUser();

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

        if (content.success) {
          Swal.fire({
            title: "Dúvida enviada com sucesso!!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire({
            title: "Erro ao enviar a dúvida!!",
            text: "Tente novamente!!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }

      enviandoDuvida();
    }
  });
});

// Redirecionamento para a página das dúvidas do usuário

let duvidas_usuario = document.querySelector('.duvidas_usuario');

duvidas_usuario.onclick = async function () {
  if (quant_duv_user.textContent === '' || quant_duv_user.textContent === '0') {
    Swal.fire({
      title: "Você ainda não enviou uma dúvida!!",
      text: "Tire sua dúvida!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  else {
    const response = await fetch("http://localhost:3008/api/duvidas/carregarDuvUser", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ id_user }),
    });

    let content = await response.json();

    if (content.success) {
      const opcoes = {};

      for (let i = 0; i < content.data.length; i++) {
        opcoes[`${content.data[i].id_duvida}`] = `${content.data[i].duvida.slice(0, 45)}...`;
      }

      const { value: duvidas } = await Swal.fire({
        title: "Selecione a dúvida",
        input: "select",
        inputOptions: opcoes,
        inputPlaceholder: "Selecionar sua dúvida que deseja visualizar",
        showCancelButton: true,
        confirmButtonColor: "#0e566a",
      });
      if (duvidas) {
        localStorage.setItem('id_duvida', duvidas);
        window.location.href = "../Tela Visualizando Duvida/index.html";
      }
    }
  }
}