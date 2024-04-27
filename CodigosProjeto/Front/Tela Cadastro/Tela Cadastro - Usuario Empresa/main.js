let button = document.getElementById('handleSubmit');

button.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let razao_social = document.getElementById('razao_social').value;
    let cnpj = document.getElementById('cnpj').value;
    let setor_atividade = document.getElementById('setor_atividade').value;
    let data = { name, email, password, razao_social, cnpj, setor_atividade }

    // POST
    const response = await fetch('http://localhost:3008/api/store/task', {
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