let codigoVerif = localStorage.getItem("CodVerif");
// localStorage.removeItem('CodVerif');

const botao = document.querySelector("button");

botao.onclick = function () {
  const cod_verif = document.getElementById("cod_verif").value;

  if (codigoVerif === cod_verif) {
    Swal.fire({
      title: "Código correto!!",
      text: "Agora realize o login em nosso site.",
      icon: "success",
      showConfirmButton: false,
      timer: 2200,
    });

    localStorage.removeItem("CodVerif");

    setTimeout(() => {
      window.location.href =
        "../../Tela Login - Entrando/index.html";
    }, 2200);
  } else {
    Swal.fire({
      title: "Código incorreto!!",
      text: "Tente novamente!!",
      icon: "error",
      showConfirmButton: false,
      timer: 1700,
    });
  }
};
