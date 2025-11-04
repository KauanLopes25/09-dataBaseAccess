'use strict'

/********************************************************************************************
* Objetivo: Arquivo para comunicação com a tabela Colaborador.
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

// Retorna uma lista de todos os collaborators do banco de dados
async function getSelectAllcollaborators() {
    try {
        // Variavel com o comando sql para buscar toda a tabela de collaborator
        let sql = `select * from tbl_colaborador order by id_colaborador desc`
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

// Retorna um collaborator filtrando pelo ID do banco de dados
async function getSelectByIdcollaborator(id) {
    try {
        // Variavel com o comando sql para buscar toda a tabela de collaborator
        let sql = `select * from tbl_colaborador where id_colaborador = ${id}`
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
        let sql = 'select id_colaborador from tbl_colaborador order by id_colaborador desc limit 1'
        // Variavel para inserir o comando no banco de dados
        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)
        if (Array.isArray(result))
            return Number(result[0].id_colaborador)

        else
            return false


    } catch (error) {
        console.log(error)
        return false
    }  
}
// Insere um collaborator novo no banco de dados
async function setInsertcollaborator(collaborator) {
    try {
        let sql = `
        insert into tbl_colaborador 
        (nome, data_nascimento, foto, biografia, id_genero_biologico)
        values (
                '${collaborator.nome}',
                '${collaborator.data_nascimento}',
                '${collaborator.foto}',
                '${collaborator.biografia}',
                '${collaborator.id_genero_biologico}'
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

// Altera um collaborator pelo ID no banco de dados
async function setUpdatecollaborator(collaborator) {
    try {
        let sql = ` UPDATE tbl_colaborador
                    SET nome = '${collaborator.nome}', 
                    data_nascimento = '${collaborator.data_nascimento}', 
                    foto = '${collaborator.foto}',
                    biografia = '${collaborator.biografia}',
                    id_genero_biologico = '${collaborator.id_genero_biologico}'
                    WHERE id_colaborador = ${collaborator.id};`

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {

            return true
        } else {

            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}
// Excluir um collaborator pelo ID no banco de dados
async function setDeletecollaborator(id) {
    try {
        let sql = `DELETE FROM tbl_colaborador
                    WHERE id_colaborador = ${id};`

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
    getSelectAllcollaborators,
    getSelectByIdcollaborator,
    getSelectLastId,
    setInsertcollaborator,
    setUpdatecollaborator,
    setDeletecollaborator
}