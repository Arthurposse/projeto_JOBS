// Buscando infos do usuário
let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Dúvidas dos jovens - GET

const container_duvidas = document.querySelector(".container_duvidas");
const buscar_duvidas = document.getElementById("buscar_duvidas");

async function sorteandoDuvidas() {
  const response = await fetch("http://localhost:3008/api/duvidasSorteadas", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  let content = await response.json();

  if (content.success) {
    if (content.data.length > 0) {
      for (let i = 0; i < content.data.length; i++) {
        let bloco_duvida = document.createElement("div");
        bloco_duvida.className = "bloco_duvida";

        let h2 = document.createElement("h2");
        h2.textContent = content.data[i].nome_user;

        let p = document.createElement("p");
        p.textContent = content.data[i].duvida;

        bloco_duvida.appendChild(h2);
        bloco_duvida.appendChild(p);

        container_duvidas.appendChild(bloco_duvida);

        bloco_duvida.addEventListener("click", () => {
          localStorage.setItem("tipo_usuario", "Empresa");
          localStorage.setItem("id_duvida", content.data[i].id_duvida);
          localStorage.setItem("texto_duvida", content.data[i].duvida);
          window.location.href = "../Tela Visualizando Duvida/index.html";
        });
      }
    } else {
      container_duvidas.innerHTML = `<h3 style="color: #0e566a;"> Nenhum dúvida encontrada!! </h3>`;
      buscar_duvidas.style.visibility = "hidden";
    }
  }
}

sorteandoDuvidas();

buscar_duvidas.onclick = function () {
  container_duvidas.innerHTML = "";

  sorteandoDuvidas();
};

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

  if (content.success) {
    vagas_registradas.innerHTML = "";

    if (content.data.length > 0) {
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

            // Adicionando o evento de clique ao card da vaga
            section.addEventListener("click", () => {
              alert(content.data[i].id);
            });
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

          // Adicionando o evento de clique ao card da vaga
          section.addEventListener("click", async function () {
            const vagaSelecionada = content.data[i];

            const { value: vagas_infos } = await Swal.fire({
              title: "Informações da Vaga",
              html: `
                <div style="display: flex; flex-direction: column; gap: 2vh;">
                  <input type="text" id="titulo_vaga" class="inputs_alert_vaga" placeholder="Nome" value="${vagaSelecionada.titulo_vaga}">
                  <input type="text" id="area_vaga" class="inputs_alert_vaga" placeholder="Área" value="${vagaSelecionada.area}">
                  <input type="text" id="faixa_etaria_vaga" class="inputs_alert_vaga" placeholder="Faixa Etária" value="${vagaSelecionada.faixa_etaria}">
                  <input type="text" id="cidade_vaga" class="inputs_alert_vaga" placeholder="Cidade" value="${vagaSelecionada.cidade}">
                  <textarea style="width: 100%; padding: 2%; border-radius: .5vw; resize: none;" id="descricao_vaga" class="inputs_alert_vaga" placeholder="Descrição" rows="4"> ${vagaSelecionada.descricao} </textarea>
                </div>
              `,
              focusConfirm: false,
              confirmButtonColor: "#0e566a",
              preConfirm: () => {
                // Capturando os valores dos inputs
                const titulo_vaga = document.getElementById("titulo_vaga").value;
                const area_vaga = document.getElementById("area_vaga").value;
                const faixa_etaria_vaga =
                  document.getElementById("faixa_etaria_vaga").value;
                const cidade_vaga =
                  document.getElementById("cidade_vaga").value;
                const descricao_vaga =
                  document.getElementById("descricao_vaga").value;

                return {
                  titulo_vaga,
                  area_vaga,
                  faixa_etaria_vaga,
                  cidade_vaga,
                  descricao_vaga,
                };
              },
            });

            if (vagas_infos) {

              const id_vaga = vagaSelecionada.id;

              const vaga_titulo = vagas_infos.titulo_vaga.trim();
              const vaga_area = vagas_infos.area_vaga.trim();
              const vaga_faixa_etaria = vagas_infos.faixa_etaria_vaga.trim();
              const vaga_cidade = vagas_infos.cidade_vaga.trim();
              const vaga_descricao = vagas_infos.descricao_vaga.trim();

              let data = { vaga_titulo, vaga_area, vaga_faixa_etaria, vaga_cidade, vaga_descricao, id_vaga }

              if(vaga_faixa_etaria === '16-18' || vaga_faixa_etaria === '19-21' || vaga_faixa_etaria === '22-24' || vaga_faixa_etaria === '25-27' || vaga_faixa_etaria === '28-30') {
                const response = await fetch(
                  "http://localhost:3008/api/vagas/putDadosVaga",
                  {
                    method: "PUT",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data),
                  }
                );
  
                let content = await response.json();
  
                if (content.success) {
                  Swal.fire({
                    title: "Dados da vaga atualizados!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000,
                  });

                  setTimeout(() => {
                    window.location.reload();
                  }, 2000);
  
                } else {
                  Swal.fire({
                    title: "Erro ao alterar dados da vaga!!",
                    text: "Tente novamente!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2000,
                  });
                  console.error();
                }
              }
              else {
                Swal.fire({
                  title: "A idade inserida está fora do padrão!!",
                  html: `
                    <p> Insira uma das opções abaixo: </p>

                    <ul style="margin-top: 2%; list-style: none;">
                      <li> '16-18' </li>
                      <li> '19-21' </li>
                      <li> '22-24' </li>
                      <li> '25-27' </li>
                      <li> '28-30' </li>
                    <ul>
                  `,
                  icon: "error",
                  confirmButtonColor: '#0e566a'
                });
              }

            }
          });
        }
      }
    } else {
      vagas_registradas.innerHTML = `<h3 style="color: #0e566a;"> Nenhuma vaga foi criada ainda!! </h3>`;
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
    confirmButtonColor: "#0e566a",
  });

  if (titulo_vaga) {
    const { value: area } = await Swal.fire({
      title: "Selecione a área da vaga",
      input: "select",
      inputOptions: {
        Áreas: {
          Tecnologia: "Tecnologia",
          Saúde: "Saúde",
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
      inputPlaceholder: "Seleciona o nível",
      showCancelButton: true,
      confirmButtonColor: "#0e566a",
    });

    if (area) {
      const { value: cidade } = await Swal.fire({
        title: "Localidade da vaga",
        input: "text",
        inputPlaceholder: "Digite aqui",
        confirmButtonColor: "#0e566a",
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
          confirmButtonColor: "#0e566a",
        });

        if (faixaEtaria) {
          const { value: descricao } = await Swal.fire({
            title: "Descrição da vaga",
            input: "text",
            inputPlaceholder: "Digite aqui",
            confirmButtonColor: "#0e566a",
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

            if (content.success) {
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

const botao_deletar_vaga = document.getElementById("deletar_vaga");

botao_deletar_vaga.onclick = async function () {
  const opcoes = {};

  for (let i = 0; i < titulos_vagas.length; i++) {
    opcoes[`${titulos_vagas[i]}`] = titulos_vagas[i];
  }

  const { value: vagas_deletar } = await Swal.fire({
    title: "Deletar meta",
    input: "select",
    inputOptions: opcoes,
    inputPlaceholder: "Selecionar aquele que deseja deletar",
    showCancelButton: true,
    confirmButtonColor: "#0e566a",
  });
  if (vagas_deletar) {
    data = { vagas_deletar };
  }

  const response = await fetch(
    "http://localhost:3008/api/vagas/deletandoVaga",
    {
      method: "DELETE",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    }
  );

  let content = await response.json();

  if (content.success) {
    alert("Deu bom o DELETE!!");

    window.location.reload();
    //recarrega a página
  } else {
    alert("Deu ruim o DELETE!!");
    console.error();
  }
};

// Vagas - PUT
async function putVagas(nome, nome_antigo) {
  let data = { nome, nome_antigo };

  const response = await fetch(`http://localhost:3008/api/vagas/putVagas`, {
    method: "PUT",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();

  if (content.success) {
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
      confirmButtonColor: "#0e566a",
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

let ft_user = null;

let ft_perfil_user = document.getElementById("ft_perfil_user");
let ft_perfil_user_2 = document.getElementById("ft_perfil_user_2");
let nome = document.getElementById("nome_user");
let email = document.getElementById("email_user");
let telefone = document.getElementById("telefone_user");
let empresa = document.getElementById("empresa_user");
let setor_atividade = document.getElementById("setor_atividade_user");

let guardar_idade_user = "";

async function getUserJovem(id_user) {
  const response = await fetch(
    `http://localhost:3008/api/buscandoDados/${id_user}`,
    {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  content = await response.json();

  if (content.success) {
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
    empresa.textContent = content.data[0].nome_empresa;
    setor_atividade.textContent = content.data[0].setor_atividade;
  } else {
    alert("Deu ruim");
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
const lapis_cidade = document.getElementById("lapis_cidade");
const lapis_idade = document.getElementById("lapis_idade");

let nome_user_anterior,
  email_user_anterior,
  telefone_user_anterior,
  empresa_user_anterior,
  setor_atividade_user_anterior;

let editando = true;
botao_editar.onclick = async function () {
  let nome_user = nome.textContent;
  let email_user = email.textContent;
  let telefone_user = telefone.textContent;
  let empresa_user = empresa.textContent;
  let setor_atividade_user = setor_atividade.textContent;

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

    lapis_empresa.onclick = async function () {
      const { value: empresa_ } = await Swal.fire({
        title: "Altere o nome de sua empresa",
        input: "text",
        inputLabel: "Insira abaixo:",
        inputPlaceholder: "Digite aqui para atualizar",
        confirmButtonColor: "#0e566a",
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
        confirmButtonColor: "#0e566a",
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

    let data = {
      nome_user,
      email_user,
      telefone_user,
      empresa_user,
      setor_atividade_user,
    };

    let formData = new FormData();
    formData.append("nome_user", nome_user);
    formData.append("email_user", email_user);
    formData.append("telefone_user", telefone_user);
    formData.append("empresa_user", empresa_user);
    formData.append("setor_atividade_user", setor_atividade_user);

    if (ft_user) {
      console.log("Arquivo de imagem selecionado:", ft_user);
      formData.append("ft_user", ft_user);
    }

    // PUT
    const response = await fetch(
      `http://localhost:3008/api/uptade/userEmpresa/${id_user}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    let content = await response.json();

    if (content.success) {
      putVagas(nome_user, nome_user_anterior);
      Swal.fire({
        title: "Seus dados foram atualizados com sucesso!",
        icon: "success",
        showConfirmButton: false,
        timer: 3000,
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } else {
      Swal.fire({
        title: "Não foi possível alterar seus dados!",
        icon: "error",
        showConfirmButton: false,
        timer: 3000,
      });
    }
    editando = true;
  }
};
