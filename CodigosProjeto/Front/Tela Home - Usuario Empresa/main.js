// Buscando infos do usuári
let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Vagas - GET

let titulos_vagas = [];

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

  if (content.sucess) {
    vagas_registradas.innerHTML = "";

    if (ordem !== undefined) {
      for (let i = 0; i < content.data.length; i++) {
        if (content.data[i].faixa_etaria === ordem) {
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
      for (let i = 0; i < content.data.length; i++) {
        titulos_vagas.push(content.data[i].titulo_vaga);

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
    confirmButtonColor: "#0e566a"
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
      confirmButtonColor: "#0e566a"
    });

    if (area) {
      const { value: cidade } = await Swal.fire({
        title: "Localidade da vaga",
        input: "text",
        inputPlaceholder: "Digite aqui",
        confirmButtonColor: "#0e566a"
      });

      if (cidade) {
        const { value: faixaEtaria } = await Swal.fire({
          title: "Selecione a faixa etária da vaga",
          input: "select",
          inputOptions: {
            "Faixa Etaria": {
              "16-18": "16 a 18 anos",
              "19-21": "19 a 21 anos",
              "22-24": "22 a 24 anos",
              "25-27": "25 a 27 anos",
              "28-30": "28 a 30 anos",
            },
          },
          inputPlaceholder: "Seleciona a faixa etária",
          showCancelButton: true,
          confirmButtonColor: "#0e566a"
        });

        if (faixaEtaria) {
          const { value: descricao } = await Swal.fire({
            title: "Descrição da vaga",
            input: "text",
            inputPlaceholder: "Digite aqui",
            confirmButtonColor: "#0e566a"
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

              // Recarrega a página
              window.location.reload();
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

// Vagas - Deletar

const botao_deletar_vaga = document.getElementById('deletar_vaga');

botao_deletar_vaga.onclick = async function () {
  const opcoes = {};

  for (let i = 0; i < titulos_vagas.length; i++) {
    opcoes[`${titulos_vagas[i]}`] = titulos_vagas[i];
  };

  const { value: vagas_deletar } = await Swal.fire({
    title: "Deletar meta",
    input: "select",
    inputOptions: opcoes,
    inputPlaceholder: "Selecionar aquele que deseja deletar",
    showCancelButton: true
  });
  if (vagas_deletar) {
    data = { vagas_deletar };
  }

  const response = await fetch("http://localhost:3008/api//vagas/deletandoVaga", {
    method: "DELETE",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data)
  });

  let content = await response.json();
  console.log(content);

  if (content.sucess) {
    alert("Deu bom o DELETE!!");

    window.location.reload();
    //recarrega a página
  } else {
    alert("Deu ruim o DELETE!!");
    console.error();
  }
}

// Vagas - PUT
async function putVagas(nome, nome_antigo) {
  let data = { nome, nome_antigo };

  const response = await fetch(`http://localhost:3008/api/vagas/putVagas`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.sucess) {
    alert("Deu bom o PUT VAGAS!!");
  } else {
    alert("Deu ruim o PUT VAGAS!!");
    console.error();
  }
}

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
    confirmButtonColor: "#0e566a"
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
      confirmButtonColor: "#0e566a"
    });

    if (faixaEtaria) {
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
let empresa = document.getElementById("empresa_user");
let setor_atividade = document.getElementById("setor_atividade_user");

async function getUserJovem(id_user) {
  const response = await fetch(
    `http://localhost:3008/api/buscandoDados/${id_user}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  content = await response.json();

  if(content.sucess) {
    nome.textContent = content.data[0].name;
    email.textContent = content.data[0].email;
    telefone.textContent = content.data[0].telefone;
    empresa.textContent = content.data[0].nome_empresa;
    setor_atividade.textContent = content.data[0].setor_atividade;
  }
  else {
    alert('deu ruim');
  }
}

getUserJovem(id_user);

// Editando dados perfil (PUT)

const botao_editar = document.getElementById("editar_perfil");
const iconesLapis = document.querySelectorAll(".bi-pencil-square");

const lapis_ft_perfil = document.getElementById("lapis_ft_perfil");
const lapis_nome = document.getElementById("lapis_nome");
const lapis_email = document.getElementById("lapis_email");
const lapis_telefone = document.getElementById("lapis_telefone");
const lapis_empresa = document.getElementById("lapis_empresa");
const lapis_setor_atividade = document.getElementById("lapis_setor_atividade");

let editando = true;
let nome_user_anterior, email_user_anterior, telefone_user_anterior, empresa_user_anterior, setor_atividade_user_anterior;

botao_editar.onclick = async function () {
  let nome_user = nome.textContent;
  let email_user = email.textContent;
  let telefone_user = telefone.textContent;
  let empresa_user = empresa.textContent;
  let setor_atividade_user = setor_atividade.textContent;

  if (editando) {
    // Armazena os valores antigos
    nome_user_anterior = nome_user;
    email_user_anterior = email_user;
    telefone_user_anterior = telefone_user;
    empresa_user_anterior = empresa_user;
    setor_atividade_user_anterior = setor_atividade_user;

    botao_editar.textContent = "Salvar";

    iconesLapis.forEach((iconeLapis) => {
      iconeLapis.style.display = "flex";
      iconeLapis.style.animation = "all 1s ease";
    });

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

    lapis_empresa.onclick = async function () {
      const { value: empresa_ } = await Swal.fire({
        title: "Altere o nome de sua empresa",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
      });
      if (empresa_) {
        empresa.textContent = empresa_;
        empresa_user = empresa.textContent;
      }
    };

    lapis_setor_atividade.onclick = async function () {
      const { value: setor_atividade_ } = await Swal.fire({
        title: "Altere seu setor",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
      });
      if (setor_atividade_) {
        setor_atividade.textContent = setor_atividade_;
        setor_atividade_user = setor_atividade.textContent;
      }
    };

    editando = false;
  } else {
    botao_editar.textContent = "Editar";

    iconesLapis.forEach((iconeLapis) => {
      iconeLapis.style.display = "none";
    });

    nome_user = nome_user || nome_user_anterior;
    email_user = email_user || email_user_anterior;
    telefone_user = telefone_user || telefone_user_anterior;
    empresa_user = empresa_user || empresa_user_anterior;
    setor_atividade_user = setor_atividade_user || setor_atividade_user_anterior;

    let data = { nome_user, email_user, telefone_user, empresa_user, setor_atividade_user };

    console.log(data);

    // PUT
    const response = await fetch(
      `http://localhost:3008/api/uptade/userEmpresa/${id_user}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
      }
    );

    let content = await response.json();
    console.log(content);

    if (content.success) {
      putVagas(nome_user, nome_user_anterior);
      Swal.fire({
        title: "Seus dados foram atualizados com sucesso!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      Swal.fire({
        title: "Não foi possível alterar seus dados!",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    }

    editando = true;
  }
};
