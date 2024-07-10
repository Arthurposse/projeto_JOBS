let input = document.getElementById('input_idade');
const botao = document.querySelector('button');

botao.onclick = function () {

    let ano_user = Number(input.value.slice(0, 4));

    let mes_user = Number(input.value.slice(5, 7));

    let dia_user = Number(input.value.slice(8, 10));

    const data = new Date();
    const ano = data.getFullYear();
    const mes = data.getMonth() + 1;
    const dia = data.getDate();

    let userAge = ano - ano_user;

    if (mes < mes_user || (mes === mes_user && dia < dia_user)) {
        userAge--;
    }

    alert(`${userAge} anos`);

    if(userAge < 14 || userAge > 24) {
        alert('A idade deve estar entre 14 á 24 anos!!!')
    }
}