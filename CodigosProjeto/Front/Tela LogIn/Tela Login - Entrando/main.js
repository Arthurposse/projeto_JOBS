let button = document.querySelector('button');

button.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // POST
    const response = await fetch('http://localhost:3008/api/verif/logIn', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess) {
        alert ("Sucesso com o GET!!");

        // Iterando sobre o array de chaves
        for (let i = 0; i < content.data.length; i++) {
            
            if(content.data[i].email === email && content.data[i].password === password) {
                Swal.fire({
                    title: "LogIn realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                setTimeout(() => {
                    window.location.href = '../../Tela Home - Usuario Jovem/index.html';
                }, 2000);
                break
            }
            
            else {
                Swal.fire({
                    title: "Conta não encontrada!!",
                    text: "Tente novamente!! Ou crie uma conta!!",
                    icon: "error",
                    showConfirmButton: false,
                    timer: 2300
                });
            }
        }

        // window.location.reload();
        //recarrega a página

    } else {
        console.error()
        alert("Não deu o GET!!");
    };
};