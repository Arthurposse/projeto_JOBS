// Visualizar senha - Icon olho

let icon_olho = document.querySelectorAll("#icon_olho");

// Iterar sobre cada ícone de olho
icon_olho.forEach(function (iconOlho) {
  iconOlho.onclick = function () {
    let inputSenha = iconOlho.previousElementSibling; // Selecionar o input anterior ao ícone de olho

    if (iconOlho.classList.contains("bi-eye-fill")) {
      iconOlho.classList.remove("bi-eye-fill");
      iconOlho.classList.add("bi-eye-slash-fill");
      inputSenha.type = "text";
    } else {
      iconOlho.classList.remove("bi-eye-slash-fill");
      iconOlho.classList.add("bi-eye-fill");

      let novoInput = document.createElement("input");
      novoInput.type = "password";
      novoInput.value = inputSenha.value;
      novoInput.placeholder = inputSenha.placeholder;

      inputSenha.parentNode.replaceChild(novoInput, inputSenha);
    }
  };
});

// Evento botão cadastrar

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

  // Para Verificar idade
  let ano_user = Number(data_nascimento.slice(0, 4));

  let mes_user = Number(data_nascimento.slice(5, 7));

  let dia_user = Number(data_nascimento.slice(8, 10));

  const data_var = new Date();
  const ano = data_var.getFullYear();
  const mes = data_var.getMonth() + 1;
  const dia = data_var.getDate();

  let userAge = ano - ano_user;

  if (mes < mes_user || (mes === mes_user && dia < dia_user)) {
    userAge--;
  }

  let data = { name, email, password, data_nascimento, telefone, cidade };

  console.log(data);

  if (password === confirm_password && userAge >= 14 && userAge <= 24) {
    // POST
    const response = await fetch("http://localhost:3008/api/cadastro/jovem", {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(data),
    });

    let content = await response.json();

    if (content.success) {
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
          title: "ERRO!!",
          text: "Tente novamente!!",
          icon: "error",
          showConfirmButton: false,
          timer: 2300,
        });
      }
    } else if (content.errorDetails.includes("Duplicate")) {
      Swal.fire({
        title: "Conta já existente!!",
        text: "Tente novamente!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2300,
      });
    } else {
      Swal.fire({
        title: "ERRO NO POST!!",
        text: "Tente novamente!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2300,
      });
    }
  } else {
    if (!name || !email || !password || !confirm_password || !telefone || !cidade || !userAge) {
      Swal.fire({
        title: "É necessário preencher os campos!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2300,
      });
    } else if (password !== confirm_password) {
      Swal.fire({
        title: "As senhas não coincidem!!",
        text: "Tente novamente!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2300,
      });
    } else if (userAge < 14 || userAge > 24) {
      Swal.fire({
        title: "Limite de idade!!",
        text: "Não é possível realizar cadastrado no site!! Você deve possuir entre 14 a 24 anos!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2500,
      });
    } else {
      Swal.fire({
        title: "ERRO NO POST!!",
        text: "Tente novamente!!",
        icon: "error",
        showConfirmButton: false,
        timer: 2300,
      });
    }
  }
};