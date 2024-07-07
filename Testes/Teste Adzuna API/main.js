// Exemplo de como enviar uma solicitação para o servidor
const url = "http://localhost:3000/api/jobs";

const botao = document.querySelector('button');

botao.onclick = function(e){
  e.preventDefault();

  const input = document.querySelector('input').value;

  const payload = {
    // Parâmetros de busca como keywords, location, etc.
    keywords: input,
    location: "",
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

      if(data.results.length === 0) {
        alert('Não foi encontrado nenhuma vaga!')
      }
  
      const jobsListElement = document.querySelector("section");
  
      for (let i = 0; i < data.results.length; i++) {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job-item");
  
        const titleElement = document.createElement("h3");
        titleElement.textContent = `Título Vaga: ${data.results[i].title}`;
  
        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Descrição: ${data.results[i].description}`;
  
        const companyElement = document.createElement("p");
        companyElement.textContent = `Empresa: ${data.results[i].company.display_name}`;
  
        const locationElement = document.createElement("p");
        locationElement.textContent = `Localização: ${data.results[i].location.display_name}`;

        const dataElement = document.createElement("p");
        let data_criacao = data.results[i].created;
        dataElement.textContent = `Data de criação da vaga: ${data_criacao.slice(8, 10)}/${data_criacao.slice(5, 7)}/${data_criacao.slice(0, 4)} as ${data_criacao.slice(11, 16)}`
  
        const linkElement = document.createElement('a');
        linkElement.href = data.results[i].redirect_url; // Suponha que redirect_url seja o link detalhado da vaga
        linkElement.textContent = "Detalhes da Vaga"; // Texto do link
        linkElement.target = "_blank"; // Abrir em nova aba
  
        jobElement.appendChild(titleElement);
        jobElement.appendChild(descriptionElement);
        jobElement.appendChild(companyElement);
        jobElement.appendChild(locationElement);
        jobElement.appendChild(dataElement);
        jobElement.appendChild(linkElement);
        
        jobsListElement.appendChild(jobElement);
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}