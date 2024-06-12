create database jobs;

use jobs;

create table user_jovem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    -- ft_perfil JSON,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    cidade VARCHAR(30) NOT NULL
);

create table user_empresa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    -- ft_perfil JSON,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    telefone VARCHAR(10) NOT NULL,
    cidade VARCHAR(30) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    razao_social VARCHAR(20) NOT NULL,
    setor_atividade VARCHAR(25) NOT NULL
);

create table duvidas(
	id_user INT NOT NULL,
    id_duvida INT PRIMARY KEY AUTO_INCREMENT,
    duvida TEXT NOT NULL
);

create table respostas(
    id_user INT NOT NULL,
	id_duvida INT,
    resposta TEXT NOT NULL,
    type_user VARCHAR(7) NOT NULL CHECK (type_user IN ('Jovem', 'Empresa')),

    FOREIGN KEY (id_duvida) REFERENCES duvidas(id_duvida)
);

create table metas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    infos text NOT NULL,
    data_conclusao date NOT NULL, 
    prioridade ENUM('red', 'yellow', 'green')
);

create table questoes_modulos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_modulo ENUM('email', 'entrevista', 'trabalho_equipe', 'res_problema'),
    pergunta VARCHAR(255) NOT NULL,
    questao_1 VARCHAR(255) NOT NULL,
    questao_2 VARCHAR(255) NOT NULL,
    questao_3 VARCHAR(255) NOT NULL,
	res_correta VARCHAR(30) NOT NULL
);

-- Perguntas e Respostas das questões dos módulos

INSERT INTO questoes_modulos(tipo_modulo, pergunta, questao_1, questao_2, questao_3, res_correta) VALUES ("email", "Qual é a melhor prática ao incluir anexos em um e-mail no ambiente de trabalho?", "A) Não mencionar os anexos, para surpreender o destinatário.", "B) Enviar os anexos em um e-mail separado.", "C) Mencionar claramente os anexos e verificar se estão corretos.", "C"), ("email", "Qual é a importância de manter um tom profissional ao redigir um e-mail no ambiente de trabalho?", "A) Não é importante, desde que a mensagem seja clara.", "B) Um tom profissional ajuda a transmitir respeito e credibilidade.", "C) Um tom informal é sempre mais bem recebido pelos destinatários.", "B");

-- TESTE - Inserindo valores fictícios

INSERT INTO user_jovem(name, email, password, data_nascimento, telefone, cidade) VALUES ("Arthur de Souza Possebon", "aspossebon@gmail.com", "1234", "2006-12-03", "51996065708", "Sapucaia do Sul");