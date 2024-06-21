let button = document.querySelector("button");

button.onclick = async function (e) {
  e.preventDefault();
  //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let data_nascimento = document.getElementById("data_nascimento").value;
  let telefone = document.getElementById("telefone").value;
  let cidade = document.getElementById("cidade").value;

  let data = { name, email, password, data_nascimento, telefone, cidade };

  // POST
  const response = await fetch("http://localhost:3008/api/user/jovem", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.sucess) {
    alert("Sucesso com o POST!!");

    let data = { email };

    const response = await fetch("http://localhost:3008/api/testeEnviarEmail", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    });

    let content = await response.json();
    console.log(content);

    if(content.success) {
      alert("Código de verificação enviado com sucesso!!");
      
      localStorage.setItem('CodVerif', content.verificationCode);

      window.location.href = '../../Tela Cadastro/Tela Cadastro - Verificando Codigo/index.html'
    }
    else {
      alert("ERROR!! Código de verificação não enviado!!");
    }

  } else {
    console.error();
    alert("Não deu o POST!!");
  }
};
