'use strict'

/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela Filme.
* Autor: Kauan Lopes Pereira
* Data: 01/10/2025
* Versão: 1.0.10.25
********************************************************************************************/

/* Comentário em bloco */
// Comentário em linha

/********************************************************************************************
********************************* COMANDOS UTILIZADOS ***************************************
* $queryRawUnsafe(script) -> permite executar um script SQL de uma variavel e que retorna 
valores de um banco (SELECT).
* $executeRawUnsafe(script) -> Permite executar um script SQL de uma variavel e que não 
retorna dados do banco (INSERT, UPDATE e DELETE.)
* $queryRaw(script) -> permite executar um script SQL sem estar em uma variavel e que retorna 
valores do banco (SELECT). Faz tratamentos de segurança contra SQL Injection
* $executeRaw(script) -> Permite executar um script SQL sem estar em uma variavel e que não 
retorna dados do banco (INSERT, UPDATE e DELETE.). Faz tratamentos de segurança contra SQL 
Injection
************************************** OBSERVAÇÕES ******************************************
* Todo array possui um indice, e para acessar um indice devemos dizer qual a sua posição [0],
[3] ou [n], seria a posição em que aquele elemento se encontra dentro de todo array.
* Todo Json pode ser acessado com ".nomeAtributo".
********************************* EXEMPLOS BIBLIOTECAS **************************************
BANCO RELACIONAL
* Sequelize -> Foi Utilizado em muitos projetos desde o inicio do node.
* Prisma -> É uma dependencia atual que trabalha com BD  (MYSQL, PostgreSQL, SQL Server), (SQL ou ORM).
* Knex -> É uma dependencia para trabalhar com BD (MYSQL)
BANCO NÃO RELACIONAL
* Mongoose -> É uma dependencia para o Mongo DB (Não relacional).

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('@prisma/client')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os filmes do banco de dados
async function getSelectAllMovies() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de filme
        let sql = `select * from tbl_filme order by id desc`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)

        if (result.length > 0)
            return result
        else
            return false


    } catch (error) {
        return false
    }

}
// Retorna um filme filtrando pelo ID do banco de dados
async function getSelectByIdMovie(id) {

}

// Insere um filme novo no banco de dados
async function setInsertMovie() {

}

// Altera um filme pelo ID no banco de dados
async function setUpdateMovie(id) {

}

// Excluir um filme pelo ID no banco de dados
async function setDeleteMovie(id) {

}

module.exports = {
    getSelectAllMovies
}