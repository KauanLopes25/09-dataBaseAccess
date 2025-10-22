'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela filme.
* Autor: Kauan Lopes Pereira
* Data: 22/10/2025
* Versão: 1.0.10.25
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************

************************************** OBSERVAÇÕES ******************************************

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/
// Responsável pela API
const express = require('express')
// Responsável pelas permissões da API (APP)
const cors = require('cors')
// Responsável por gerenciar a chegada dos dados da api com o front
const bodyParser = require('body-parser')

// Criando um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

const router = express.Router();

// Importação do arquivo controller da tbl_filme
const filmeController = require('../filme/controller_filme.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response){
    // Chama a função para listar os filmes do BD
    let filme = await filmeController.listarFilme()
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 1° - Requisitado na tbl_filme')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Chama a função de buscar filme por ID
    let filme = await filmeController.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 2° - Requisitado na tbl_filme')
})
// 3° INSERIR
router.post('/', cors(), bodyParserJSON, async function (request, response){
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo filme, encaminha os dados e o content-type
    let filme = await filmeController.inserirFilme(dadosBody, contentType)
    
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 3° - Requisitado na tbl_filme')
})
// 4° ATUALIZAR
router.put('/:id', cors(), bodyParserJSON, async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type'] 
    // Chama a função de inserir o novo filme, encaminha os dados e o content-type
    let filme = await filmeController.atualizarFilme(dadosBody, contentType, idFilme)
    
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 4° - Requisitado na tbl_filme')
})
// 5° DELETAR
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Chama a função de buscar filme por ID
    let filme = await filmeController.excluirFilme(idFilme)
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 5° - Requisitado na tbl_filme')
})
module.exports = router
