-- Script SQL de criação do banco de dados

-- Criação do banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- Acesso ao banco de dados
USE db_locadora_filme_ds2m_25_2;

-- CRIAÇÃO DE TABELAS
-- Criação da tabela genero cinematográfico
CREATE TABLE tbl_faixa_etaria (
  id_faixa_etaria INT PRIMARY KEY auto_increment NOT NULL,
  faixa DECIMAL(2,0) NOT NULL,
  descricao VARCHAR(100) NULL
);

-- Criação da tabela Filme
CREATE TABLE tbl_filme (
	id_filme INT PRIMARY KEY auto_increment NOT NULL,
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