// Buscando infos do usuário

let id_user = Number(localStorage.getItem("ID_user"));
let User_name = localStorage.getItem("User_name");
let user_logado = document.getElementById("user_logado");

user_logado.textContent = User_name;

// Compartilhamento da dúvida

const botao_criar_duvida = document.getElementById('criar_duvida');

botao_criar_duvida.addEventListener('click', function(){
    Swal.fire({
        title: 'Compartilhe sua dúvida!!',
        input: 'text',
        inputPlaceholder: 'Digite sua pergunta',
        showCancelButton: true,
        confirmButtonText: 'Postar',
        confirmButtonColor: '#19a7ce',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        inputValidator: (value) => {
            if (!value) {
                return 'Por favor, digite algo!!'
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            async function enviandoDuvida() {

                let userInput = result.value;
                
                let data = { userInput, id_user }
            
                // POST
                const response = await fetch('http://localhost:3008/api/enviarDuvida', {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });
            };

            enviandoDuvida();
        }
    })
});