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
    setor_atividade VARCHAR(50) NOT NULL
);

-- Índices para que seja possível criar a tabela de vagas com suas chaves estrangeiras 
CREATE INDEX idx_user_empresa_name ON user_empresa(name);

CREATE TABLE vagas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    criador_vaga VARCHAR(50),
    titulo_vaga VARCHAR(50) NOT NULL,
    area VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    faixa_etaria ENUM('16-18', '19-21', '22-24', '25-27', '28-30') NOT NULL,
    descricao text NOT NULL,

    FOREIGN KEY (criador_vaga) REFERENCES user_empresa(name) ON UPDATE CASCADE
);

CREATE TABLE duvidas(
    id_duvida INT PRIMARY KEY AUTO_INCREMENT,
	id_user INT NOT NULL,
    duvida TEXT NOT NULL
);

CREATE TABLE respostas(
    id_jovem INT,
    id_empresa INT,
	id_duvida INT,
    resposta TEXT NOT NULL,
    type_user VARCHAR(7) NOT NULL CHECK (type_user IN ('Jovem', 'Empresa')),

    FOREIGN KEY (id_jovem) REFERENCES user_jovem(id),
    FOREIGN KEY (id_empresa) REFERENCES user_empresa(id),
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
    prioridade ENUM('red', 'yellow', 'green') NOT NULL,

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
    explicacao TEXT NOT NULL
);

-- Perguntas e Respostas das questões dos módulos

INSERT INTO questoes_modulos(tipo_modulo, pergunta, questao_1, questao_2, questao_3, res_correta, explicacao) 
VALUES 
(
    "email",
    "Ao enviar um e-mail profissional, o que é mais importante ao definir o assunto da mensagem?",
    "A) Ser direto e específico.",
    "B) Usar frases longas e detalhadas.",
    "C) Não incluir um assunto.",
    "A",
    "O assunto de um e-mail profissional deve ser direto e específico, para que o destinatário entenda rapidamente o propósito da mensagem. Frases longas ou a ausência de um assunto podem confundir ou desmotivar o destinatário a abrir o e-mail."
),
(
    "email",
    "Qual é a importância de manter um tom profissional ao redigir um e-mail no ambiente de trabalho?",
    "A) Não é importante, desde que a mensagem seja clara.",
    "B) Um tom profissional ajuda a transmitir respeito e credibilidade.",
    "C) Um tom informal é sempre mais bem recebido pelos destinatários.",
    "B",
    "Manter um tom profissional ao redigir um e-mail no ambiente de trabalho é crucial porque transmite respeito e credibilidade. Isso demonstra seriedade e atenção à formalidade, essenciais para construir relações profissionais sólidas. O uso de um tom informal pode ser inadequado e comprometer a percepção de profissionalismo."
),
(
    "entrevista",
    "Durante uma entrevista, qual é a melhor forma de responder a perguntas sobre seus pontos fracos?",
    "A) Negar que você tem pontos fracos.",
    "B) Admitir um ponto fraco e explicar como você está melhorando.",
    "C) Focar apenas em pontos fortes.",
    "B",
    "Admitir um ponto fraco e explicar como você está trabalhando para melhorá-lo mostra autoconhecimento e disposição para crescer. Negar fraquezas ou focar apenas em pontos fortes pode soar como falta de transparência."
),
(
    "entrevista",
    "O que é importante ao fazer perguntas para o entrevistador?",
    "A) Evitar fazer perguntas.",
    "B) Perguntar sobre aumento de salário logo no início.",
    "C) Fazer perguntas sobre a empresa e o cargo.",
    "C",
    "Fazer perguntas sobre a empresa e o cargo demonstra interesse e preparação. Evitar perguntas ou focar em salário desde o início pode parecer desinteresse ou falta de foco nos aspectos essenciais do trabalho."
),
(
    "trabalho_equipe",
    "Qual é a atitude mais importante ao trabalhar em equipe?",
    "A) Colaborar e ajudar os colegas para alcançar objetivos comuns.",
    "B) Fazer apenas o seu trabalho e ignorar os outros.",
    "C) Comprometer-se apenas com suas tarefas pessoais.",
    "A",
    "Colaborar e ajudar os colegas promove um ambiente de cooperação e sucesso coletivo. Focar apenas no próprio trabalho ignora o espírito de equipe, essencial para resultados positivos."
),
(
    "trabalho_equipe",
    "Como lidar com conflitos em uma equipe?",
    "A) Culpar os colegas pelo problema.",
    "B) Ignorar o conflito e seguir em frente.",
    "C) Abordar o conflito de forma construtiva e buscar uma solução.",
    "C",
    "Abordar conflitos de forma construtiva é crucial para manter a harmonia e a produtividade na equipe. Ignorar ou culpar outros pode agravar o problema e prejudicar o desempenho do grupo."
),
(
    "res_problema",
    "Qual é o primeiro passo na resolução de um problema no trabalho?",
    "A) Identificar e definir claramente o problema.",
    "B) Procurar culpados antes de resolver.",
    "C) Tomar uma decisão rápida sem muita reflexão.",
    "A",
    "Identificar e definir claramente o problema é o primeiro passo para encontrar uma solução eficaz. Decisões precipitadas ou culpar outros sem entender o problema podem agravar a situação."
),
(
    "res_problema",
    "O que fazer se uma solução inicialmente adotada não funcionar?",
    "A) Avaliar outras alternativas e ajustar a abordagem.",
    "B) Insistir na solução até que funcione.",
    "C) Desistir do problema.",
    "A",
    "Avaliar outras alternativas e ajustar a abordagem é essencial quando uma solução não funciona. Insistir sem resultados ou desistir do problema não resolve a questão."
);

-- TESTE - Inserindo valores fictícios

-- User Jovem

INSERT INTO user_jovem(name, email, password, data_nascimento, telefone, cidade) 
VALUES
(
    "Arthur de Souza Possebon",
    "aspossebon@gmail.com",
    "123",
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
    'teste'
);

-- Inserindo vagas fictícias

INSERT INTO vagas(criador_vaga, titulo_vaga, area, cidade, faixa_etaria, descricao)
VALUES
(
    'Robson Silverado JR',
    'Engenheiro de Software Junior',
    'Engenharia de Software',
    'São Paulo',
    '19-21',
    'TESTE DESCRIÇÃO'
),
(
    'Robson Silverado JR',
    'Jovem Aprendiz',
    'Aprendiz',
    'Sapucaia do Sul',
    '16-18',
    'TESTE DESCRIÇÃO 2'
);