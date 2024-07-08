// Exemplo de como enviar uma solicitação para o servidor
const url = "http://localhost:3000/api/jobs";
let page = 1; // Inicializa a página
let allJobs = new Set(); // Conjunto para armazenar os IDs das vagas exibidas

const buscarButton = document.getElementById('buscar');
const maisButton = document.getElementById('mais');

buscarButton.onclick = function(e){
  e.preventDefault();
  page = 1; // Reinicia a página ao buscar novas vagas
  allJobs.clear(); // Limpa o conjunto de vagas exibidas anteriormente
  document.getElementById("jobs-list").innerHTML = ""; // Limpa o conteúdo da seção de vagas
  buscarVagas();
}

maisButton.onclick = function(e) {
  e.preventDefault();
  page++;
  buscarVagas();
}

function buscarVagas() {
  const input = document.querySelector('input').value;

  const payload = {
    // Parâmetros de busca como keywords, location, etc.
    keywords: input,
    location: "",
    page: page  // Adiciona o número da página na requisição
  };
  
  const headers = {
    "Content-Type": "application/json",
  };
  
  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Erro ao fazer a solicitação: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Resposta da API Adzuna: ", data);

      if (data.results.length === 0) {
        alert('Não foi encontrado nenhuma vaga!');
      } else {
        const jobsListElement = document.getElementById("jobs-list");

        data.results.forEach(job => {
          if (!allJobs.has(job.id)) { // Verifica se a vaga já foi exibida
            allJobs.add(job.id); // Adiciona o ID da vaga ao conjunto

            const jobElement = createJobElement(job);
            jobsListElement.appendChild(jobElement);
          }
        });
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para criar elemento HTML para cada vaga
function createJobElement(job) {
  const jobElement = document.createElement("div");
  jobElement.classList.add("job-item");

  const titleElement = document.createElement("h3");
  titleElement.textContent = `Título Vaga: ${job.title}`;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = `Descrição: ${job.description}`;

  const companyElement = document.createElement("p");
  companyElement.textContent = `Empresa: ${job.company.display_name}`;

  const locationElement = document.createElement("p");
  locationElement.textContent = `Localização: ${job.location.display_name}`;

  const dataElement = document.createElement("p");
  let data_criacao = job.created;
  dataElement.textContent = `Data de criação da vaga: ${data_criacao.slice(8, 10)}/${data_criacao.slice(5, 7)}/${data_criacao.slice(0, 4)} as ${data_criacao.slice(11, 16)}`;

  const linkElement = document.createElement('a');
  linkElement.href = job.redirect_url;
  linkElement.textContent = "Detalhes da Vaga";
  linkElement.target = "_blank";

  jobElement.appendChild(titleElement);
  jobElement.appendChild(descriptionElement);
  jobElement.appendChild(companyElement);
  jobElement.appendChild(locationElement);
  jobElement.appendChild(dataElement);
  jobElement.appendChild(linkElement);

  return jobElement;
}
