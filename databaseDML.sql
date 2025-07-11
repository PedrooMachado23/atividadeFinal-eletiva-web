create database crudTS;

\c crudts

create table usuario(
    username varchar(30),
    password varchar(128) not null,
    nome varchar(120) not null,
    tipo varchar(1) not null,
    status varchar(1),
    quantAcesso int,

    constraint usuario_pkey primary key (username)
);

-- setting default values to facilitate inserts
alter table usuario
	alter column status set default 'A',
	alter column quantAcesso set default 0;

create table produto(
    id integer generated always as identity primary key,
    codigo varchar(6) unique not null,
    nome varchar(50) not null,
    descricao varchar(100) not null,
    quantidade int not null,
    preco double precision not null
);
