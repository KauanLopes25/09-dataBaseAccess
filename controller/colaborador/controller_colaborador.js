'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela manipulação de dados entre o APP e a Model
requisições e respostas para a tabela colaborador.
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
// Importação do arquivo model da tbl_colaborador
const colaboradorDAO = require('../../model/DAO/colaborador.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')
// Mostra todos os colaboradores do banco
async function listarColaborador() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de colaboradores do BD
        let resultColaboradores = await colaboradorDAO.getSelectAllcollaborators()
        if (resultColaboradores) {
            if (resultColaboradores.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.colaboradores = resultColaboradores

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

// Retorna um Colaborador correspondente pelo id
async function buscarColaboradorId(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != null && id > 0) {
            let resultColaboradores = await colaboradorDAO.getSelectByIdcollaborator(Number(id))

            if (resultColaboradores) {
                if (resultColaboradores.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.MESSAGES
                    MESSAGES.DEFAULT_HEADER.items.Colaborador = resultColaboradores

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
// Inseri um Colaborador
async function inserirColaborador(Colaborador, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosColaborador(Colaborador)

            if (!validar) {
                // Processamento
                // Chama a função para update um novo Colaborador no BD
                let resultColaborador = await colaboradorDAO.setInsertcollaborator(Colaborador)

                if (resultColaborador) {
                    let lastId = await colaboradorDAO.getSelectLastId()
                    if (lastId) {
                        Colaborador.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items = Colaborador
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
// Atualizar um Colaborador buscando pelo ID
async function atualizarColaborador(Colaborador, contentType, id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validação do ID válido
            let validar = await validarDadosColaborador(Colaborador)

            if (!validar) {

                // Validação do ID, se existe no BD
                let validarID = await buscarColaboradorId(id)

                if (validarID.status_code == 200) {
                    Colaborador.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um Colaborador no BD
                    let resultColaborador = await colaboradorDAO.setUpdatecollaborator(Colaborador)
                    if (resultColaborador) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.Colaborador = Colaborador
                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarColaboradorID poderá retornar (400 ou 404 ou 500)
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
// Exclui um Colaborador pelo ID
async function excluirColaborador(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarColaboradorId(id)
        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para deletar um Colaborador no BD
            let resultColaborador = await colaboradorDAO.setDeletecollaborator(id)

            if (resultColaborador) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETE_ITEM.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETE_ITEM.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETE_ITEM.message
                delete MESSAGES.DEFAULT_HEADER.items
                return MESSAGES.DEFAULT_HEADER // 204
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        } else {
            return validarID // A função buscarColaboradorID poderá retornar (400 ou 404 ou 500)
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

async function validarDadosColaborador(Colaborador, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (Colaborador.nome == '' || Colaborador.nome == undefined || Colaborador.nome == null || Colaborador.nome.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (Colaborador.data_nascimento == undefined || Colaborador.data_nascimento.length != 10) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Data de lançamento incorreta]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (Colaborador.id_genero_biologico == '' || Colaborador.id_genero_biologico == undefined || Colaborador.id_genero_biologico == null || Colaborador.id_genero_biologico.length > 12) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Orçamento incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (Colaborador.biografia == undefined || Colaborador.biografia.length > 200) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[biografia incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (Colaborador.foto == undefined || Colaborador.foto == null || Colaborador.foto.length > 200) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[foto incorreta]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else {
            return false
        }
    }
}

module.exports = {
    listarColaborador,
    buscarColaboradorId,
    inserirColaborador,
    atualizarColaborador,
    excluirColaborador
}