// Infos usuário

let id_user = localStorage.getItem('ID_user');
let tipo_usuario = localStorage.getItem('Tipo_user');

// Buscando dados salvos no localstorage para buscar as infos da dúvida no BD

const id_duvida = Number(localStorage.getItem('id_duvida'));
const texto_duvida = localStorage.getItem('texto_duvida');

// Buscando as infos no BD

async function carregarInfosDuvida() {
    let data = { id_duvida, texto_duvida };

    // POST
    const response = await fetch("http://localhost:3008/api/carregarInfosDuvida", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();

    if (content.success) {
        let nome_usuario_jovem = document.getElementById('nome_usuario_jovem');
        let duvida_jovem = document.getElementById('duvida_jovem');

        nome_usuario_jovem.textContent = content.data[0].nome_user;
        duvida_jovem.textContent = content.data[0].duvida;
    } else {
        alert("Deu erro!!");
    }
}

carregarInfosDuvida();

// Carregando as respostas

async function carregarRespostas() {
    // POST
    const response = await fetch("http://localhost:3008/api/carregarRespostas", {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify({ id_duvida })
    });

    let content = await response.json();
    const bloco_respostas = document.querySelector('.bloco_respostas');

    if (content.success) {
        for (let i = 0; i < content.data.length; i++) {
            // Criando os elementos
            const section = document.createElement('section');
            section.className = 'respostas';

            const divRespostaUser = document.createElement('div');
            divRespostaUser.className = 'bloco_resposta_user';

            const divPerfil = document.createElement('div');
            divPerfil.className = 'bloco_resposta_perfil';

            const img = document.createElement('img');
            img.src = '../images/Usuario_nao_logado.png';
            img.alt = '';

            const h2 = document.createElement('h2');
            h2.className = 'bloco_resposta_nome_user';
            h2.textContent = 'Teste';

            if(content.data[i].id_jovem === null) {
                h2.textContent += ' - Usuário Empresa'
            }
            else if(content.data[i].id_empresa === null) {
                h2.textContent += ' - Usuário Jovem'
            }

            const p = document.createElement('p');
            p.textContent = content.data[i].resposta;

            // Estruturando os elementos
            divPerfil.appendChild(img);
            divPerfil.appendChild(h2);

            divRespostaUser.appendChild(divPerfil);
            divRespostaUser.appendChild(p);

            section.appendChild(divRespostaUser);

            // Adicionando a estrutura no body ou em outro elemento do DOM
            bloco_respostas.appendChild(section);
        }

    } else {
        alert("Deu erro!!");
    }
}

carregarRespostas();

// Respondendo a dúvida

document.getElementById('criar_resposta').onclick = async function () {
    Swal.fire({
        title: "Responda a dúvida!!",
        text: "Ajude com seu conhecimento!!",
        input: "textarea",
        inputPlaceholder: "Digite sua pergunta",
        inputAttributes: {
            maxlength: 200 // Limite de caracteres
        },
        customClass: {
            input: "alert_textarea" // Classe CSS personalizada para o textarea
        },
        showCancelButton: true,
        confirmButtonText: "Postar",
        confirmButtonColor: "#0e566a",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        inputValidator: (value) => {
            if (!value) {
                return "Por favor, digite algo!!";
            }
            if (value.length > 200) {
                // Verifica se o valor excede o limite
                return "A dúvida deve ter no máximo 200 caracteres!!";
            }
        },
    }).then((result) => {
        if (result.isConfirmed) {
            async function enviandoDuvida() {

                let resposta = result.value;

                let data = { id_user, id_duvida, resposta, tipo_usuario };

                // POST
                const response = await fetch("http://localhost:3008/api/responderDuvida", {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });

                let content = await response.json();
                console.log(content);

                if (content.success) {
                    Swal.fire({
                        title: "Resposta enviada com sucesso!!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }
                else {
                    Swal.fire({
                        title: "Erro ao enviar a resposta!!",
                        text: "Tente novamente!!",
                        icon: "error",
                        showConfirmButton: false,
                        timer: 2000
                    });
                }
            }

            enviandoDuvida();
        }
    });
};

// Botao para voltar para a página

document.getElementById('botao_voltar').onclick = function () {

    localStorage.removeItem('id_duvida');
    localStorage.removeItem('texto_duvida');

    if (tipo_usuario === 'Jovem') {
        window.location.href = '../Tela Dicas-Sugestoes/index.html';
    }
    else if (tipo_usuario === 'Empresa') {
        window.location.href = '../Tela Home - Usuario Empresa/index.html';

    }
    else {
        alert('ERROR!!');
    }
};