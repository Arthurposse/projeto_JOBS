// Buscando infos do usuári
let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Vagas - GET

let vagas_registradas = document.querySelector(".vagas_registradas");

async function getVagas(nome, ordem) {
  const response = await fetch(
    `http://localhost:3008/api/vagas/getVagas?User_name=${nome}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  let content = await response.json();
  console.log(content);

  if (content.sucess) {
    for (let i = 0; i < content.data.length; i++) {
      console.log(ordem)
      if (ordem === content.data[i].faixa_etaria) {
        // Cria o elemento section
        const section = document.createElement("section");
        section.className = "bloco_vaga";

        // Cria o elemento h2
        const h2 = document.createElement("h2");
        h2.textContent = content.data[i].titulo_vaga;
        section.appendChild(h2);

        // Cria o parágrafo para a área da vaga
        const areaVaga = document.createElement("p");
        areaVaga.className = "area_vaga";
        areaVaga.textContent = content.data[i].area;
        section.appendChild(areaVaga);

        // Cria o parágrafo para a faixa etária da vaga
        const faixaEtaria = document.createElement("p");
        faixaEtaria.className = "faixa_etaria_vaga";
        faixaEtaria.textContent = content.data[i].faixa_etaria + " anos";
        section.appendChild(faixaEtaria);

        // Adiciona a section ao corpo do documento ou em um elemento específico
        vagas_registradas.appendChild(section);
      } else {
        // Cria o elemento section
        const section = document.createElement("section");
        section.className = "bloco_vaga";

        // Cria o elemento h2
        const h2 = document.createElement("h2");
        h2.textContent = content.data[i].titulo_vaga;
        section.appendChild(h2);

        // Cria o parágrafo para a área da vaga
        const areaVaga = document.createElement("p");
        areaVaga.className = "area_vaga";
        areaVaga.textContent = content.data[i].area;
        section.appendChild(areaVaga);

        // Cria o parágrafo para a faixa etária da vaga
        const faixaEtaria = document.createElement("p");
        faixaEtaria.className = "faixa_etaria_vaga";
        faixaEtaria.textContent = content.data[i].faixa_etaria + " anos";
        section.appendChild(faixaEtaria);

        // Adiciona a section ao corpo do documento ou em um elemento específico
        vagas_registradas.appendChild(section);
      }
    }
  } else {
    alert("ERROR!!");
    console.error();
  }
}

getVagas(User_name);

// Vagas - POST
const botao_criar_vagas = document.getElementById("criar_vaga");

botao_criar_vagas.onclick = async function () {
  const { value: titulo_vaga } = await Swal.fire({
    title: "Título vaga",
    input: "text",
    inputPlaceholder: "Digite aqui",
  });

  if (titulo_vaga) {
    const { value: area } = await Swal.fire({
      title: "Selecione a área da vaga",
      input: "select",
      inputOptions: {
        Area: {
          "Engenheiro de Software": "Engenheiro de Software",
        },
      },
      inputPlaceholder: "Seleciona o nível",
      showCancelButton: true,
    });

    if (area) {
      const { value: cidade } = await Swal.fire({
        title: "Localidade da vaga",
        input: "text",
        inputPlaceholder: "Digite aqui",
      });

      if (cidade) {
        const { value: faixaEtaria } = await Swal.fire({
          title: "Selecione a faixa etária da vaga",
          input: "select",
          inputOptions: {
            "Faixa Etária": {
              "16-18": "16 a 18 anos",
              "19-21": "19 a 21 anos",
              "22-24": "22 a 24 anos",
              "25-27": "25 a 27 anos",
              "28-30": "28 a 30 anos",
            },
          },
          inputPlaceholder: "Seleciona a faixa etária",
          showCancelButton: true,
        });

        if (faixaEtaria) {
          const { value: descricao } = await Swal.fire({
            title: "Descrição da vaga",
            input: "text",
            inputPlaceholder: "Digite aqui",
          });

          if (descricao) {
            let data = {
              User_name,
              titulo_vaga,
              area,
              cidade,
              faixaEtaria,
              descricao,
            };

            // POST
            const response = await fetch(
              "http://localhost:3008/api/vagas/criandoVaga",
              {
                method: "POST",
                headers: { "Content-type": "application/json;charset=UTF-8" },
                body: JSON.stringify(data),
              }
            );

            let content = await response.json();
            console.log(content);

            if (content.sucess) {
              alert("Deu bom o POST!!");

              window.location.reload();
              //recarrega a página
            } else {
              alert("Deu ruim o POST!!");
              console.error();
            }
          }
        }
      }
    }
  }
};

// Vagas - Filtro

const botao_filtrar_vagas = document.getElementById("filtrar_vaga");

botao_filtrar_vagas.onclick = async function () {
  const { value: result } = await Swal.fire({
    title: "Escolha um filtro de seu desejo",
    input: "select",
    inputOptions: {
      Opções: {
        faixa_etaria: "Faixa Etária",
        // area_vaga: "Área da vaga",
      },
    },
    inputPlaceholder: "Selecione o filtro",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
  });

  if (result === "faixa_etaria") {
    const { value: faixaEtaria } = await Swal.fire({
      title: "Selecione a faixa etária da vaga",
      input: "select",
      inputOptions: {
        "Faixa Etária": {
          "16-18": "16 a 18 anos",
          "19-21": "19 a 21 anos",
          "22-24": "22 a 24 anos",
          "25-27": "25 a 27 anos",
          "28-30": "28 a 30 anos",
        },
      },
      inputPlaceholder: "Seleciona a faixa etária",
      showCancelButton: true,
    });

    if (faixaEtaria) {
      vagas_registradas.innerHTML = "";
      getVagas(User_name, faixaEtaria);
    }
  } else if (result === "area_vaga") {
    // Aparecer um alert em que, a partir de uma analise de todas as vagas que o usuário tiver no BD, seja listado as áreas para que o usuário consiga filtrar.
    alert("Filtrando por área!");
  }
};

// Coletando dados perfil (GET)

let nome = document.getElementById("nome_user");
let email = document.getElementById("email_user");
let telefone = document.getElementById("telefone_user");
let cidade = document.getElementById("cidade_user");

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
  let ft_user;
  let nome_user = nome.textContent;
  let email_user = email.textContent;
  let telefone_user = telefone.textContent;
  let cidade_user = cidade.textContent;

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
      });
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          Swal.fire({
            title: "Your uploaded picture",
            imageUrl: e.target.result,
            imageAlt: "The uploaded picture",
          });
        };
        ft_user = reader.readAsDataURL(file);
        console.log(file);
      }
    };

    lapis_nome.onclick = async function () {
      const { value: name } = await Swal.fire({
        title: "Altere seu nome",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
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
      });
      if (city) {
        cidade.textContent = city;
        cidade_user = cidade.textContent;
      }
    };

    localStorage.setItem("User_name_antigo", nome.textContent);

    editando = false;
  } else {
    // Acrescentar alteração do nome registrado em cada vaga dentro do BD (putVagas) e buscar vagas novamente para serem impressas (getVagas)

    localStorage.setItem("User_name", nome_user);

    botao_editar.textContent = "Editar";

    iconesLapis.forEach((iconeLapis) => {
      iconeLapis.style.display = "none";
    });

    let data = { nome_user, email_user, telefone_user, cidade_user };

    // PUT

    const response = await fetch(
      `http://localhost:3008/api/uptade/userEmpresa/${id_user}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data),
      }
    );

    let content = await response.json();
    console.log(content);

    if (content.sucess) {
      Swal.fire({
        title: "Seus dados foram atualizados com sucesso!!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      Swal.fire({
        title: "Não foi possível alterar seus dados!!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    }
    editando = true;
  }
};
