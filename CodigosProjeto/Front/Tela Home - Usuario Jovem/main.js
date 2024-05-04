// Coletando dados perfil (GET)

let nome = document.getElementById('nome_user');
let email = document.getElementById('email_user');
let telefone = document.getElementById('telefone_user');
let cidade = document.getElementById('cidade_user');
let idade = document.getElementById('idade_user');

async function getUserJovem(id_user) {

    const response = await fetch(`http://localhost:3008/api//get/userJovem/${id_user}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    content = await response.json();

    nome.textContent = content.data[0].name;
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
const iconesLapis = document.querySelectorAll('.bi-pencil-square');

const lapis_ft_perfil = document.getElementById('lapis_ft_perfil');
const lapis_nome = document.getElementById('lapis_nome');
const lapis_email = document.getElementById('lapis_email');
const lapis_telefone = document.getElementById('lapis_telefone');
const lapis_cidade = document.getElementById('lapis_cidade');
const lapis_idade = document.getElementById('lapis_idade');

let editando = true;
botao_editar.onclick = async function () {
    
    if (editando) {
        botao_editar.textContent = 'Salvar';

        iconesLapis.forEach(iconeLapis => {
            iconeLapis.style.display = 'flex';
            iconeLapis.style.animation = 'all 1s ease';
        });

        lapis_ft_perfil.onclick = async function () {
            const { value: file } = await Swal.fire({
                title: "Select image",
                input: "file",
                inputAttributes: {
                    "accept": "image/*",
                    "aria-label": "Upload your profile picture"
                }
            });
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    Swal.fire({
                        title: "Your uploaded picture",
                        imageUrl: e.target.result,
                        imageAlt: "The uploaded picture"
                    });
                };
                reader.readAsDataURL(file);
            }
        }

        lapis_nome.onclick = async function () {
            const { value: name } = await Swal.fire({
                title: "Altere seu nome",
                input: "text",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });

            nome.textContent = name;
        }

        lapis_email.onclick = async function () {
            const { value: email } = await Swal.fire({
                title: "Altere seu email",
                input: "email",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });

            email.textContent = email;
        }

        lapis_telefone.onclick = async function () {
            const { value: tel } = await Swal.fire({
                title: "Altere seu número",
                input: "tel",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });

            telefone.textContent = tel;
        }

        lapis_cidade.onclick = async function () {
            const { value: city } = await Swal.fire({
                title: "Altere sua cidade",
                input: "text",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });

            cidade.textContent = city;
        }

        lapis_idade.onclick = async function () {
            const { value: date } = await Swal.fire({
                title: "Selecione a sua data de nascimento",
                input: "date",
                didOpen: () => {
                    const today = (new Date()).toISOString();
                    Swal.getInput().min = today.split("T")[0];
                }
            });

            idade.textContent = date;
        }
            
        editando = false;
    } else {
        botao_editar.textContent = 'Editar';

        iconesLapis.forEach(iconeLapis => {
            iconeLapis.style.display = 'none';
        });

        let data = { nome, email, telefone, cidade, idade }

        // PUT
        const response = await fetch(`http://localhost:3008/api//uptade/userJovem/${id_user}`, {
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

        editando = true;
    }
};