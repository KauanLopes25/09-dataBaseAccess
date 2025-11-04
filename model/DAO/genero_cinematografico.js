'use strict'

/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela generos dos filmes.
* Autor: Kauan Lopes Pereira
* Data: 04/11/2025
* Versão: 1.0.11.25
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
    npm install prisma --save           -> Instalar o prisma (Conexão com o Database).
    npm install @prisma/client --save   -> Instalar o cliente do prisma (Executar scripts SQL no BD).
    npx prisma init                     -> Prompt de comando para inicializar o prisma.
    npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o DB (CUIDADO,
                                           neste processo você poderá perder dados reais do DB, 
                                           pois ele pega e cria tabelas programadas no ORM schema.prisma)
    npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o DB, geralmente
                                           usamos para rodar o projeto em um PC novo                                      
* Knex -> É uma dependencia para trabalhar com BD (MYSQL)
BANCO NÃO RELACIONAL
* Mongoose -> É uma dependencia para o Mongo DB (Não relacional).

******************************** BIBLIOTECAS UTILIZADAS *************************************

********************************************************************************************/

// Import da dependência do Prisma que permite a execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma')

// Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

// Retorna uma lista de todos os generos_cinematograficos do banco de dados
async function getSelectAllMovieGenders() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de filme
        let sql = `select * from tbl_genero_cinematografico order by id_genero_cinematografico desc`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }
}

// Retorna um generos_cinematograficos filtrando pelo ID do banco de dados
async function getSelectByIdMovieGender(id) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de filme
        let sql = `select * from tbl_genero_cinematografico where id_genero_cinematografico = ${id}`
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        if (Array.isArray(result))
            return result

        else
            return false


    } catch (error) {
        return false
    }
}
// Retorna o ultimo id do banco de dados
async function getSelectLastId() {
    try {
        // Variavel com o comando sql para retornar o ultimo id do banco de dados
        let sql = 'select id_genero_cinematografico from tbl_genero_cinematografico order by id_genero_cinematografico desc limit 1'
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)
        if (Array.isArray(result))
            return Number(result[0].id_genero_cinematografico)

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }  
}
// Insere um generos_cinematograficos novo no banco de dados
async function setInsertMovieGender(generoCinematografico) {
    try {
        let sql = `
        insert into tbl_genero_cinematografico 
        (nome)
        values (
                '${generoCinematografico.nome}'
                
        );`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {
        return false
    }
}

// Altera um generos_cinematograficos pelo ID no banco de dados
async function setUpdateMovieGender(generoCinematografico) {
    try {
        let sql = ` UPDATE tbl_genero_cinematografico
                    SET nome = '${generoCinematografico.nome}'
                    WHERE id_genero_cinematografico = ${generoCinematografico.id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {
        return false
    }
}
// Excluir um generos_cinematograficos pelo ID no banco de dados
async function setDeleteMovieGender(id) {
    try {
        let sql = `DELETE FROM tbl_genero_cinematografico
                    WHERE id_genero_cinematografico = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllMovieGenders,
    getSelectByIdMovieGender,
    getSelectLastId,
    setInsertMovieGender,
    setUpdateMovieGender,
    setDeleteMovieGender
}