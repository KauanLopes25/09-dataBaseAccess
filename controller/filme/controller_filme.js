'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela Filme.
* Autor: Kauan Lopes Pereira
* Data: 07/10/2025
* Versão: 1.0.10.25
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************

************************************** OBSERVAÇÕES ******************************************

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/
// Importação do arquivo model da tbl_filme
const filmeDAO = require('../../model/DAO/filme.js')
// Mostra todos os filmes do banco
async function listarFilme(){}
// Retorna um filme correspondente pelo id
async function buscarFilmeId(id){}
// Inseri um filme
async function inserirFilme(filme) {}
// Atualizar um filme buscando pelo ID
async function atualizarFilme(filme, id) {}
// Exclui um filme pelo ID
async function excluirFilme(id) {
    
}