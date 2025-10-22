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

const router = express.Router();

// Importação do arquivo controller da tbl_filme
const filmeController = require('../filme/controller_filme.js')
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

// 1°
router.get('/', cors(), async function (request, response){
    // Chama a função para listar os filmes do BD
    let filme = await filmeController.listarFilme()
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 1° tbl_filme - Requisitado')
})
// 2°
router.get('/:id', cors(), async function (request, response){
    // Recebe o ID encaminhado via parametro na requisição
    let idFilme = request.params.id
    // Chama a função de buscar filme por ID
    let filme = await filmeController.buscarFilmeId(idFilme)
    response.status(filme.status_code)
    response.json(filme)
    console.log('ENDPOINT 2° tbl_filme - Requisitado')
})

module.exports = router
