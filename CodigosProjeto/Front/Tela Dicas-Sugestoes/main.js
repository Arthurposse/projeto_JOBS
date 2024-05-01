const botao_criar_duvida = document.getElementById('criar_duvida');

const user = 2;

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
            
                let content = await response.json();
                console.log(content);
                
                if (content.sucess) {
                    alert ("Sucesso com o POST!!");
                    // window.location.reload();
                    //recarrega a página
            
                } else {
                    console.error()
                    alert("Não deu o POST!!");
                };
            };

            enviandoDuvida();
        }
    })
});

// TESTE COMUNICAÇÃO COM BANCO DE DADOS

// const teste_but_duvida = document.getElementById('teste_but_duvida');

// teste_but_duvida.onclick = async function (e) {
    
//     e.preventDefault();
    
//     let teste_duvida = document.getElementById('teste_duvida').value;
    
//     let data = { teste_duvida }

//     // POST
//     const response = await fetch('http://localhost:3008/api/user/enviando_duvida', {
//         method: "POST",
//         headers: { "Content-type": "application/json;charset=UTF-8" },
//         body: JSON.stringify(data)
//     });

//     let content = await response.json();
//     console.log(content);
    
//     if (content.sucess) {
//         alert ("Sucesso com o POST!!");
//         // window.location.reload();
//         //recarrega a página

//     } else {
//         console.error()
//         alert("Não deu o POST!!");
//     };
// };