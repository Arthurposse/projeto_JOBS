// Verificando o tipo de usuário

const check_jovem = document.getElementById('check_jovem');
const check_empresa = document.getElementById('check_empresa');

if (check_jovem.checked === true && check_empresa.checked === true) {
    check_jovem.checked === false;
    check_jovem.checked === false;
}

check_jovem.addEventListener('change', function() {
    if (this.checked) {
        check_empresa.disabled = true;

    } else {
        check_empresa.disabled = false;
    }
});

check_empresa.addEventListener('change', function() {
    if (this.checked) {
        check_jovem.disabled = true;
    } else {
        check_jovem.disabled = false;
    }
});

// Botão continuar

const button = document.querySelector('button');

button.onclick = function(e) {

    e.preventDefault();

    if(check_jovem.checked === false && check_empresa.checked === false) {
        Swal.fire({
            title: "Selecione uma opção!!",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
            width: 400
          });
    }

    else if(check_empresa.disabled === true) {
        window.location.href = '../Tela Cadastro - Usuario Jovem/index.html';

    }

    else if(check_jovem.disabled === true) {
        window.location.href = '../Tela Cadastro - Usuario Empresa/index.html';
    }
    
    else {
        check_empresa.checked  = false;
        check_jovem.checked  = false;

        Swal.fire({
            title: "Selecione APENAS uma opção!!",
            icon: "warning",
            showConfirmButton: false,
            timer: 2000,
            width: 400
          });
    }
}