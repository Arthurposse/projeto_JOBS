// Alert - Fazer cadastro

setTimeout(() => {
    Swal.fire({
        title: "Não realizou seu cadastro?",
        text: "Clique abaixo:",
        icon: "question",
        html: `
        <a href="../Tela Cadastro/Tela Cadastro - Verificando Tipo Usuario/index.html" style="text-decoration: none; color: #19a7ce;"> Cadastrar-se </a>`,
        confirmButtonColor: "#0e566a",
        confirmButtonText: "Fazer mais tarde"
    });
}, 4000);

// Direcionamento da página ao clicar em entrar no canto superior direito

const bloco_usuario = document.querySelector('.bloco_usuario');

bloco_usuario.onclick = function () {
  window.location.href = '../Tela Login - Entrando/index.html';
}

// Acrescentando vagas 

const url = "http://localhost:3008/api/buscarVaga";
let page = 1; // Inicializa a página
let allJobs = new Set(); // Conjunto para armazenar os IDs das vagas exibidas

// Função para buscar vagas
function buscarVagas(aleatorio = false) {
  const loader = document.querySelector('.loader');

  loader.style.display = 'block';

  const input = aleatorio ? "" : document.querySelector('input').value;

  const payload = {
    keywords: input,
    location: "",
    page: aleatorio ? getRandomPage() : page // Adiciona o número da página ou uma página aleatória
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
      console.log("Resposta da API Adzuna: ", data);

      if (data.results.length === 0) {
        alert('Não foi encontrado nenhuma vaga!');
      } else {
        const jobsListElement = document.querySelector(".carrossel");
        let jobCount = 0; // Contador de vagas exibidas

        data.results.forEach(job => {
          if (!allJobs.has(job.id) && jobCount < 3) { // Verifica se a vaga já foi exibida e se o número de vagas é menor que 3
            allJobs.add(job.id); // Adiciona o ID da vaga ao conjunto

            const jobElement = createJobElement(job);
            jobsListElement.appendChild(jobElement);
            jobCount++; // Incrementa o contador

            loader.style.display = 'none';
          }
        });

        if (jobCount === 0) {
          alert('Não foi encontrado nenhuma vaga!');
        }
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

// Função para gerar uma página aleatória
function getRandomPage() {
  return Math.floor(Math.random() * 100) + 1; // Gera uma página aleatória entre 1 e 100
}

// Função para criar um elemento de vaga de emprego
function createJobElement(job) {
  // Cria um contêiner para a vaga
  const jobElement = document.createElement('div');
  jobElement.classList.add('job');

  // Adiciona o título da vaga
  const title = document.createElement('h3');
  title.textContent = job.title;
  jobElement.appendChild(title);

  // Adiciona a empresa
  const company = document.createElement('p');
  company.textContent = `Empresa: ${job.company.display_name}`;
  jobElement.appendChild(company);

  // Adiciona o local
  const location = document.createElement('p');
  location.textContent = `Local: ${job.location.display_name}`;
  jobElement.appendChild(location);

  // Adiciona uma breve descrição
  const description = document.createElement('p');
  description.textContent = job.description.substring(0, 150) + '...'; // Mostra apenas os primeiros 150 caracteres
  jobElement.appendChild(description);

  // Adiciona um link para mais detalhes (opcional)
  const link = document.createElement('a');
  link.href = job.redirect_url;
  link.textContent = 'Mais detalhes';
  link.target = '_blank'; // Abre o link em uma nova aba
  jobElement.appendChild(link);

  return jobElement;
}

// Inicia a busca aleatória quando a página é carregada
window.addEventListener('load', () => {
  buscarVagas(true); // Passa true para buscar vagas aleatórias
});

// Clicando nos botoões Mais Sobre

const botoes_mais_sobre = document.querySelectorAll('#botao_mais_sobre');

botoes_mais_sobre.forEach(botao => {
  botao.onclick = function() {
    window.location.href = '../Tela Login - Entrando/index.html';
  };
});