// Exemplo de como enviar uma solicitação para o servidor
const url = "http://localhost:3000/api/jobs";

const payload = {
  // Parâmetros de busca como keywords, location, etc.
  keywords: "Rh",
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

      jobElement.appendChild(titleElement);
      jobElement.appendChild(descriptionElement);
      jobElement.appendChild(companyElement);
      jobElement.appendChild(locationElement);

      jobsListElement.appendChild(jobElement);
    }
  })
  .catch((error) => {
    console.error("Erro:", error);
  });