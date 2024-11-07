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

let button = document.querySelector("button");

button.onclick = async function (e) {
  e.preventDefault();
  //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  data = { email, password };

  // POST
  const response = await fetch("/api/verif/logIn", {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(data),
  });

  let content = await response.json();
  console.log(content);

  if (content.success) {
    if (content.data.length !== 0) {
      localStorage.setItem("ID_user", content.data[0].id);
      localStorage.setItem("User_name", content.data[0].name);

      Swal.fire({
        title: "LogIn realizado com sucesso!!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        if (content.data[0].origin === "user_jovem") {
          localStorage.setItem("Tipo_user", "Jovem");
          window.location.href = "../Tela Home - Usuario Jovem/index.html";
        } else if (content.data[0].origin === "user_empresa") {
          localStorage.setItem("Tipo_user", "Empresa");
          window.location.href = "../Tela Home - Usuario Empresa/index.html";
        } else {
          Swal.fire({
            title: "ERRO!!",
            text: "Tente novamente!!",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }, 2000);
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

    Swal.fire({
      title: "ERROR!!",
      text: "Tente novamente!! Ou crie uma conta!!",
      icon: "error",
      showConfirmButton: false,
      timer: 2300,
    });
  }
};