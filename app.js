'use strict'

/********************************************************************************************
* Objetivo: Arquivo principal da API para acesso.
* Autor: Kauan Lopes Pereira
* Data: 01/10/2025
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
// Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

// Criando um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

// Retorna a porta do servidor local ou colocamos uma porta local
const PORT = process.PORT || 8080
// Criando uma instancia de uma classe do express
const app = express()

// Configuração de permissões
// next ?
app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*') // Servidor de origem da API
    response.header('Access-Control-Allow-Methods', 'GET') // Verbos permitidos na API
    app.use(cors()) // Carrega as configurações no Cors da API
    next() // Próximo, carregar os proximos endpoints
})
// ENDPOINT's
// 1°
app.get('/v1/locadora/filme', cors(), async function (request, response){
    // Chama a função para listar os filmes do BD
    let filme = await controllerFilme.listarFilme()
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 1° - Requisitado')
})
// 2°
app.get('/v1/locadora/filme/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Chama a função de buscar filme por ID
    let filme = await controllerFilme.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 2° - Requisitado')
})
// 3°
app.post('/v1/locadora/filme/', cors(), bodyParserJSON, async function (request, response){
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 3° - Requisitado')
})
// 4°
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Recebe os dados do body da requisição (Se você utilizar o bodyParser, é obrigatório ter no endPoint)
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    // Chama a função de inserir o novo filme, encaminha os dados e o content-type
    let filme = await controllerFilme.atualizarFilme(dadosBody, contentType, idFilme)
    
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 4° - Requisitado')
})


// Mensagem de operação da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})