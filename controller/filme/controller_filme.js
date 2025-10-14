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
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')
// Mostra todos os filmes do banco
async function listarFilme() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        if (resultFilmes) {
            if (resultFilmes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.itens.filmes = resultFilmes

                return MESSAGES.DEFAULT_HEADER // 200
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// Retorna um filme correspondente pelo id
async function buscarFilmeId(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultFilmes = await filmeDAO.getSelectByIdMovie(Number(id))

            if (resultFilmes) {
                if (resultFilmes.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.MESSAGES
                    MESSAGES.DEFAULT_HEADER.itens.filme = resultFilmes

                    return MESSAGES.DEFAULT_HEADER // 200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Inseri um filme
async function inserirFilme(filme) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validações de todas as entradas de dados
            if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.sinopse != undefined) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Sinopse incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.length > 8) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Duração incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.trailer == undefined || filme.trailer.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Trailer incorreto]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else if (filme.capa == undefined || filme.capa == null || filme.capa.length > 200) {
                MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Capa incorreta]'
                return MESSAGES.ERROR_REQUIRED_FIELDS
            }
            else {
                // Processamento
                // Chama a função para inserir um novo filme no BD
                let resultfilme = await filmeDAO.setInsertMovie(filme)

                if (resultfilme) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message

                    return MESSAGES.DEFAULT_HEADER // 201
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}
// Atualizar um filme buscando pelo ID
async function atualizarFilme(filme, id) { }
// Exclui um filme pelo ID
async function excluirFilme(id) {

}

module.exports = {
    listarFilme,
    buscarFilmeId
}