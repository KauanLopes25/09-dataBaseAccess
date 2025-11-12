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
const controllerFilmeGenero = require("./controller_filme_genero.js")
// Mostra todos os filmes do banco
async function listarFilme() {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()
        if (resultFilmes) {
            if (resultFilmes.length > 0) {

                //Processamento para adicionar generos aos filmes

                for (filme of resultFilmes) {
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id_filme)
                    if (resultGeneros.status_code == 200) {
                        filme.genero = resultGeneros.items.filme_genero
                    }
                }

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.message
                MESSAGES.DEFAULT_HEADER.items.filmes = resultFilmes

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
                    //Processamento para adicionar generos aos filmes

                    for (filme of resultFilmes) {
                        let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id_filme)
                        if (resultGeneros.status_code == 200) {
                            filme.genero = resultGeneros.items.filme_genero
                        }
                    }
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_REQUEST.MESSAGES
                    MESSAGES.DEFAULT_HEADER.items.filme = resultFilmes

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
// Inseri um filme
async function inserirFilme(filme, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validar = await validarDadosFilme(filme)

            if (!validar) {
                // Processamento
                // Chama a função para update um novo filme no BD
                let resultfilme = await filmeDAO.setInsertMovie(filme)

                if (resultfilme) {
                    let lastId = await filmeDAO.getSelectLastId()
                    if (lastId) {
                        //500
                        // Ainda acho que poderia ter uma tratativa melhor para isso
                        //
                        // - Se caiu nesse cenário o insert funcionou, ele só não conseguiu
                        //   retornar o id para o usuário, tinha que ser uma mensagem diferente
                        //   Ou... Deletar o ultimo registro para o usuário cadastrar de novo?

                        // Processar a inserção dos dados na tabela de relação entre filme e genero
                        for (genero of filme.genero) {
                            // filme.genero.forEach(async function (genero) {
                            let filmeGenero = { id_filme: lastId, id_genero_cinematografico: genero.id_genero_cinematografico }

                            let resultsFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                            if (resultsFilmeGenero.status_code != 201) {
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500 Problema com a tabela relacional
                            }
                        }

                        // Adicionando o id do filme no JSON
                        filme.id = lastId
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATED_ITEM.status;
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATED_ITEM.status_code;
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATED_ITEM.message;

                        // Apaga o atributo genero apenas com os ids que foram enviados no post
                        delete filme.genero

                        // Pesquisa no BD 
                        let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(lastId)
                        // Cria novamente o atributo genero e coloca o resultado do BD com os generos
                        filme.genero = resultDadosGeneros

                        MESSAGES.DEFAULT_HEADER.items = filme
                        return MESSAGES.DEFAULT_HEADER //201

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
            return MESSAGES.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Atualizar um filme buscando pelo ID
async function atualizarFilme(filme, contentType, id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        // Validação do tipo de conteúdo da requisição (Obrigatório ser um JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            // Validação do ID válido
            let validar = await validarDadosFilme(filme)

            if (!validar) {

                // Validação do ID, se existe no BD
                let validarID = await buscarFilmeId(id)

                if (validarID.status_code == 200) {
                    filme.id = Number(id)

                    // Processamento
                    // Chama a função para atualizar um filme no BD
                    let resultfilme = await filmeDAO.setUpdateMovie(filme)
                    if (resultfilme) {
                        // Processar a atualização dos dados na tabela de relação entre filme e genero
                        let deleteFilmeGenero = await controllerFilmeGenero.excluirFilmeGenero(id)
                        for (genero of filme.genero) {
                            // filme.genero.forEach(async function (genero) {
                            let filmeGenero = { id_filme: id, id_genero_cinematografico: genero.id_genero_cinematografico }

                            let resultsFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)
                            if (resultsFilmeGenero.status_code != 201) {
                                return MESSAGES.ERROR_RELATIONAL_INSERTION // 500 Problema com a tabela relacional
                            }
                        }

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.items.filme = filme

                           // Apaga o atributo genero apenas com os ids que foram enviados no post
                           delete filme.genero

                           // Pesquisa no BD 
                           let resultDadosGeneros = await controllerFilmeGenero.listarGenerosIdFilme(id)
                           // Cria novamente o atributo genero e coloca o resultado do BD com os generos
                           filme.genero = resultDadosGeneros

                        return MESSAGES.DEFAULT_HEADER // 201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarID // A função buscarFilmeID poderá retornar (400 ou 404 ou 500)
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_REQUIRED_FIELDS // 415
        }
    } catch (error) {
        console.log('x')
        console.log(error)
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}
// Exclui um filme pelo ID
async function excluirFilme(id) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        let validarID = await buscarFilmeId(id)
        if (validarID.status_code == 200) {

            // Processamento
            // Chama a função para deletar um filme no BD
            let resultfilme = await filmeDAO.setDeleteMovie(id)

            if (resultfilme) {
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

async function validarDadosFilme(filme, contentType) {
    // Criando copia do objeto mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
        // Validações de todas as entradas de dados
        if (filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100) {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += '[Nome incorreto]'
            return MESSAGES.ERROR_REQUIRED_FIELDS
        }
        else if (filme.sinopse == undefined) {
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
            return false
        }
    }
}

module.exports = {
    listarFilme,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}