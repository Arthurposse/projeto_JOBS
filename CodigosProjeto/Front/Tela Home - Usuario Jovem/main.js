// Planejamento de carreira - Planos a seguir (Gerar plano)

const botao_gb = document.getElementById("botao_gb");
const botao_download = document.getElementById("botao_download_plano");
const img_logo = document.querySelector(".img_logo_plano");

botao_gb.onclick = async function () {
  const loader = document.querySelector(".loader");

  loader.style.display = "block";

  const planos_sugerido = document.querySelector(".plano_sugerido");
  const area_usuario = document.getElementById("area_usuario").value;

  const response = await fetch(`http://localhost:3008/api/apiGB`, {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify({ area_usuario }),
  });

  planos_sugerido.innerHTML = "";
  const plano = await response.text();
  planos_sugerido.innerHTML += plano;

  loader.style.display = "none";
  botao_download.style.opacity = "1";
};

// Planejamento de carreira - Planos a seguir (Download do plano)

// Função principal para gerar o PDF

async function downloadPDF() {
  const { jsPDF } = window.jspdf;

  // Seleciona o elemento que deseja capturar
  const element = document.querySelector(".plano_sugerido");

  // Define a quantidade de padding
  const padding = 80; // Espaçamento em pixels

  // Usa html2canvas para capturar a imagem do elemento com uma escala maior para melhorar a qualidade
  const canvas = await html2canvas(element, {
    scale: 3, // Aumenta a escala para aumentar a qualidade da imagem
    useCORS: true, // Se estiver usando imagens de outros domínios, pode precisar disso
    backgroundColor: "#9DD4D1", // Define a cor de fundo do canvas
  });

  // Converte o canvas para uma imagem em base64
  const imgData = canvas.toDataURL("image/png");

  // Calcula a largura e altura da imagem para o PDF
  const imgWidth = canvas.width / 3;
  const imgHeight = canvas.height / 3;

  // Define o tamanho do PDF com base na imagem e no padding
  const pdfWidth = imgWidth + padding * 1.8;
  const pdfHeight = imgHeight + padding * 2;

  // Calcula a posição para centralizar a imagem no PDF com padding
  const xOffset = padding;
  const yOffset = padding;

  // Cria um novo documento PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [pdfWidth, pdfHeight],
    precision: 16, // Aumenta a precisão do PDF
  });

  // Define a cor de fundo do PDF
  pdf.setFillColor("#9DD4D1"); // Cor de fundo
  pdf.rect(0, 0, pdfWidth, pdfHeight, "F"); // Desenha um retângulo preenchido

  // Adiciona a imagem capturada ao PDF com padding, centralizando-a
  pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

  // Salva o PDF
  pdf.save(`Plano ${area_usuario.value}.pdf`);
}

botao_download.addEventListener("click", downloadPDF);

// Planejamento de carreira - Metas usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Metas - GET

let section_pc_metas = document.querySelector(".pc_metas");
let titulos_metas = [];

async function getMetas(nome, ordem) {
  const response = await fetch(
    `http://localhost:3008/api/metas/getMetas?User_name=${nome}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  let content = await response.json();

  if (ordem === "date") {
    for (let i = 0; i < content.data.length; i++) {
      const data = content.data;

      const eventosOrdenados = [];

      data.forEach((e) => {
        if (e.data_conclusao) {
          const currentDate = new Date(e.data_conclusao);

          // Adiciona o evento ao array de eventos ordenados
          eventosOrdenados.push({
            data: currentDate,
            evento: e,
          });
        }
      });

      eventosOrdenados.sort((a, b) => a.data - b.data);

      section_pc_metas.innerHTML = "";

      // Adicionando os cards ordenados ao contêiner de acordo com a data
      eventosOrdenados.forEach((evento) => {
        const currentDate = evento.data;
        const eventoData = evento.evento;

        // Criando elementos do card
        const bloco_meta = document.createElement("section");
        bloco_meta.classList.add("bloco_meta");

        const h2 = document.createElement("h2");
        h2.textContent = eventoData.titulo; // Título do Evento

        const p_infos_meta = document.createElement("p");
        p_infos_meta.classList.add("infos_meta");
        p_infos_meta.textContent = eventoData.infos; // Informações do Evento

        const bloco_meta_rodape = document.createElement("section");
        bloco_meta_rodape.classList.add("bloco_meta_rodape");

        function adicionarZero(numero) {
          return numero < 10 ? "0" + numero : numero;
        }

        const diaFormatado = adicionarZero(currentDate.getDate());
        const mesFormatado = adicionarZero(currentDate.getMonth() + 1);

        const p_data_meta = document.createElement("p");
        p_data_meta.classList.add("data_meta");
        p_data_meta.textContent = `${diaFormatado}/${mesFormatado}`;

        const icon = document.createElement("i");
        icon.classList.add("bi-exclamation-triangle");
        icon.style.color = eventoData.prioridade; // Cor baseada na prioridade do evento
        icon.style.fontSize = "1.5rem";

        // Adicionando elementos do card ao bloco_meta_rodape
        bloco_meta_rodape.appendChild(p_data_meta);
        bloco_meta_rodape.appendChild(icon);

        // Adicionando elementos ao bloco_meta
        bloco_meta.appendChild(h2);
        bloco_meta.appendChild(p_infos_meta);
        bloco_meta.appendChild(bloco_meta_rodape);

        // Adicionando o bloco_meta ao contêiner de cards
        section_pc_metas.appendChild(bloco_meta);
      });
    }

    // Adicionando os cards ordenados ao contêiner de acordo com a prioridade
  } else if (ordem === "red" || ordem === "yellow" || ordem === "green") {
    section_pc_metas.innerHTML = "";

    if (content.data.length > 0) {
      for (let i = 0; i < content.data.length; i++) {
        if (content.data[i].prioridade === ordem) {
          const titulo = content.data[i].titulo;

          titulos_metas.push(titulo);

          const infos = content.data[i].infos;
          const data = content.data[i].data_conclusao;
          const prioridade = content.data[i].prioridade;

          const pc_metas = document.querySelector(".pc_metas");

          const bloco_meta = document.createElement("section");
          bloco_meta.classList.add("bloco_meta");

          const h2 = document.createElement("h2");
          h2.textContent = titulo;

          const p_infos_meta = document.createElement("p");
          p_infos_meta.classList.add("infos_meta");
          p_infos_meta.textContent = infos;

          const bloco_meta_rodape = document.createElement("section");
          bloco_meta_rodape.classList.add("bloco_meta_rodape");

          // let ano_user = data.slice(0, 4);

          let mes_user = data.slice(5, 7);

          let dia_user = data.slice(8, 10);

          const p_data_meta = document.createElement("p");
          p_data_meta.classList.add("data_meta");
          p_data_meta.textContent = `${dia_user}/${mes_user}`;

          const icon = document.createElement("i");
          icon.classList.add("bi-exclamation-triangle");
          icon.style.color = prioridade;
          icon.style.fontSize = "1.5rem";

          bloco_meta.appendChild(h2);
          bloco_meta.appendChild(p_infos_meta);
          bloco_meta_rodape.appendChild(p_data_meta);
          bloco_meta_rodape.appendChild(icon);
          bloco_meta.appendChild(bloco_meta_rodape);

          pc_metas.appendChild(bloco_meta);
        }
      }
    } else {
      section_pc_metas.innerHTML = "<h2> Nenhum foi encontrado!! </h2>";
    }

    // Adicionando os cards ao carregar a página (não seguindo nenhuma ordem definida)
  } else {
    for (let i = 0; i < content.data.length; i++) {
      const titulo = content.data[i].titulo;

      titulos_metas.push(titulo);

      const infos = content.data[i].infos;
      const data = content.data[i].data_conclusao;
      const prioridade = content.data[i].prioridade;

      const pc_metas = document.querySelector(".pc_metas");

      const bloco_meta = document.createElement("section");
      bloco_meta.classList.add("bloco_meta");

      const h2 = document.createElement("h2");
      h2.textContent = titulo;

      const p_infos_meta = document.createElement("p");
      p_infos_meta.classList.add("infos_meta");
      p_infos_meta.textContent = infos;

      const bloco_meta_rodape = document.createElement("section");
      bloco_meta_rodape.classList.add("bloco_meta_rodape");

      // let ano_user = data.slice(0, 4);

      let mes_user = data.slice(5, 7);

      let dia_user = data.slice(8, 10);

      const p_data_meta = document.createElement("p");
      p_data_meta.classList.add("data_meta");
      p_data_meta.textContent = `${dia_user}/${mes_user}`;

      const icon = document.createElement("i");
      icon.classList.add("bi-exclamation-triangle");
      icon.style.color = prioridade;
      icon.style.fontSize = "1.5rem";

      bloco_meta.appendChild(h2);
      bloco_meta.appendChild(p_infos_meta);
      bloco_meta_rodape.appendChild(p_data_meta);
      bloco_meta_rodape.appendChild(icon);
      bloco_meta.appendChild(bloco_meta_rodape);

      pc_metas.appendChild(bloco_meta);
    }
  }
}

getMetas(User_name);

// Metas - POST

const botao_criar_metas = document.getElementById("criar_meta");

let titulo = "";
let infos = "";
let data_alterar = "";
let prioridade = "";

botao_criar_metas.onclick = async function () {
  const { value: titulo_criar } = await Swal.fire({
    title: "Título meta",
    input: "text",
    inputPlaceholder: "Digite aqui",
    confirmButtonColor: "#0e566a",
  });

  if (titulo_criar) {
    const { value: infos_criar } = await Swal.fire({
      title: "Detalhes meta",
      input: "text",
      inputPlaceholder: "Digite aqui",
      confirmButtonColor: "#0e566a",
    });

    if (infos_criar) {
      const { value: data_criar } = await Swal.fire({
        title: "Data de conclusão da meta",
        input: "date",
        confirmButtonColor: "#0e566a",
      });

      if (data_criar) {
        const { value: prioridade_criar } = await Swal.fire({
          title: "Selecione a prioridade da meta",
          input: "select",
          inputOptions: {
            Prioridades: {
              red: "Alta",
              yellow: "Media",
              green: "Baixa",
            },
          },
          inputPlaceholder: "Seleciona o nível",
          showCancelButton: true,
          confirmButtonColor: "#0e566a",
        });
        if (prioridade_criar) {
          titulo = titulo_criar;
          infos = infos_criar;
          data_alterar = data_criar;
          prioridade = prioridade_criar;
        }
      }
    }
  }

  let data = { User_name, titulo, infos, data_alterar, prioridade };

  // POST
  const response = await fetch("http://localhost:3008/api/metas/criando", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.success) {
    Swal.fire({
      title: "Meta criada com sucesso!!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    Swal.fire({
      title: "Erro ao criar a meta!!",
      text: "Tente novamente!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    console.error();
  }
};

// Metas - PUT

async function putMetas(nome, nome_antigo) {
  let data = { nome, nome_antigo };

  const response = await fetch(`http://localhost:3008/api/metas/atualizando`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.success) {
    // alert("Deu bom o PUT METAS!!");
  } else {
    // alert("Deu ruim o PUT METAS!!");
    console.error();
  }
}

// Metas - DELETE

const botao_deletar_metas = document.getElementById("deletar_meta");

botao_deletar_metas.onclick = async function () {
  const opcoes = {};

  for (let i = 0; i < titulos_metas.length; i++) {
    opcoes[`${titulos_metas[i]}`] = titulos_metas[i];
  }

  const { value: metas_deletar } = await Swal.fire({
    title: "Deletar meta",
    input: "select",
    inputOptions: opcoes,
    inputPlaceholder: "Selecionar aquele que deseja deletar",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
  });
  if (metas_deletar) {
    data = { metas_deletar };
  }

  const response = await fetch("http://localhost:3008/api/metas/deletando", {
    method: "DELETE",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.success) {
    Swal.fire({
      title: "Meta excluída com sucesso!!",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  } else {
    Swal.fire({
      title: "Erro ao tentar excluir a meta!!",
      text: "Tente novamente!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2000,
    });
    console.error();
  }
};

// Metas - Filtro

const botao_filtrar_metas = document.getElementById("filtrar_meta");

botao_filtrar_metas.onclick = async function () {
  const { value: result } = await Swal.fire({
    title: "Escolha um filtro de seu desejo",
    input: "select",
    inputOptions: {
      Infos: {
        date: "Data",
      },
      Prioridades: {
        red: "Alta",
        yellow: "Media",
        green: "Baixa",
      },
    },
    inputPlaceholder: "Seleciona o filtro",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
  });
  if (result) {
    getMetas(User_name, result);
  }
};

// Módulos

const cards = document.querySelectorAll(".modulo_card");

cards.forEach((card) => {
  card.addEventListener("click", function () {
    const texto_card = this.querySelector("h3").textContent;
    localStorage.setItem("Modulo", texto_card);
    window.location.href = "../Tela Modulos - Usuario Jovem/index.html";
  });
});

// Envio de currículo

const botao_envio_curriculo = document.getElementById("enviar_curriculo");
const curriculo_jovem = document.getElementById('curriculo_jovem');
const input_area_jovem = document.getElementById("area_jovem").value;

botao_envio_curriculo.onclick = async function () {

  // if (input_area_jovem === "" && !curriculo_jovem) {
  //   alert("Insira o que é solicitado!!");

  // } else if (input_area_jovem === "") {
  //   alert("É necessário inserir a área!!");
    
  // } else if (!curriculo_jovem) {
  //   alert("É necessário anexar o arquivo do seu currículo!!");
  // }

  console.log("Arquivo de imagem selecionado:", curriculo_jovem.files[0]);
  
  let formDataCurriculo = new FormData();
  formDataCurriculo.append("curriculo_jovem", curriculo_jovem.files[0]);

  const response = await fetch(
    `http://localhost:3008/api/enviandoCurriculo/${id_user}`,
    {
      method: "PUT",
      body: formDataCurriculo
    }
  );

  content = await response.json();
  console.log(content);

  if(content.success) {
    alert('DEU BOM CURRICULO')
  } 
  else {
    alert('VISH, DEU BOLETE')
  }
};

// Coletando dados perfil (GET)

let ft_user = null;

let ft_perfil_user = document.getElementById("ft_perfil_user");
let ft_perfil_user_2 = document.getElementById("ft_perfil_user_2");
let nome = document.getElementById("nome_user");
let email = document.getElementById("email_user");
let telefone = document.getElementById("telefone_user");
let cidade = document.getElementById("cidade_user");
let idade = document.getElementById("idade_user");

let guardar_idade_user = "";

async function getUserJovem(id_user) {
  const response = await fetch(
    `http://localhost:3008/api/get/userJovem/${id_user}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" }
    }
  );

  content = await response.json();

  if (ft_user === undefined || content.data[0].ft_perfil === null) {
    ft_perfil_user.src = "../images/Usuario_nao_logado.png";
    ft_perfil_user_2.src = "../images/Usuario_nao_logado.png";
  } else {
    ft_perfil_user.src = `http:localhost:3008/uploads/img_perfil/${content.data[0].ft_perfil}`;
    ft_perfil_user_2.src = `http:localhost:3008/uploads/img_perfil/${content.data[0].ft_perfil}`;
  }

  nome.textContent = content.data[0].name;
  email.textContent = content.data[0].email;
  telefone.textContent = content.data[0].telefone;
  cidade.textContent = content.data[0].cidade;

  let ano_user = content.data[0].data_nascimento.slice(0, 4);

  let mes_user = content.data[0].data_nascimento.slice(5, 7);

  let dia_user = content.data[0].data_nascimento.slice(8, 10);

  guardar_idade_user = `${ano_user}-${mes_user}-${dia_user}`;

  const data = new Date();
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;
  const dia = data.getDate();

  let userAge = ano - ano_user;

  if (mes < mes_user || (mes === mes_user && dia < dia_user)) {
    userAge--;
  }

  idade.textContent = `${userAge} anos`;
}

getUserJovem(id_user);

// Editando dados perfil (PUT)

const botao_editar = document.getElementById("editar_perfil");
const iconesLapis = document.querySelectorAll(".bi-pencil-square");

const lapis_ft_perfil = document.getElementById("lapis_ft_perfil");
const lapis_nome = document.getElementById("lapis_nome");
const lapis_email = document.getElementById("lapis_email");
const lapis_telefone = document.getElementById("lapis_telefone");
const lapis_cidade = document.getElementById("lapis_cidade");
const lapis_idade = document.getElementById("lapis_idade");

let editando = true;
botao_editar.onclick = async function () {
  let nome_user = nome.textContent;
  let email_user = email.textContent;
  let telefone_user = telefone.textContent;
  let cidade_user = cidade.textContent;
  let idade_user = guardar_idade_user;

  if (editando) {
    botao_editar.textContent = "Salvar";

    iconesLapis.forEach((iconeLapis) => {
      iconeLapis.style.display = "flex";
      iconeLapis.style.animation = "all 1s ease";
    });

    lapis_ft_perfil.onclick = async function () {
      const { value: file } = await Swal.fire({
        title: "Select image",
        input: "file",
        inputAttributes: {
          accept: "image/*",
          "aria-label": "Upload your profile picture",
        },
        confirmButtonColor: "#0e566a",
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
            confirmButtonColor: "#0e566a",
          });
        };
        ft_user = file;
      }
    };

    lapis_nome.onclick = async function () {
      const { value: name } = await Swal.fire({
        title: "Altere seu nome",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
        confirmButtonColor: "#0e566a",
      });
      if (name) {
        nome.textContent = name;
        nome_user = nome.textContent;
      }
    };

    lapis_email.onclick = async function () {
      const { value: emailValor } = await Swal.fire({
        title: "Altere seu email",
        input: "email",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
        confirmButtonColor: "#0e566a",
      });
      if (emailValor) {
        email.textContent = emailValor;
        email_user = email.textContent;
      }
    };

    lapis_telefone.onclick = async function () {
      const { value: tel } = await Swal.fire({
        title: "Altere seu número",
        input: "tel",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
        confirmButtonColor: "#0e566a",
      });
      if (tel) {
        telefone.textContent = tel;
        telefone_user = telefone.textContent;
      }
    };

    lapis_cidade.onclick = async function () {
      const { value: city } = await Swal.fire({
        title: "Altere sua cidade",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
        confirmButtonColor: "#0e566a",
      });
      if (city) {
        cidade.textContent = city;
        cidade_user = cidade.textContent;
      }
    };

    lapis_idade.onclick = async function () {
      const { value: date } = await Swal.fire({
        title: "Selecione a sua data de nascimento",
        input: "date",
        confirmButtonColor: "#0e566a",
      });
      if (date) {
        let ano_user_alert = date.slice(0, 4);

        let mes_user_alert = date.slice(5, 7);

        let dia_user_alert = date.slice(8, 10);

        const data = new Date();
        const ano = data.getFullYear();
        const mes = data.getMonth() + 1;
        const dia = data.getDate();

        let userAge = ano - ano_user_alert;

        if (
          mes < mes_user_alert ||
          (mes === mes_user_alert && dia < dia_user_alert)
        ) {
          userAge--;
        }

        idade.textContent = `${userAge} anos`;
        guardar_idade_user = `${ano_user_alert}-${mes_user_alert}-${dia_user_alert}`;
        idade_user = guardar_idade_user;
      }
    };

    localStorage.setItem("User_name_antigo", nome.textContent);

    editando = false;
  } else {
    putMetas(nome_user, localStorage.getItem("User_name_antigo"));
    getMetas(nome_user);

    localStorage.setItem("User_name", nome_user);

    botao_editar.textContent = "Editar";

    iconesLapis.forEach((iconeLapis) => {
      iconeLapis.style.display = "none";
    });

    let formData = new FormData();
    formData.append("nome_user", nome_user);
    formData.append("email_user", email_user);
    formData.append("telefone_user", telefone_user);
    formData.append("cidade_user", cidade_user);
    formData.append("idade_user", idade_user);

    if (ft_user) {
      console.log("Arquivo de imagem selecionado:", ft_user);
      formData.append("ft_user", ft_user);
    }

    // PUT
    const response = await fetch(
      `http://localhost:3008/api/uptade/userJovem/${id_user}`,
      {
        method: "PUT",
        body: formData // Enviando todos os dados e a imagem juntos
      }
    );

    let content = await response.json();
    console.log(content);

    if (content.success) {
      Swal.fire({
        title: "Seus dados foram atualizados com sucesso!!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      Swal.fire({
        title: "Não foi possível alterar seus dados!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    editando = true;
  }
};