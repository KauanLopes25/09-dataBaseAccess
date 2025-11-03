-- Script SQL de criação do banco de dados

-- Criação do banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- Acesso ao banco de dados
USE db_locadora_filme_ds2m_25_2;

-- CRIAÇÃO DE TABELAS
-- Criação da tabela genero cinematográfico
CREATE TABLE tbl_faixa_etaria (
  id_faixa_etaria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  faixa DECIMAL(2,0) NOT NULL,
  descricao VARCHAR(100) NULL
);

-- Criação da tabela Filme
CREATE TABLE tbl_filme (
	id_filme INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT NULL,
	data_lancamento DATE NULL,
	duracao TIME NOT NULL,
	orcamento DECIMAL(11,2) NOT NULL,
	trailer VARCHAR(200) NULL,
	capa VARCHAR(200) NOT NULL,
  id_faixa_etaria INT NOT NULL,
  CONSTRAINT fk_faixa_etaria FOREIGN KEY (id_faixa_etaria) REFERENCES tbl_faixa_etaria(id_faixa_etaria)
);

-- Criação da tabela Genero Cinematografico
CREATE TABLE tbl_genero_cinematografico (
  id_genero_cinematografico INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(30) NOT NULL
);

-- Criação da tabela Genero Cinematografico do filme
CREATE TABLE tbl_genero_cinematografico_filme (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_genero_cinematografico INT NOT NULL,
  id_filme INT NOT NULL,
  CONSTRAINT fk_genero_cinematografico FOREIGN KEY(id_genero_cinematografico) REFERENCES tbl_genero_cinematografico(id_genero_cinematografico),
  CONSTRAINT fk_filme FOREIGN KEY(id_filme) REFERENCES tbl_filme(id_filme)
);

-- Criação da tabela Nacionalidade
CREATE TABLE tbl_nacionalidade (
  id_nacionalidade INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  sigla VARCHAR(3) NOT NULL
);

-- Criação da tabela Função
CREATE TABLE tbl_funcao (
  id_funcao INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(50) NOT NULL,
  descricao VARCHAR(50) NOT NULL
);

-- Criação da tabela Genero Biologico
CREATE TABLE tbl_genero_biologico (
  id_genero_biologico INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(20) NOT NULL
);

-- Criação da tabela Colaborador
CREATE TABLE tbl_colaborador (
  id_colaborador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nome VARCHAR(100) NOT NULL,
  data_nascimento DATE NOT NULL,
  foto VARCHAR(200) NULL,
  biografia TEXT NULL,
  id_genero_biologico INT NOT NULL,
  CONSTRAINT fk_genero_biologico FOREIGN KEY(id_genero_biologico) REFERENCES tbl_genero_biologico(id_genero_biologico)
);
 -- Criação da tabela Colaborador filme
 CREATE TABLE tbl_colaborador_filme (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_colaborador INT NOT NULL,
  id_filme INT NOT NULL,
  custo DECIMAL(11,2) NOT NULL,
  CONSTRAINT fk_colaborador FOREIGN KEY(id_colaborador) REFERENCES tbl_colaborador(id_colaborador),
  CONSTRAINT fk_filme_colaborador FOREIGN KEY(id_filme) REFERENCES tbl_filme(id_filme)
 );

 -- Criação da tabela Funcao Colaborador
 CREATE TABLE tbl_funcao_colaborador (
  id_funcao_colaborador INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_funcao INT NOT NULL,
  id_colaborador INT NOT NULL,
  CONSTRAINT fk_funcao FOREIGN KEY(id_funcao) REFERENCES tbl_funcao(id_funcao),
  CONSTRAINT fk_colaborador_funcao FOREIGN KEY(id_colaborador) REFERENCES tbl_colaborador(id_colaborador)
 );

 -- Criação da tabela Nacionalidade Colaborador
 CREATE TABLE tbl_nacionalidade_colaborador (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  id_nacionalidade INT NOT NULL,
  id_colaborador INT NOT NULL,
  CONSTRAINT fk_nacionalidade FOREIGN KEY(id_nacionalidade) REFERENCES tbl_nacionalidade(id_nacionalidade),
  CONSTRAINT fk_colaborador_nacionalidade FOREIGN KEY(id_colaborador) REFERENCES tbl_colaborador(id_colaborador)
 );
