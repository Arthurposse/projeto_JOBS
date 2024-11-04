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

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Exemplo de como enviar uma solicitação para o servidor
const url = "http://localhost:3008/api/buscarVaga";
let page = 1; // Inicializa a página
let allJobs = new Set(); // Conjunto para armazenar os IDs das vagas exibidas

const lupa = document.getElementById('lupa');
const botao_mais = document.getElementById('botao_mais');

lupa.onclick = function (e) {
  e.preventDefault();
  page = 1; // Reinicia a página ao buscar novas vagas
  allJobs.clear(); // Limpa o conjunto de vagas exibidas anteriormente
  document.getElementById("empregos_encontrados").innerHTML = ""; // Limpa o conteúdo da seção de vagas
  buscarVagas();
}

const input_ = document.querySelector('input');

input_.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    page = 1; // Reinicia a página ao buscar novas vagas
    allJobs.clear(); // Limpa o conjunto de vagas exibidas anteriormente
    document.getElementById("empregos_encontrados").innerHTML = ""; // Limpa o conteúdo da seção de vagas
    buscarVagas();
  }
});

botao_mais.onclick = function (e) {
  e.preventDefault();
  page++;
  buscarVagas();
}

// Função para buscar vagas
function buscarVagas() {
  const input = document.querySelector('input').value;

  const payload = {
    keywords: input,
    location: "",
    page: page // Adiciona o número da página na requisição
  };

  const headers = {
    "Content-Type": "application/json",
  };

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ payload }), // Envolve o payload dentro de um objeto
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao fazer a solicitação: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.results.length === 0) {
        alert('Não foi encontrado nenhuma vaga!');

      } else {
        const jobsListElement = document.getElementById("empregos_encontrados");
        empregos_encontrados.textContent = '';
        
        data.results.forEach(job => {
          if (!allJobs.has(job.id)) { // Verifica se a vaga já foi exibida
            allJobs.add(job.id); // Adiciona o ID da vaga ao conjunto

            const jobElement = createJobElement(job);
            jobsListElement.appendChild(jobElement);
          }
        });

        botao_mais.style.opacity = '1';
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}


// Função para criar elemento HTML para cada vaga
function createJobElement(job) {
  const jobElement = document.createElement("div");
  jobElement.classList.add("bloco_vaga");

  const titleElement = document.createElement("h3");
  titleElement.textContent = job.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.classList.add("infos_vaga");
  descriptionElement.textContent = job.description;

  const detailsDiv = document.createElement("div");

  const locationLabel = document.createElement("strong");
  locationLabel.textContent = "Localização:";
  const locationElement = document.createElement("p");
  locationElement.appendChild(locationLabel);
  locationElement.appendChild(document.createTextNode(` ${job.location.display_name}`));

  const dataLabel = document.createElement("strong");
  dataLabel.textContent = "Data de criação da vaga:";
  const dataElement = document.createElement("p");
  let data_criacao = job.created;
  dataElement.appendChild(dataLabel);
  dataElement.appendChild(document.createTextNode(` ${data_criacao.slice(8, 10)}/${data_criacao.slice(5, 7)}/${data_criacao.slice(0, 4)} as ${data_criacao.slice(11, 16)}`));

  const linkElement = document.createElement('a');
  linkElement.href = job.redirect_url;
  linkElement.textContent = "Detalhes da Vaga";
  linkElement.target = "_blank";

  detailsDiv.appendChild(locationElement);
  detailsDiv.appendChild(dataElement);

  jobElement.appendChild(titleElement);
  jobElement.appendChild(descriptionElement);
  jobElement.appendChild(detailsDiv);
  jobElement.appendChild(linkElement);

  return jobElement;
}