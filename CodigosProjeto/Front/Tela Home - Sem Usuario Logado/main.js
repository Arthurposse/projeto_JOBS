// Alert - Fazer cadastro

setTimeout(() => {
    Swal.fire({
        title: "Não realizou seu cadastro?",
        text: "Clique abaixo:",
        icon: "question",
        html: `
        <a href="../Tela Cadastro/Tela Cadastro - Verificando Tipo Usuario/index.html" style="text-decoration: none; color: #19a7ce;"> Cadastrar-se </a>`,
        confirmButtonColor: "#0e566a",
        confirmButtonText: "Fazer mais tarde"
    });
}, 4000);

// Direcionamento da página ao clicar em entrar no canto superior direito

const bloco_usuario = document.querySelector('.bloco_usuario');

bloco_usuario.onclick = function(){
    window.location.href = '../Tela LogIn/Tela Login - Entrando/index.html';
}