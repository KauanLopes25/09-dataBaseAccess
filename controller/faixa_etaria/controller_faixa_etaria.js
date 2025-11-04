'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela faixaEtaria.
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
// Importação do arquivo model da tbl_faixa_etaria
const faixaEtariaDAO = require('../../model/DAO/faixa_etaria.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')
// Mostra todos os faixaEtarias do banco
async function listarFaixaEtaria() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de faixaEtarias do BD
        let resultfaixaEtarias = await faixaEtariaDAO.getSelectAllAgeGroups()
        if (resultfaixaEtarias) {
            if (resultfaixaEtarias.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.faixaEtarias = resultfaixaEtarias

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

// Retorna um faixa etaria correspondente pelo id
async function buscarFaixaEtariaId(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultfaixaEtarias = await faixaEtariaDAO.getSelectByIdAgeGroup(Number(id))

            if (resultfaixaEtarias) {
                if (resultfaixaEtarias.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.MESSAGES
                    MESSAGES.DEFAULT_HEADER.items.faixaEtaria = resultfaixaEtarias

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
// Inseri um faixaEtaria
async function inserirFaixaEtaria(faixaEtaria, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosfaixaEtaria(faixaEtaria)

            if (!validar) {
                // Processamento
                // Chama a função para update um novo faixaEtaria no BD
                let resultfaixaEtaria = await faixaEtariaDAO.setInsertAgeGroup(faixaEtaria)

                if (resultfaixaEtaria) {
                    let lastId = await faixaEtariaDAO.getSelectLastId()
                    if (lastId) {
                        faixaEtaria.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = faixaEtaria
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
// Atualizar um faixaEtaria buscando pelo ID
async function atualizarFaixaEtaria(faixaEtaria, contentType, id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validação do ID válido
            let validar = await validarDadosfaixaEtaria(faixaEtaria)

            if (!validar) {

                // Validação do ID, se existe no BD
                let validarID = await buscarFaixaEtariaId(id)

                if (validarID.status_code == 200) {
                    faixaEtaria.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um faixaEtaria no BD
                    let resultfaixaEtaria = await faixaEtariaDAO.setUpdateAgeGroup(faixaEtaria)
                    if (resultfaixaEtaria) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.faixaEtaria = faixaEtaria
                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarFaixaEtariaId poderá retornar (400 ou 404 ou 500)
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
// Exclui um faixaEtaria pelo ID
async function excluirFaixaEtaria(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarFaixaEtariaId(id)
        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para deletar um faixaEtaria no BD
            let resultfaixaEtaria = await faixaEtariaDAO.setDeleteAgeGroup(id)

            if (resultfaixaEtaria) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarFaixaEtariaId poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function validarDadosfaixaEtaria(faixaEtaria, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (faixaEtaria.faixa == '' || faixaEtaria.faixa == undefined || faixaEtaria.faixa == null || faixaEtaria.faixa.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[faixa incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (faixaEtaria.descricao == undefined) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[descricao incorreta]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        
        else {
            return false
        }
    }
}

module.exports = {
    listarFaixaEtaria,
    buscarFaixaEtariaId,
    inserirFaixaEtaria,
    atualizarFaixaEtaria,
    excluirFaixaEtaria
}