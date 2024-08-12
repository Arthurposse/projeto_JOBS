CREATE DATABASE jobs;

USE jobs;

CREATE TABLE user_jovem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    -- ft_perfil,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    data_nascimento DATE NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    cidade VARCHAR(30) NOT NULL
);

CREATE TABLE user_empresa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    -- ft_perfil,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    telefone VARCHAR(10) NOT NULL,
    nome_empresa VARCHAR(50) NOT NULL,
    cnpj VARCHAR(18) NOT NULL,
    razao_social VARCHAR(20) NOT NULL,
    setor_atividade VARCHAR(25) NOT NULL
);

-- Índices para que seja possível criar a tabela de vagas com suas chaves estrangeiras 
CREATE INDEX idx_user_empresa_name ON user_empresa(name);
CREATE INDEX idx_user_empresa_nome_empresa ON user_empresa(nome_empresa);

CREATE TABLE vagas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    criador_vaga VARCHAR(50),
    titulo_vaga VARCHAR(50) NOT NULL,
    nome_empresa VARCHAR(50),
    area VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    descricao text NOT NULL,

    FOREIGN KEY (criador_vaga) REFERENCES user_empresa(name),
    FOREIGN KEY (nome_empresa) REFERENCES user_empresa(nome_empresa)
);

CREATE TABLE duvidas(
	id_user INT NOT NULL,
    id_duvida INT PRIMARY KEY AUTO_INCREMENT,
    duvida TEXT NOT NULL
);

CREATE TABLE respostas(
    id_user INT NOT NULL,
	id_duvida INT,
    resposta TEXT NOT NULL,
    type_user VARCHAR(7) NOT NULL CHECK (type_user IN ('Jovem', 'Empresa')),

    FOREIGN KEY (id_duvida) REFERENCES duvidas(id_duvida)
);

-- Índice para que seja possível criar a tabela de metas com sua chave estrangeira
CREATE INDEX idx_user_jovem_metas ON user_jovem(name);

CREATE TABLE metas(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(50) NOT NULL,
    titulo VARCHAR(20) NOT NULL,
    infos text NOT NULL,
    data_conclusao date NOT NULL, 
    prioridade ENUM('red', 'yellow', 'green'),

    FOREIGN KEY (user_name) REFERENCES user_jovem(name)
);

CREATE TABLE questoes_modulos(
	id INT PRIMARY KEY AUTO_INCREMENT,
    tipo_modulo ENUM('email', 'entrevista', 'trabalho_equipe', 'res_problema'),
    pergunta VARCHAR(255) NOT NULL,
    questao_1 VARCHAR(255) NOT NULL,
    questao_2 VARCHAR(255) NOT NULL,
    questao_3 VARCHAR(255) NOT NULL,
	res_correta VARCHAR(30) NOT NULL,
    explicacao text NOT NULL
);

-- Perguntas e Respostas das questões dos módulos

INSERT INTO questoes_modulos(tipo_modulo, pergunta, questao_1, questao_2, questao_3, res_correta, explicacao) 
VALUES 
(
    "email",
    "Qual é a melhor prática ao incluir anexos em um e-mail no ambiente de trabalho?",
    "A) Não mencionar os anexos, para surpreender o destinatário.",
    "B) Enviar os anexos em um e-mail separado.",
    "C) Mencionar claramente os anexos e verificar se estão corretos.",
    "C",
    ""
),
(
    "email",
    "Qual é a importância de manter um tom profissional ao redigir um e-mail no ambiente de trabalho?",
    "A) Não é importante, desde que a mensagem seja clara.",
    "B) Um tom profissional ajuda a transmitir respeito e credibilidade.",
    "C) Um tom informal é sempre mais bem recebido pelos destinatários.",
    "B",
    "Manter um tom profissional ao redigir um e-mail no ambiente de trabalho é fundamental por diversas razões. Primeiramente, um tom profissional ajuda a transmitir respeito e credibilidade aos destinatários. Isso é crucial para estabelecer e manter relações profissionais saudáveis, tanto dentro da própria organização quanto com clientes, parceiros e outras partes interessadas. Além disso, um e-mail profissional reflete a imagem da empresa, contribuindo para a construção de uma reputação sólida e confiável. Por último, mas não menos importante, a manutenção de um tom profissional pode ajudar a evitar mal-entendidos e conflitos, garantindo uma comunicação clara e eficaz. Em resumo, o uso de um tom profissional é essencial para criar e manter um ambiente de trabalho respeitoso, eficiente e profissional."
);

-- TESTE - Inserindo valores fictícios

-- User Jovem

INSERT INTO user_jovem(name, email, password, data_nascimento, telefone, cidade) 
VALUES
(
    "Arthur de Souza Possebon",
    "aspossebon@gmail.com",
    "1234",
    "2006-12-03",
    "519999999",
    "Sapucaia do Sul"
);

-- User Empresa

INSERT INTO user_empresa(name, email, password, telefone, nome_empresa, cnpj, razao_social, setor_atividade)
VALUES 
(
    'Robson Silverado JR',
    'robs@hotmail.com',
    '123',
    '519999999',
    'SKA',
    '01.123.456/7891-23',
    '',
    ''
);