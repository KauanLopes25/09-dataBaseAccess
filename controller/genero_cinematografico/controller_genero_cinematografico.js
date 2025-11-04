'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela generos dos filmes.
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
// Importação do arquivo model da tbl_genero_cinematografico
const generoCinematograficoDAO = require('../../model/DAO/genero_cinematografico.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')
// Mostra todos os generos cinematograficos do banco
async function listarGeneroCinematografico() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de generos cinematograficos do BD
        let resultGenerosCinematografico = await generoCinematograficoDAO.getSelectAllMovieGenders()
        if (resultGenerosCinematografico) {
            if (resultGenerosCinematografico.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.GenerosCinematografico = resultGenerosCinematografico

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

// Retorna um genero cinematografico correspondente pelo id
async function buscarGeneroCinematograficoId(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultGenerosCinematografico = await generoCinematograficoDAO.getSelectByIdMovieGender(Number(id))

            if (resultGenerosCinematografico) {
                if (resultGenerosCinematografico.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.MESSAGES
                    MESSAGES.DEFAULT_HEADER.items.GenerosCinematografico = resultGenerosCinematografico

                    return MESSAGES.DEFAULT_HEADER // 200

                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }

            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[ID inválido]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Inseri um genero cinematografico
async function inserirGeneroCinematografico(generoCinematografico, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosGeneroCinematografico(generoCinematografico)

            if (!validar) {
                // Processamento
                // Chama a função para inserção de um novo genero cinematografico no BD
                let resultGenerosCinematografico = await generoCinematograficoDAO.setInsertMovieGender(generoCinematografico)

                if (resultGenerosCinematografico) {
                    let lastId = await generoCinematograficoDAO.getSelectLastId()
                    if (lastId) {
                        generoCinematografico.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = generoCinematografico
                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }

        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}
// Atualizar um genero cinematografico buscando pelo ID
async function atualizarGeneroCinematografico(generoCinematografico, contentType, id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validação do ID válido
            let validar = await validarDadosGeneroCinematografico(generoCinematografico)

            if (!validar) {

                // Validação do ID, se existe no BD
                let validarID = await buscarGeneroCinematograficoId(id)

                if (validarID.status_code == 200) {
                    generoCinematografico.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um genero cinematografico no BD
                    let resultgeneroCinematografico = await generoCinematograficoDAO.setUpdateMovieGender(generoCinematografico)
                    if (resultgeneroCinematografico) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.generoCinematografico = generoCinematografico
                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarGeneroCinematograficoID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Exclui um filme pelo ID
async function excluirGeneroCinematografico(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarGeneroCinematograficoId(id)
        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para deletar um filme no BD
            let resultgeneroCinematografico = await generoCinematograficoDAO.setDeleteMovieGender(id)

            if (resultgeneroCinematografico) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function validarDadosGeneroCinematografico(generoCinematografico, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (generoCinematografico.nome == '' || generoCinematografico.nome == undefined || generoCinematografico.nome == null || generoCinematografico.nome.length > 30) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    listarGeneroCinematografico,
    buscarGeneroCinematograficoId,
    inserirGeneroCinematografico,
    atualizarGeneroCinematografico,
    excluirGeneroCinematografico
}