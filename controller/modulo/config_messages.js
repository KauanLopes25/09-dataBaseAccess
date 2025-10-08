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

const MESSAGE_HEADER = {
    api_description: 'API para manipular dados de Filmes',
    development: 'Kauan Lopes Pereira',
    status: Boolean,
    status_code: Number,
    date_request: data_atual,
    itens: {}

}


/********************************** MENSAGENS DE SUCESSO *************************************/

const MESSAGE_REQUEST_SUCCESS = {
    status: true,
    status_code: 200,
    message: 'Requisição bem sucedida!'
}

/************************************ MENSAGENS DE ERRO **************************************/


module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}