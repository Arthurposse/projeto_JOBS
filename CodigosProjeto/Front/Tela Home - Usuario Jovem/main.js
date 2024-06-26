// Planejamento de carreira - Metas usuário

let id_user = Number(localStorage.getItem('ID_user'));
let User_name = localStorage.getItem('User_name');
let user_logado = document.getElementById('user_logado');

user_logado.textContent = User_name;

// Metas - GET

let section_pc_metas = document.querySelector('.pc_metas');
let titulos_metas = [];

async function getMetas(nome, ordem) {
    const response = await fetch(`http://localhost:3008/api/metaJovem?User_name=${nome}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    });

    let content = await response.json();

    if (ordem === 'date') {
        for (let i = 0; i < content.data.length; i++) {
            const data = content.data;

            const eventosOrdenados = [];

            data.forEach((e) => {
                if (e.data_conclusao) {
                    const currentDate = new Date(e.data_conclusao);

                    // Adiciona o evento ao array de eventos ordenados
                    eventosOrdenados.push({
                        data: currentDate,
                        evento: e
                    });
                }
            })

            eventosOrdenados.sort((a, b) => a.data - b.data);

            section_pc_metas.innerHTML = '';

            // Adiciona os cards ordenados ao contêiner
            eventosOrdenados.forEach((evento) => {
                const currentDate = evento.data;
                const eventoData = evento.evento;

                // Criando elementos do card
                const bloco_meta = document.createElement('section');
                bloco_meta.classList.add('bloco_meta');

                const h2 = document.createElement('h2');
                h2.textContent = eventoData.titulo; // Título do Evento

                const p_infos_meta = document.createElement('p');
                p_infos_meta.classList.add('infos_meta');
                p_infos_meta.textContent = eventoData.infos; // Informações do Evento

                const bloco_meta_rodape = document.createElement('section');
                bloco_meta_rodape.classList.add('bloco_meta_rodape');

                function adicionarZero(numero) {
                    return numero < 10 ? '0' + numero : numero;
                }

                const diaFormatado = adicionarZero(currentDate.getDate());
                const mesFormatado = adicionarZero(currentDate.getMonth() + 1);

                const p_data_meta = document.createElement('p');
                p_data_meta.classList.add('data_meta');
                p_data_meta.textContent = `${diaFormatado}/${mesFormatado}`;

                const icon = document.createElement('i');
                icon.classList.add('bi-exclamation-triangle');
                icon.style.color = eventoData.prioridade; // Cor baseada na prioridade do evento
                icon.style.fontSize = '1.5rem';

                // Adicionando elementos do card ao bloco_meta_rodape
                bloco_meta_rodape.appendChild(p_data_meta);
                bloco_meta_rodape.appendChild(icon);

                // Adicionando elementos ao bloco_meta
                bloco_meta.appendChild(h2);
                bloco_meta.appendChild(p_infos_meta);
                bloco_meta.appendChild(bloco_meta_rodape);

                // Adicionando o bloco_meta ao contêiner de cards
                section_pc_metas.appendChild(bloco_meta);
            });
        }
    }
    else if (ordem === 'red' || ordem === 'yellow' || ordem === 'green') {

        section_pc_metas.innerHTML = '';

        if(content.data.length > 0) {
            for (let i = 0; i < content.data.length; i++) {
                if (content.data[i].prioridade === ordem) {
                    const titulo = content.data[i].titulo;
    
                    titulos_metas.push(titulo);
    
                    const infos = content.data[i].infos;
                    const data = content.data[i].data_conclusao;
                    const prioridade = content.data[i].prioridade;
    
                    const pc_metas = document.querySelector('.pc_metas');
    
                    const bloco_meta = document.createElement('section');
                    bloco_meta.classList.add('bloco_meta');
    
                    const h2 = document.createElement('h2');
                    h2.textContent = titulo;
    
                    const p_infos_meta = document.createElement('p');
                    p_infos_meta.classList.add('infos_meta');
                    p_infos_meta.textContent = infos;
    
                    const bloco_meta_rodape = document.createElement('section');
                    bloco_meta_rodape.classList.add('bloco_meta_rodape');
    
                    // let ano_user = data.slice(0, 4);
    
                    let mes_user = data.slice(5, 7);
    
                    let dia_user = data.slice(8, 10);
    
                    const p_data_meta = document.createElement('p');
                    p_data_meta.classList.add('data_meta');
                    p_data_meta.textContent = `${dia_user}/${mes_user}`;
    
                    const icon = document.createElement('i');
                    icon.classList.add('bi-exclamation-triangle');
                    icon.style.color = prioridade;
                    icon.style.fontSize = '1.5rem';
    
                    bloco_meta.appendChild(h2);
                    bloco_meta.appendChild(p_infos_meta);
                    bloco_meta_rodape.appendChild(p_data_meta);
                    bloco_meta_rodape.appendChild(icon);
                    bloco_meta.appendChild(bloco_meta_rodape);
    
                    pc_metas.appendChild(bloco_meta);
                }
            }
        }
        else {
            section_pc_metas.innerHTML = '<h2> Nenhum foi encontrado!! </h2>'
        }
    }
    else {
        for (let i = 0; i < content.data.length; i++) {
            const titulo = content.data[i].titulo;

            titulos_metas.push(titulo);

            const infos = content.data[i].infos;
            const data = content.data[i].data_conclusao;
            const prioridade = content.data[i].prioridade;

            const pc_metas = document.querySelector('.pc_metas');

            const bloco_meta = document.createElement('section');
            bloco_meta.classList.add('bloco_meta');

            const h2 = document.createElement('h2');
            h2.textContent = titulo;

            const p_infos_meta = document.createElement('p');
            p_infos_meta.classList.add('infos_meta');
            p_infos_meta.textContent = infos;

            const bloco_meta_rodape = document.createElement('section');
            bloco_meta_rodape.classList.add('bloco_meta_rodape');

            // let ano_user = data.slice(0, 4);

            let mes_user = data.slice(5, 7);

            let dia_user = data.slice(8, 10);

            const p_data_meta = document.createElement('p');
            p_data_meta.classList.add('data_meta');
            p_data_meta.textContent = `${dia_user}/${mes_user}`;

            const icon = document.createElement('i');
            icon.classList.add('bi-exclamation-triangle');
            icon.style.color = prioridade;
            icon.style.fontSize = '1.5rem';

            bloco_meta.appendChild(h2);
            bloco_meta.appendChild(p_infos_meta);
            bloco_meta_rodape.appendChild(p_data_meta);
            bloco_meta_rodape.appendChild(icon);
            bloco_meta.appendChild(bloco_meta_rodape);

            pc_metas.appendChild(bloco_meta);
        }
    }
}

getMetas(User_name);

// Metas - POST

const botao_criar_metas = document.getElementById('criar_meta');

let titulo = '';
let infos = '';
let data_alterar = '';
let prioridade = '';

botao_criar_metas.onclick = async function () {

    const { value: titulo_criar } = await Swal.fire({
        title: 'Título meta',
        input: 'text',
        inputPlaceholder: "Digite aqui"
    });

    if (titulo_criar) {
        const { value: infos_criar } = await Swal.fire({
            title: 'Detalhes meta',
            input: 'text',
            inputPlaceholder: "Digite aqui"
        });

        if (infos_criar) {
            const { value: data_criar } = await Swal.fire({
                title: 'Data de conclusão da meta',
                input: 'date'
            });

            if (data_criar) {
                const { value: prioridade_criar } = await Swal.fire({
                    title: "Selecione a prioridade da meta",
                    input: "select",
                    inputOptions: {
                        Prioridades: {
                            red: "Alta",
                            yellow: "Media",
                            green: "Baixa",
                        }
                    },
                    inputPlaceholder: "Seleciona o nível",
                    showCancelButton: true
                });
                if (prioridade_criar) {
                    titulo = titulo_criar;
                    infos = infos_criar;
                    data_alterar = data_criar;
                    prioridade = prioridade_criar;
                }
            }
        }
    }

    let data = { User_name, titulo, infos, data_alterar, prioridade }

    // POST
    const response = await fetch('http://localhost:3008/api/metas/criando', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.sucess) {

        alert('Deu bom o POST!!')

        window.location.reload();
        //recarrega a página

    } else {
        alert("Deu ruim o POST!!");
        console.error()
    };
}

// Metas - PUT

async function putMetas(nome, nome_antigo) {

    let data = { nome, nome_antigo };

    const response = await fetch(`http://localhost:3008/api/metas/atualizando`, {
        method: "PUT",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.sucess) {
        alert('Deu bom o PUT METAS!!')
    } else {
        alert("Deu ruim o PUT METAS!!");
        console.error()
    };
}

// Metas - DELETE

const botao_deletar_metas = document.getElementById('deletar_meta');

botao_deletar_metas.onclick = async function () {

    const opcoes = {};

    for (let i = 0; i < titulos_metas.length; i++) {
        opcoes[`${titulos_metas[i]}`] = titulos_metas[i];
    }

    const { value: metas_deletar } = await Swal.fire({
        title: "Deletar meta",
        input: "select",
        inputOptions: opcoes,
        inputPlaceholder: "Selecionar aquele que deseja deletar",
        showCancelButton: true
    });
    if (metas_deletar) {
        data = { metas_deletar };
    }

    const response = await fetch('http://localhost:3008/api/metas/deletando', {
        method: "DELETE",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.sucess) {

        alert('Deu bom o DELETE!!')

        window.location.reload();
        //recarrega a página

    } else {
        alert("Deu ruim o DELETE!!");
        console.error()
    };
};

// Metas - Filtro

const botao_filtrar_metas = document.getElementById('filtrar_meta');

botao_filtrar_metas.onclick = async function () {
    const { value: result } = await Swal.fire({
        title: "Escolha um filtro de seu desejo",
        input: "select",
        inputOptions: {
            Infos: {
                date: "Data"
            },
            Prioridades: {
                red: "Alta",
                yellow: "Media",
                green: "Baixa",
            }
        },
        inputPlaceholder: "Seleciona o filtro",
        showCancelButton: true
    });
    if (result) {
        getMetas(User_name, result);
    }
};

// Módulos

const cards = document.querySelectorAll('.modulo_card');

cards.forEach(card => {
    card.addEventListener('click', function () {
        const texto_card = this.querySelector('h3').textContent;
        localStorage.setItem('Modulo', texto_card);
        window.location.href = "../Tela Modulos - Usuario Jovem/index.html";
    });
});

// Coletando dados perfil (GET)

let nome = document.getElementById('nome_user');
let email = document.getElementById('email_user');
let telefone = document.getElementById('telefone_user');
let cidade = document.getElementById('cidade_user');
let idade = document.getElementById('idade_user');

let guardar_idade_user = '';

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

    guardar_idade_user = `${ano_user}-${mes_user}-${dia_user}`;

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

getUserJovem(id_user);

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
    let idade_user = guardar_idade_user;

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

        lapis_idade.onclick = async function () {
            const { value: date } = await Swal.fire({
                title: "Selecione a sua data de nascimento",
                input: "date",
            });
            if (date) {

                let ano_user_alert = date.slice(0, 4);

                let mes_user_alert = date.slice(5, 7);

                let dia_user_alert = date.slice(8, 10);

                const data = new Date();
                const ano = data.getFullYear();
                const mes = data.getMonth() + 1;
                const dia = data.getDate();

                let userAge = ano - ano_user_alert;

                if (mes < mes_user_alert || (mes === mes_user_alert && dia < dia_user_alert)) {
                    userAge--;
                }

                idade.textContent = `${userAge} anos`;
                guardar_idade_user = `${ano_user_alert}-${mes_user_alert}-${dia_user_alert}`;
                idade_user = guardar_idade_user;
            }
        }

        localStorage.setItem('User_name_antigo', nome.textContent);

        editando = false;
    } else {

        putMetas(nome_user, localStorage.getItem('User_name_antigo'));
        getMetas(nome_user);

        localStorage.setItem('User_name', nome_user);

        botao_editar.textContent = 'Editar';

        iconesLapis.forEach(iconeLapis => {
            iconeLapis.style.display = 'none';
        });

        let data = { nome_user, email_user, telefone_user, cidade_user, idade_user };

        // PUT

        const response = await fetch(`http://localhost:3008/api/uptade/userJovem/${id_user}`, {
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