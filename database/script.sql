-- Script SQL de criação do banco de dados

create table tbl_filme (
	filme_id int primary key auto_increment not null,
	nome varchar(100) not null,
	sinopse text null,
	data_lancamento date null,
	duracao time not null,
	orcamento decimal(11,2) not null,
	trailer varchar(200) null,
	capa varchar(200) not null
	
);
-- INSERINDO DADOS
-- Hobbit 1
insert into tbl_filme 
(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values (
  'O Hobbit: Uma Jornada Inesperada',
  'Bilbo Bolseiro é levado de sua pacata vida no Condado por Gandalf e um grupo de anões para ajudar a reconquistar o reino de Erebor, tomado pelo dragão Smaug.',
  '2012-12-14',
  '02:49:00',
  180000000.00,
  'https://www.youtube.com/watch?v=SDnYMbYB-nU',
  'http://www.impawards.com/2012/posters/hobbit_an_unexpected_journey_ver33.jpg'
  );

-- Hobbit 2
  insert into tbl_filme 
(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
values (
  'O Hobbit: A Desolação de Smaug',
  'Bilbo, Gandalf e os anões continuam sua jornada rumo à Montanha Solitária para enfrentar o dragão Smaug e recuperar o reino de Erebor.',
  '2013-12-13',
  '02:41:00',
  225000000.00,
  'https://www.youtube.com/watch?v=OPVWy1tFXuc',
  'http://www.impawards.com/2013/posters/hobbit_the_desolation_of_smaug_ver30_xlg.jpg'
  );

-- Hobbit 3
  insert into tbl_filme (
nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa
)values(
'O Hobbit: A Batalha dos Cinco Exércitos', 
'Em O Hobbit: A Batalha dos Cinco Exércitos, após ser expulso da montanha de Erebor, o dragão Smaug ataca com fúria a cidade dos homens que fica próxima ao local. Após muita destruição, Bard (Luke Evans) consegue derrotá-lo. Não demora muito para que a queda de Smaug se espalhe, atraindo os mais variados interessados nas riquezas que existem dentro de Erebor. Entretanto, Thorin (Richard Armitage) está disposto a tudo para impedir a entrada de elfos, anões e orcs, ainda mais por ser tomado por uma obsessão crescente pela riqueza à sua volta. Paralelamente a estes eventos, Bilbo Bolseiro (Martin Freeman) e Gandalf (Ian McKellen) tentam impedir a guerra.',
'2014-12-11',
'02:24:00',
250000000.00,
'https://www.youtube.com/watch?v=iVAgTiBrrDA',
'http://www.impawards.com/2014/posters/hobbit_the_battle_of_the_five_armies_xlg.jpg'
);