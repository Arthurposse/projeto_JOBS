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
  const fundoEscuro = document.querySelector('.fundo_escuro');
  const footer = document.querySelector('footer');

  if (!localStorage.getItem("ID_user")) {
    // Adiciona a classe 'active' para exibir o fundo
    fundoEscuro.classList.add('active');
    footer.style.display = 'none';

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
          fundoEscuro.classList.remove('active');
          window.location.href = '../Tela Home - Sem Usuario Logado/index.html';
        }
      });
    });
  }
});

// Buscando infos do usuário
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Buscando currículos dos jovens

async function buscandoCurriculos(area) {
  const response = await fetch(
    `https://projetojobs.up.railway.app/api/curriculo/buscando`,
    {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify({ area }),
    }
  );

  const content = await response.json();

  if (content.success) {
    const container = document.getElementById("curriculos-container");

    container.innerHTML = "";

    if (content.data.length !== 0 || area === "Todas") {
      // Iterar pelos currículos e criar links de download
      for (let i = 0; i < content.data.length; i++) {
        let div = document.createElement("div");
        div.className = "bloco_user_jovem";

        let img = document.createElement("img");
        let h2 = document.createElement("h2");
        let h4 = document.createElement("h4");
        let a = document.createElement("a");

        let fileName = content.data[i].curriculo;

        // Realizar fetch do arquivo
        const response = await fetch(
          `https://projetojobs.up.railway.app/uploads/curriculos/${fileName}`
        );
        const fileBlob = await response.blob(); // Transformar o arquivo em um Blob

        // Criar um URL temporário para download
        const fileUrl = window.URL.createObjectURL(fileBlob);

        a.href = fileUrl;
        a.innerText = "Baixar currículo";
        a.download = `Currículo de ${content.data[i].name}.pdf`; // Forçar download com o nome correto do arquivo
        a.style.display = "block"; // Para cada link ser uma nova linha

        // Adiciona o evento de clique para a tag A de donwload do currículo
        a.addEventListener("click", async function () {
          // Quantidade de downloads currículo jovem
          const downloadResponse  = await fetch(
            `https://projetojobs.up.railway.app/api/curriculo/quant_downloads/${content.data[i].curriculo.split("_")[0]}`,
            {
              method: "PUT",
              headers: { "Content-type": "application/json;charset=UTF-8" }
            }
          );

          const downloadContent  = await downloadResponse.json();
        });

        if (content.data[i].ft_perfil !== null) {
          img.src = `https://projetojobs.up.railway.app/uploads/img_perfil/${content.data[i].ft_perfil}`;
        } else {
          img.src = "../images/Usuario_nao_logado.png";
        }

        h2.textContent = content.data[i].name;
        h4.textContent = content.data[i].area_curriculo;

        div.appendChild(img); // Adicionando a ft de perfil do usuário jovem
        div.appendChild(h2);
        div.appendChild(h4);
        div.appendChild(a);
        container.appendChild(div); // Adicionar o link ao container
      }
    } else {
      if(content.data.length === 0) {
        container.innerHTML = `<p> Não há currículos para visualizar ainda!! </p>`;        
      }
      else {
        container.innerHTML = `<p> Não foi possível encontrar nenhuma vaga com esta área </p>`;
      }
    }
  } else {
    Swal.fire({
      title: "ERROR!!",
      text: "Tente novamente!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2300,
    });
  }
}

buscandoCurriculos();

// Filtro

const botao_filtro = document.getElementById("botao_filtro");

botao_filtro.onclick = async function () {
  const { value: areaFiltro } = await Swal.fire({
    title: "Selecione a área!!",
    input: "select",
    inputOptions: {
      Áreas: {
        "Todas": "Todas",
        "Tecnologia": "Tecnologia",
        "Saúde": "Saúde",
        "Ciências Humanas": "Ciências Humanas",
        "Ciências Exatas": "Ciências Exatas",
        "Ciências Biológicas": "Ciências Biológicas",
        "Direito e Ciências Jurídicas": "Direito e Ciências Jurídicas",
        "Engenharia e Indústria": "Engenharia e Indústria",
        "Artes e Design": "Artes e Design",
        "Comunicação e Marketing": "Comunicação e Marketing",
        "Gestão e Negócios": "Gestão e Negócios",
      },
    },
    inputPlaceholder: "Escolha a que mais se encaixe com seu perfil!!",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
  });

  if (areaFiltro) {
    buscandoCurriculos(areaFiltro);
  }
};