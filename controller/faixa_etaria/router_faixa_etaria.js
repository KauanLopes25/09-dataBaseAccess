'use strict'

/********************************************************************************************
* Objetivo: Arquivo responsavel pela configuração das rotas para a tabela faixa etaria.
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

// Importação do arquivo controller da tbl_faixa_etaria
const faixaEtariaController = require('../faixa_etaria/controller_faixa_etaria.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1° LISTAR
router.get('/', cors(), async function (request, response){
    // Chama a função para listar os faixaEtarias do BD
    let faixaEtaria = await faixaEtariaController.listarFaixaEtaria()
    response.status(faixaEtaria.status_code)
    response.json(faixaEtaria)
    console.log('ENDPOINT 1° - Requisitado na tbl_faixa_etaria')
})
// 2° BUSCAR POR ID
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idfaixaEtaria = request.params.id
    // Chama a função de buscar faixaEtaria por ID
    let faixaEtaria = await faixaEtariaController.buscarFaixaEtariaId(idfaixaEtaria)
    response.status(faixaEtaria.status_code)
    response.json(faixaEtaria)
    console.log('ENDPOINT 2° - Requisitado na tbl_faixa_etaria')
})
// 3° INSERIR
router.post('/', cors(), bodyParserJSON, async function (request, response){
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo faixaEtaria, encaminha os dados e o content-type
    let faixaEtaria = await faixaEtariaController.inserirFaixaEtaria(dadosBody, contentType)
    
    response.status(faixaEtaria.status_code)
    response.json(faixaEtaria)
    console.log('ENDPOINT 3° - Requisitado na tbl_faixa_etaria')
})
// 4° ATUALIZAR
router.put('/:id', cors(), bodyParserJSON, async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idfaixaEtaria = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type'] 
    // Chama a função de inserir o novo faixaEtaria, encaminha os dados e o content-type
    let faixaEtaria = await faixaEtariaController.atualizarFaixaEtaria(dadosBody, contentType, idfaixaEtaria)
    
    response.status(faixaEtaria.status_code)
    response.json(faixaEtaria)
    console.log('ENDPOINT 4° - Requisitado na tbl_faixa_etaria')
})
// 5° DELETAR
router.delete('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idfaixaEtaria = request.params.id
    // Chama a função de buscar faixaEtaria por ID
    let faixaEtaria = await faixaEtariaController.excluirFaixaEtaria(idfaixaEtaria)
    response.status(faixaEtaria.status_code)
    response.json(faixaEtaria)
    console.log('ENDPOINT 5° - Requisitado na tbl_faixa_etaria')
})
module.exports = router
