// Visualizar senha - Icon olho

let icon_olho = document.querySelectorAll('#icon_olho');

// Iterar sobre cada ícone de olho
icon_olho.forEach(function (iconOlho) {
  iconOlho.onclick = function () {
    let inputSenha = iconOlho.previousElementSibling; // Selecionar o input anterior ao ícone de olho

    if (iconOlho.classList.contains('bi-eye-fill')) {
      iconOlho.classList.remove('bi-eye-fill');
      iconOlho.classList.add('bi-eye-slash-fill');
      inputSenha.type = 'text';
    } else {
      iconOlho.classList.remove('bi-eye-slash-fill');
      iconOlho.classList.add('bi-eye-fill');

      let novoInput = document.createElement('input');
      novoInput.type = 'password';
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

  // GET
  const response = await fetch("http://localhost:3008/api/verif/logIn", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  });

  let content = await response.json();

  if (content.sucess) {
    for (let i = 0; i < content.data.length; i++) {
      if (
        content.data[i].email === email &&
        content.data[i].password === password
      ) {
        localStorage.setItem("ID_user", content.data[i].id);
        localStorage.setItem("User_name", content.data[i].name);

        Swal.fire({
          title: "LogIn realizado com sucesso!!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });

        setTimeout(() => {
          if (content.data[i].origin === "user_jovem") {
            window.location.href = "../Tela Home - Usuario Jovem/index.html";
          } else if (content.data[i].origin === "user_empresa") {
            window.location.href =
              "../Tela Home - Usuario Empresa/index.html";
          } else {
            alert(
              "ERROR! Não foi possível direcionar vocÊ para a próxima página!!"
            );
          }
        }, 2000);
        break;
      } else {
        Swal.fire({
          title: "Conta não encontrada!!",
          text: "Tente novamente!! Ou crie uma conta!!",
          icon: "error",
          showConfirmButton: false,
          timer: 2300,
        });
      }
    }
  } else {
    console.error();
    alert("Não deu o GET!!");
  }
};