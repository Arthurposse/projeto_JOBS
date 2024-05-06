create database jobs;

use jobs;

create table user_jovem(
	id INT PRIMARY KEY AUTO_INCREMENT,
    ft_perfil JSON,
    data_nascimento DATE NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    telefone VARCHAR(11) NOT NULL,
    cidade VARCHAR(30) NOT NULL
);

create table user_empresa(
	id INT PRIMARY KEY AUTO_INCREMENT,
    ft_perfil JSON,
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