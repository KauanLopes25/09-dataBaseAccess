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
const MESSAGES = require('../modulo/config_messages.js')
// Mostra todos os filmes do banco
async function listarFilme() {
    // Chama a função do DAO para retornar a lista de filmes do BD
    let resultFilmes = await filmeDAO.getSelectAllMovies()
    

    if (resultFilmes.length > 0) {
        MESSAGES.MESSAGE_HEADER.status = MESSAGES.MESSAGE_REQUEST_SUCCESS.status
        MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code
        MESSAGES.MESSAGE_HEADER.itens.filmes = resultFilmes

        return MESSAGES.MESSAGE_HEADER
    } else {
        MESSAGES
    }
}
// Retorna um filme correspondente pelo id
async function buscarFilmeId(id) { }
// Inseri um filme
async function inserirFilme(filme) { }
// Atualizar um filme buscando pelo ID
async function atualizarFilme(filme, id) { }
// Exclui um filme pelo ID
async function excluirFilme(id) {

}

module.exports = {
    listarFilme
}