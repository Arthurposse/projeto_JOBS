// Buscando infos do usuário

let id_user = Number(localStorage.getItem('ID_user'));
let User_name = localStorage.getItem('User_name');
let user_logado = document.getElementById('user_logado');

user_logado.textContent = User_name;

// Vagas - Criar

const botao_criar_vagas = document.getElementById('criar_vaga');

botao_criar_vagas.onclick = async function () {
    const { value: formValues } = await Swal.fire({
        title: 'Múltiplos Inputs',
        html:
            '<div>' +
            '<label for="input1">Input 1:</label>' +
            '<input id="swal-input1" class="swal2-input" placeholder="Input 1">' +
            '</div>' +
            '<div>' +
            '<label for="input2">Input 2:</label>' +
            '<input id="swal-input2" class="swal2-input" placeholder="Input 2">' +
            '</div>' +
            '<div>' +
            '<label for="input3">Input 3:</label>' +
            '<input id="swal-input3" class="swal2-input" placeholder="Input 3">' +
            '</div>' +
            '<div>' +
            '<label for="input4">Input 4:</label>' +
            '<input id="swal-input4" class="swal2-input" placeholder="Input 4">' +
            '</div>' +
            '<div>' +
            '<label for="input5">Input 5:</label>' +
            '<input id="swal-input5" class="swal2-input" placeholder="Input 5">' +
            '</div>',
        focusConfirm: false,
        preConfirm: () => {
            return [
                document.getElementById('swal-input1').value,
                document.getElementById('swal-input2').value,
                document.getElementById('swal-input3').value,
                document.getElementById('swal-input4').value,
                document.getElementById('swal-input5').value
            ]
        }
    });

    if (formValues) {
        Swal.fire(`
            Você inseriu:
            Input 1: ${formValues[0]}
            Input 2: ${formValues[1]}
            Input 3: ${formValues[2]}
            Input 4: ${formValues[3]}
            Input 5: ${formValues[4]}
        `);
    }
}

// Vagas - Filtro

const botao_filtrar_vagas = document.getElementById('filtrar_vaga');

botao_filtrar_vagas.onclick = async function () {
    const { value: result } = await Swal.fire({
        title: "Escolha um filtro de seu desejo",
        input: "select",
        inputOptions: {
            Opções: {
                faixa_etaria: "Faixa Etária",
                area_vaga: "Área da vaga"
            }
        },
        inputPlaceholder: "Seleciona o filtro",
        showCancelButton: true,
        confirmButtonColor: "#0e566a"
    });

    if (result === 'faixa_etaria') {
        const { value: date } = await Swal.fire({
            title: "Qual faixa etária você esta buscando?",
            icon: "question",
            input: "range",
            inputLabel: "Selecione",
            inputAttributes: {
                min: "14",
                max: "24",
                step: "1"
            },
            inputValue: 24,
            confirmButtonColor: "#0e566a"
        });

        if (date) {
            alert(date)
        }
    }

    if (result === 'area_vaga') {
        // Aparecer um alert em que, a partir de uma analise de todas as vagas que o usuário tiver no BD, seja listado as áreas para que o usuário consiga filtrar.
    }
};

// Coletando dados perfil (GET)

let nome = document.getElementById('nome_user');
let email = document.getElementById('email_user');
let telefone = document.getElementById('telefone_user');
let cidade = document.getElementById('cidade_user');

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

    let ft_user;
    let nome_user = nome.textContent;
    let email_user = email.textContent;
    let telefone_user = telefone.textContent;
    let cidade_user = cidade.textContent;

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
                ft_user = reader.readAsDataURL(file);
                console.log(file);
            }
        }

        lapis_nome.onclick = async function () {
            const { value: name } = await Swal.fire({
                title: "Altere seu nome",
                input: "text",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });
            if (name) {
                nome.textContent = name;
                nome_user = nome.textContent;
            }
        }

        lapis_email.onclick = async function () {
            const { value: emailValor } = await Swal.fire({
                title: "Altere seu email",
                input: "email",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });
            if (emailValor) {
                email.textContent = emailValor;
                email_user = email.textContent;
            }
        }

        lapis_telefone.onclick = async function () {
            const { value: tel } = await Swal.fire({
                title: "Altere seu número",
                input: "tel",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });
            if (tel) {
                telefone.textContent = tel;
                telefone_user = telefone.textContent;
            }
        }

        lapis_cidade.onclick = async function () {
            const { value: city } = await Swal.fire({
                title: "Altere sua cidade",
                input: "text",
                inputLabel: "Insira abaixo:",
                inputPlaceholder: "Digite aqui para atualizar"
            });
            if (city) {
                cidade.textContent = city;
                cidade_user = cidade.textContent;
            }
        }

        localStorage.setItem('User_name_antigo', nome.textContent);

        editando = false;
    } else {

        // Acrescentar alteração do nome registrado em cada vaga dentro do BD (putVagas) e buscar vagas novamente para serem impressas (getVagas)

        localStorage.setItem('User_name', nome_user);

        botao_editar.textContent = 'Editar';

        iconesLapis.forEach(iconeLapis => {
            iconeLapis.style.display = 'none';
        });

        let data = { nome_user, email_user, telefone_user, cidade_user };

        // PUT

        const response = await fetch(`http://localhost:3008/api/uptade/userEmpresa/${id_user}`, {
            method: "PUT",
            headers: { "Content-type": "application/json;charset=UTF-8" },
            body: JSON.stringify(data)
        });

        let content = await response.json();
        console.log(content);

        if (content.sucess) {
            Swal.fire({
                title: "Seus dados foram atualizados com sucesso!!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } else {
            Swal.fire({
                title: "Não foi possível alterar seus dados!!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
        };
        editando = true;
    }
};