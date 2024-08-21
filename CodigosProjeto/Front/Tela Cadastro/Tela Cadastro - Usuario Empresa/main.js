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

// Evento botão cadastrar

let button = document.querySelector('button');

button.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirm_password = document.getElementById('confirm_password').value;
    let telefone = document.getElementById('telefone').value;
    let cidade = document.getElementById('cidade').value;
    let razao_social = document.getElementById('razao_social').value;
    let cnpj = document.getElementById('cnpj').value;
    let setor_atividade = document.getElementById('setor_atividade').value;

    let data = { name, email, password, telefone, cidade, razao_social, cnpj, setor_atividade }

    // POST
    const response = await fetch('http://localhost:3008/api/cadastro/empresa', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.success) {
        alert ("Sucesso com o POST!!");
        window.location.href = '../../Tela Cadastro/Tela Cadastro - Verificando Codigo/index.html'

    } else {
        console.error()
        alert("Não deu o POST!!");
    };
};