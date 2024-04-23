create table user_jovem(
	id int auto_increment primary key,
    idade decimal(2) not null,
    email varchar(50) unique not null,
    senha varchar(50) not null,
    telefone varchar(10) not null,
    cidade varchar(30) not null
);

create table user_empresa(
	id int auto_increment primary key,
    email varchar(50) unique not null,
    senha varchar(50) not null,
    telefone varchar(10) not null,
    cidade varchar(30) not null,
    cnpj varchar(14) not null,
    razao_social varchar(20) not null,
    setor varchar(25) not null
);

create table duvidas(
	id_user int primary key,
    id_duvida decimal primary key,
    duvida text not null
);

create table respostas(
	id_duvida decimal primary key,
    resposta text not null
);