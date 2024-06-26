// let input_senha = document.getElementById('input_senha');
let icon_olho = document.querySelectorAll('#icon_olho');

// Iterar sobre cada ícone de olho
icon_olho.forEach(function(iconOlho) {
    iconOlho.onclick = function() {
        var inputSenha = iconOlho.previousElementSibling; // Selecionar o input anterior ao ícone de olho

        if (iconOlho.classList.contains('bi-eye-fill')) {
            iconOlho.classList.remove('bi-eye-fill');
            iconOlho.classList.add('bi-eye-slash-fill');
            inputSenha.type = 'text';
        } else {
            iconOlho.classList.remove('bi-eye-slash-fill');
            iconOlho.classList.add('bi-eye-fill');
            
            var novoInput = document.createElement('input');
            novoInput.type = 'password';
            novoInput.value = inputSenha.value;
            novoInput.placeholder = inputSenha.placeholder;

            inputSenha.parentNode.replaceChild(novoInput, inputSenha);
        }
    };
});