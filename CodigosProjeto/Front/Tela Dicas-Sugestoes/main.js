// Acessando ID do usuário

const user = Number(localStorage.getItem('ID_user'));

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
                let id_user = user;
                
                let data = { userInput, id_user }
            
                // POST
                const response = await fetch('http://localhost:3008/api/user/enviando_duvida', {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });
            };

            enviandoDuvida();
        }
    })
});