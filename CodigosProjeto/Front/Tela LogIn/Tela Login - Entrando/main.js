let button = document.querySelector('button');

button.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // GET
    const response = await fetch('http://localhost:3008/api/verif/logIn', {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    let content = await response.json();
    
    if (content.sucess) {
        for (let i = 0; i < content.data.length; i++) {
            if(content.data[i].email === email && content.data[i].password === password) {
                localStorage.setItem('ID_user', content.data[i].id);
                localStorage.setItem('User_name', content.data[i].name);
                localStorage.setItem('TabelaOrigem', content.data[i].origin);

                Swal.fire({
                    title: "LogIn realizado com sucesso!!",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 2000
                });
                
                setTimeout(() => {
                    if(content.data[i].origin === 'user_jovem') {
                        window.location.href = '../../Tela Home - Usuario Jovem/index.html';
                    }
                    else if(content.data[i].origin === 'user_empresa') {
                        window.location.href = '../../Tela Home - Usuario Empresa/index.html';
                    }
                    else {
                        alert("ERROR! Não foi possível direcionar vocÊ para a próxima página!!")
                    }
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

    } else {
        console.error()
        alert("Não deu o GET!!");
    };
};