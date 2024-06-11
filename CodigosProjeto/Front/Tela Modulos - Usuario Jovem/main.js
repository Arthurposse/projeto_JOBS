const tipo_modulo_escolhido = localStorage.getItem('Modulo');
let buscar = null;

if(tipo_modulo_escolhido === 'Enviar email') {
    buscar = 'email';
}
else if(tipo_modulo_escolhido === 'Realizando entrevista') {
    buscar = 'entrevista';
}
else if(tipo_modulo_escolhido === 'Trabalho em equipe') {
    buscar = 'trabalho_equipe';
}
else if(tipo_modulo_escolhido === 'Resolução de problemas') {
    buscar = 'res_problema';
}

// GET Perguntas e Respostas

const botao_concluir = document.querySelector('button');

botao_concluir.onclick = function(){
    
};