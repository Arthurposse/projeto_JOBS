let codigoVerif = localStorage.getItem('CodVerif');
// localStorage.removeItem('CodVerif');

const botao = document.querySelector('button');

botao.onclick = function(){
    const cod_verif = document.getElementById('cod_verif').value;
    
    if(codigoVerif === cod_verif) {
        console.log("Sucesso!!")

        localStorage.removeItem('CodVerif');

        window.location.href = '../../Tela LogIn/Tela Login - Entrando/index.html';
    }
    else {
        console.log("Código errado!!")
    }
}