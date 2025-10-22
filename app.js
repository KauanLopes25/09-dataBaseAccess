'use strict'

/********************************************************************************************
* Objetivo: Arquivo principal da API para acesso ao banco de dados de uma locadora de filme.
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
// Import da controller
const controllerFilme = require('./controller/filme/controller_filme.js')
// Import das rotas
const filmeRoutes = require('./controller/filme/router_filme.js')

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
// Mensagem de operação da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})

// ENDPOINT's
app.use('/v1/locadora/filme/', filmeRoutes)
