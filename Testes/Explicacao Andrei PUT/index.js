let IDuser = localStorage.getItem('user_id');
console.log(IDuser);

let nome = document.getElementById('nome').value;
let email = document.getElementById('email').value;
let senha = document.getElementById('senha').value;
console.log(nome, email, senha);

let data = {nome, email, senha};

fetch('http://localhost:3000/api/user/' + IDuser, {
    method: "PUT",
    headers: {'Content-Type': 'application/json; charset=UTF-8'}, // cabeçalhos de definições de envio de dados
    body: JSON.stringify(data)
});