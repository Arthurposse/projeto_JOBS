let button = document.querySelector("button");

button.onclick = async function (e) {
  e.preventDefault();
  //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirm_password = document.getElementById("confirm_password").value;
  let data_nascimento = document.getElementById("data_nascimento").value;
  let telefone = document.getElementById("telefone").value;
  let cidade = document.getElementById("cidade").value;

  let data = { name, email, password, data_nascimento, telefone, cidade };

  if (password === confirm_password) {
    // POST
    const response = await fetch("http://localhost:3008/api/user/jovem", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.sucess) {
      Swal.fire({
        title: "Cadastro realizado com sucesso!!",
        text: "Aguarde enquanto seu código de verificação é gerado.",
        icon: "success",
        showConfirmButton: false,
        timer: 2600,
      });

      const response = await fetch("http://localhost:3008/api/enviarEmail", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ email }),
      });

      let content = await response.json();
      console.log(content);

      if (content.success) {
        Swal.fire({
          title: "Código de verificação enviado com sucesso!!",
          text: "Acesse seu email.",
          icon: "success",
          showConfirmButton: false,
          timer: 2100,
        });

        localStorage.setItem("CodVerif", content.verificationCode);

        setTimeout(() => {
          window.location.href =
            "../../Tela Cadastro/Tela Cadastro - Verificando Codigo/index.html";
        }, 2100);
      } else {
        Swal.fire({
          title: "Conta não encontrada!!",
          text: "Tente novamente!! Ou crie uma conta!!",
          icon: "error",
          showConfirmButton: false,
          timer: 2300,
        });
      }
    } else {
      console.error();
      alert("Não deu o POST!!");
    }
  }
  else {
    Swal.fire({
      title: "As senhas não coincidem!!",
      text: "Tente novamente!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2300,
    });
  }
};