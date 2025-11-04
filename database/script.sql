-- Script SQL de criação do banco de dados

-- Criação do banco de dados
CREATE DATABASE db_locadora_filme_ds2m_25_2;

-- Acesso ao banco de dados
USE db_locadora_filme_ds2m_25_2;

-- CRIAÇÃO DE TABELAS
-- Criação da tabela genero cinematográfico
CREATE TABLE tbl_faixa_etaria (
  id_faixa_etaria INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  faixa VARCHAR(3) NOT NULL,
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


----------------------------------------- INSERINDO DADOS ------------------------------------------- 
-- Insert na tabela faixa etaria
INSERT INTO tbl_faixa_etaria (faixa, descricao) VALUES
('L',  'Livre para todos os públicos'),
('10', 'Não recomendado para menores de 10 anos'),
('12', 'Não recomendado para menores de 12 anos'),
('14', 'Não recomendado para menores de 14 anos'),
('16', 'Não recomendado para menores de 16 anos'),
('18', 'Não recomendado para menores de 18 anos');

-- Insert na tabela genero cinematografico
INSERT INTO tbl_genero_cinematografico (nome) VALUES
('Ação'),
('Aventura'),
('Comédia'),
('Drama'),
('Terror'),
('Ficção Científica'),
('Romance'),
('Animação'),
('Documentário'),
('Suspense'),
('Fantasia'),
('Musical'),
('Guerra'),
('Mistério'),
('Policial');

-- Insert na tabela genero biologico
INSERT INTO tbl_genero_biologico (nome) VALUES
('Masculino'),
('Feminino'),
('Não Binário'),
('Prefere não informar'),
('Outro');

-- Insert na tabela colaborador
INSERT INTO tbl_colaborador (nome, data_nascimento, foto, biografia, id_genero_biologico) VALUES
('Lucas Andrade', '1985-07-12', 'fotos/lucas_andrade.jpg', 'Ator brasileiro conhecido por papéis em filmes de ação e aventura.', 1),
('Mariana Costa', '1990-03-22', 'fotos/mariana_costa.jpg', 'Atriz premiada por atuações em dramas e comédias românticas.', 2),
('Rafael Torres', '1978-11-02', 'fotos/rafael_torres.jpg', 'Ator versátil com carreira internacional em produções de suspense.', 1),
('Camila Duarte', '1988-05-16', 'fotos/camila_duarte.jpg', 'Atriz reconhecida por papéis em filmes independentes e fantasia.', 2),
('Henrique Lopes', '1992-01-09', 'fotos/henrique_lopes.jpg', 'Ator jovem destaque em produções de ficção científica.', 1),
('João Menezes', '1970-09-30', 'fotos/joao_menezes.jpg', 'Diretor renomado, especializado em filmes de ação e suspense.', 1),
('Ana Ribeiro', '1982-04-14', 'fotos/ana_ribeiro.jpg', 'Diretora premiada por produções de drama e documentário.', 2),
('Ricardo Freitas', '1975-02-18', 'fotos/ricardo_freitas.jpg', 'Cineasta com destaque em produções de ficção científica.', 1),
('Beatriz Nogueira', '1986-12-25', 'fotos/beatriz_nogueira.jpg', 'Diretora reconhecida por filmes de fantasia e aventura.', 2),
('Felipe Martins', '1968-06-10', 'fotos/felipe_martins.jpg', 'Diretor experiente, com carreira em thrillers e dramas sociais.', 1);
