let input_senha = document.getElementById('input_senha');
let icon_olho = document.getElementById('icon_olho');

icon_olho.onclick = function(){
    if(icon_olho.className === 'bi bi-eye-slash-fill'){
        icon_olho.className = "bi bi-eye-fill";
    }
    else {
        icon_olho.className = "bi bi-eye-slash-fill";
    }
}

// // Selecionar todos os elementos com a classe 'icon-olho'
// var iconOlhos = document.querySelectorAll('.icon-olho');

// // Iterar sobre cada ícone de olho
// iconOlhos.forEach(function(iconOlho) {
//     iconOlho.onclick = function() {
//         var inputSenha = iconOlho.previousElementSibling; // Selecionar o input anterior ao ícone de olho

//         if (iconOlho.classList.contains('bi-eye-slash-fill')) {
//             iconOlho.classList.remove('bi-eye-slash-fill');
//             iconOlho.classList.add('bi-eye-fill');
//             inputSenha.type = 'text';
//         } else {
//             iconOlho.classList.remove('bi-eye-fill');
//             iconOlho.classList.add('bi-eye-slash-fill');
            
//             var novoInput = document.createElement('input');
//             novoInput.type = 'password';
//             novoInput.value = inputSenha.value;
//             novoInput.placeholder = inputSenha.placeholder;

//             inputSenha.parentNode.replaceChild(novoInput, inputSenha);
//         }
//     };
// });