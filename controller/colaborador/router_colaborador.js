'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela colaborador.
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

// Importação do arquivo controller da tbl_colaborador
const colaboradorController = require('../colaborador/controller_colaborador.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response){
    // Chama a função para listar os colaboradors do BD
    let colaborador = await colaboradorController.listarColaborador()
    response.status(colaborador.status_code)
    response.json(colaborador)
    console.log('ENDPOINT 1° - Requisitado na tbl_colaborador')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idColaborador = request.params.id
    // Chama a função de buscar colaborador por ID
    let colaborador = await colaboradorController.buscarColaboradorId(idColaborador)
    response.status(colaborador.status_code)
    response.json(colaborador)
    console.log('ENDPOINT 2° - Requisitado na tbl_colaborador')
})
// 3° INSERIR
router.post('/', cors(), bodyParserJSON, async function (request, response){
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo colaborador, encaminha os dados e o content-type
    let colaborador = await colaboradorController.inserirColaborador(dadosBody, contentType)
    
    response.status(colaborador.status_code)
    response.json(colaborador)
    console.log('ENDPOINT 3° - Requisitado na tbl_colaborador')
})
// 4° ATUALIZAR
router.put('/:id', cors(), bodyParserJSON, async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idColaborador = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type'] 
    // Chama a função de inserir o novo colaborador, encaminha os dados e o content-type
    let colaborador = await colaboradorController.atualizarColaborador(dadosBody, contentType, idColaborador)
    
    response.status(colaborador.status_code)
    response.json(colaborador)
    console.log('ENDPOINT 4° - Requisitado na tbl_colaborador')
})
// 5° DELETAR
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idColaborador = request.params.id
    // Chama a função de buscar colaborador por ID
    let colaborador = await colaboradorController.excluirColaborador(idColaborador)
    response.status(colaborador.status_code)
    response.json(colaborador)
    console.log('ENDPOINT 5° - Requisitado na tbl_colaborador')
})
module.exports = router
