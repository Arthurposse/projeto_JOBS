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

// Infos usuário

let id_user = localStorage.getItem("ID_user");
let tipo_usuario = localStorage.getItem("Tipo_user");

// Buscando dados salvos no localstorage para buscar as infos da dúvida no BD

const id_duvida = Number(localStorage.getItem("id_duvida"));
let duvida_editor = false;

// Buscando as infos no BD

async function carregarInfosDuvida() {
  // POST
  const response = await fetch(
    "http://localhost:3008/api/carregarInfosDuvida",
    {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ id_duvida }),
    }
  );

  let content = await response.json();
  console.log('ID_USER logado: ', typeof(id_user));
  console.log('ID_USER dúvida: ', typeof(content.data[0].id_user));

  if (content.success) {
    let nome_usuario_jovem = document.getElementById("nome_usuario_jovem");
    let duvida_jovem = document.getElementById("duvida_jovem");

    nome_usuario_jovem.textContent = content.data[0].nome_user;
    duvida_jovem.textContent = content.data[0].duvida;

    if(Number(id_user) === content.data[0].id_user) {
      duvida_editor = true;
      console.log('DUVIDA EDITOR ATIVADO!')
    }
  } else {
    alert("Deu erro!!");
  }
}

carregarInfosDuvida();

// Carregando as respostas

async function carregarRespostas() {
  // POST
  const response = await fetch("http://localhost:3008/api/carregarRespostas", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ id_duvida }),
  });

  let content = await response.json();

  const bloco_respostas = document.querySelector(".bloco_respostas");

  if (content.success) {
    for (let i = 0; i < content.data.length; i++) {
      // Criando os elementos
      const section = document.createElement("section");
      section.className = "respostas";

      const divRespostaUser = document.createElement("div");
      divRespostaUser.className = "bloco_resposta_user";

      const divPerfil = document.createElement("div");
      divPerfil.className = "bloco_resposta_perfil";

      const img = document.createElement("img");
      img.src = "../images/Usuario_nao_logado.png";
      img.alt = "";

      const h2 = document.createElement("h2");
      h2.className = "bloco_resposta_nome_user";
      h2.textContent = "Teste";

      if (content.data[i].id_jovem === null) {
        h2.textContent += " - Usuário Empresa";
      } else if (content.data[i].id_empresa === null) {
        h2.textContent += " - Usuário Jovem";
      }

      const p = document.createElement("p");
      p.textContent = content.data[i].resposta;

      // Estruturando os elementos
      divPerfil.appendChild(img);
      divPerfil.appendChild(h2);

      divRespostaUser.appendChild(divPerfil);
      divRespostaUser.appendChild(p);

      section.appendChild(divRespostaUser);

      // Adicionando a estrutura no body ou em outro elemento do DOM
      bloco_respostas.appendChild(section);
    }
  } else {
    alert("Deu erro!!");
  }
}

carregarRespostas();

// Verificando se foi o usuário que enviou aquela dúvida

const botao_resposta = document.getElementById("criar_resposta");
const deletar_duvida = document.getElementById("deletar_duvida");

setTimeout(() => {
  if (duvida_editor && tipo_usuario !== 'Empresa') {
    botao_resposta.style.display = 'none';
  } else {
    deletar_duvida.style.display = 'none';
  }
}, 25);

// Deletando dúvida (DELETE)

deletar_duvida.onclick = async function () {
  Swal.fire({
    title: "Deseja mesmo deletar sua dúvida?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
    cancelButtonColor: "#d33",
    confirmButtonText: "Deletar",
  }).then(async function (result) {
    if (result.isConfirmed) {
      // Adicionar rota para deletar a dúvida
    }
  });
};
// Respondendo a dúvida

botao_resposta.onclick = async function () {
  Swal.fire({
    title: "Responda a dúvida!!",
    text: "Ajude com seu conhecimento!!",
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
        let resposta = result.value;

        let data = { id_user, id_duvida, resposta, tipo_usuario };

        // POST
        const response = await fetch(
          "http://localhost:3008/api/responderDuvida",
          {
            method: "POST",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data),
          }
        );

        let content = await response.json();
        console.log(content);

        if (content.success) {
          Swal.fire({
            title: "Resposta enviada com sucesso!!",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          Swal.fire({
            title: "Erro ao enviar a resposta!!",
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
};

// Botao para voltar para a página

document.getElementById("botao_voltar").onclick = function () {
  localStorage.removeItem("id_duvida");
  localStorage.removeItem("texto_duvida");
  localStorage.removeItem("user_editor");

  if (tipo_usuario === "Jovem") {
    window.location.href = "../Tela Dicas-Sugestoes/index.html";
  } else if (tipo_usuario === "Empresa") {
    window.location.href = "../Tela Home - Usuario Empresa/index.html";
  } else {
    alert("ERROR!!");
  }
};