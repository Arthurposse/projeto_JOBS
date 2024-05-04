// Coletando dados perfil (GET)

let email = document.getElementById('email_user');
let telefone = document.getElementById('telefone_user');
let cidade = document.getElementById('cidade_user');
let idade = document.getElementById('idade_user');

async function getUserJovem(id_user) {
    const response = await fetch(`http://localhost:3008/api/uptade/userJovem/${id_user}`, {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"}
    });

    content = await response.json();
    
    email.textContent = content.data[0].email;
    telefone.textContent = content.data[0].telefone;
    cidade.textContent = content.data[0].cidade;

    let ano_user = content.data[0].data_nascimento.slice(0, 4);

    let mes_user = content.data[0].data_nascimento.slice(5, 7);

    let dia_user = content.data[0].data_nascimento.slice(8, 10);

    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1; 
    const dia = data.getDate();
    
    let userAge = ano - ano_user;

    if (mes < mes_user || (mes === mes_user && dia < dia_user)) {
        userAge--;
    }

    idade.textContent = `${userAge} anos`;
};

let id_user = localStorage.getItem('ID_user');
let teste = getUserJovem(id_user);

// Editando dados perfil (PUT)

const botao_editar = document.getElementById('editar_perfil');

botao_editar.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let name = document.getElementById('name').value;
    let data = { name, email, password, data_nascimento, telefone, cidade }

    // POST
    const response = await fetch('http://localhost:3008/api/user/jovem', {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);
    
    if (content.sucess) {
        alert ("Sucesso com o PUT!!");
        // window.location.reload();
        //recarrega a página

    } else {
        console.error()
        alert("Não deu o PUT!!");
    };
};