// Exemplo de como enviar uma solicitação para o servidor
const url = "http://localhost:3000/api/jobs";

const payload = {
  // Parâmetros de busca como keywords, location, etc.
  keywords: "Desenvolvedor de software",
  location: ""
};

const headers = {
  "Content-Type": "application/json"
};

fetch(url, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(payload),
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Erro ao fazer a solicitação: ${response.status}`);
  }
  return response.json();
})
.then(data => {
  console.log("Resposta da API Adzuna: ", data);
  
  for(let i = 0; i < data.results.length; i++) {
    console.log(`Título Vaga: ${data.results[i].title}`)
    console.log(`Descrição: ${data.results[i].description}`)
    console.log(`Empresa: ${data.results[i].company.display_name}`)
    console.log(`Localização: ${data.results[i].location.display_name}`)
    console.log("");
  }
})
.catch(error => {
  console.error("Erro:", error);
});
