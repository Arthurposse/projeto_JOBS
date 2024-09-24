async function buscandoCurriculos() {
  const response = await fetch(
    `http://localhost:3008/api/buscandoCurriculos`, // Use GET aqui
    {
      method: "GET", // GET para buscar os currículos
      headers: { "Content-type": "application/json;charset=UTF-8" },
    }
  );

  const content = await response.json();
  console.log(content);

  if (content.success) {
    const container = document.getElementById("curriculos-container"); // Supondo que tenha um container no HTML

    // Iterar pelos currículos e criar links de download
    for (let i = 0; i < content.data.length; i++) {
      let div = document.createElement("div");
      div.className = "bloco_user_jovem";

      let img = document.createElement("img");
      let h2 = document.createElement("h2");
      let h4 = document.createElement("h4");
      let a = document.createElement("a");

      let fileName = content.data[i].curriculo;

      // Realizar fetch do arquivo
      const response = await fetch(
        `http://localhost:3008/uploads/curriculos/${fileName}`
      );
      const fileBlob = await response.blob(); // Transformar o arquivo em um Blob

      // Criar um URL temporário para download
      const fileUrl = window.URL.createObjectURL(fileBlob);

      a.href = fileUrl;
      a.innerText = "Baixar currículo";
      a.download = `Currículo de ${content.data[i].name}.pdf`; // Forçar download com o nome correto do arquivo
      a.style.display = "block"; // Para cada link ser uma nova linha

      if (content.data[i].ft_perfil !== null) {
        img.src = `http:localhost:3008/uploads/img_perfil/${content.data[i].ft_perfil}`;
      } else {
        img.src = "../images/Usuario_nao_logado.png";
      }

      h2.textContent = content.data[i].name;
      h4.textContent = "Área do usuário";

      div.appendChild(img); // Adicionando a ft de perfil do usuário jovem
      div.appendChild(h2);
      div.appendChild(h4);
      div.appendChild(a);
      container.appendChild(div); // Adicionar o link ao container
    }
  } else {
    alert("VISH, DEU BOLETE");
  }
}

buscandoCurriculos();
