'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel por padronizar as mensagens que o projeto irá realizar, [
            sempre no formato JSON (Mensagens de erro e sucesso)
requisições e respostas para a tabela Filme.
* Autor: Kauan Lopes Pereira
* Data: 07/10/2025
* Versão: 1.0.10.25
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/******************************** MENSAGENS PADRONIZADAS *************************************/
const data_atual = new Date()

const DEFAULT_HEADER = {
    api_description: 'API para manipular dados de Filmes',
    development: 'Kauan Lopes Pereira',
    status: Boolean,
    status_code: Number,
    date_request: data_atual.toString(),
    itens: {}

}


/********************************** MENSAGENS DE SUCESSO *************************************/

const SUCCESS_REQUEST = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}

/************************************ MENSAGENS DE ERRO **************************************/

const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    message: 'Não foram encontrados dados de retorno!'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição devido a erros internos no servidor (CONTROLLER)!'
}
const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    message: 'Não foi possivel processar a requisição devido a erros internos no servidor (MODELAGEM DE DADOS)!'
}
const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    message: 'Não foi possivel processar a requisição pois existem campos obrigatórios que devem ser encaminhados e atendidos conforme documentação!'
}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS
}