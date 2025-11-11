/**************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MYSQL referente ao relacionamento entre filme e genero
 * Autor: Edvan Alves
 * Data: 05/11/2025
 * Versão: 1.0.11.25
**************************************************************************************************/

// import da dependencia do prisma, para execução de script SQL no BD
const { PrismaClient } = require('../../generated/prisma');

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient;


// Retorna todos os filmes e generos do banco de dados
const getSelectAllMovieGenres = async function () {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero_cinematografico_filme ORDER BY id DESC`

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        // console.log(error);
        return false;
    }

}

// Retorna o filme e gênero do Banco de dados, filtrando por id
const getSelectByIdMovieGenres = async function (id) {
    try {
        //script SQL
        let sql = `SELECT * FROM tbl_genero_cinematografico_filme  where id =${id}`

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result;
        else
            return false;

    } catch (error) {
        // console.log(error);
        return false;
    }
}


// Retorna todos os gêneros filtrando por um id de filme
const getSelectGenresByIdMovies = async function(id_filme){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_genero.id, tbl_genero.nome
            FROM tbl_filme
                INNER JOIN tbl_genero_cinematografico_filme
                    ON tbl_filme.id_filme = tbl_genero_cinematografico_filme.id_filme
                INNER JOIN tbl_genero    
                    ON tbl_genero.id_genero_cinematografico = tbl_genero_cinematografico_filme.id_genero_cinematografico
                WHERE tbl_filme.id_filme = ${id_filme}`

        // Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;
    }
    catch (error){
        // console.log(error);
        return false;
    }
}

// Retorna todos os filmes filtrando por um id de gênero
const getSelectMoviesByIdGenres = async function(id_genero_cinematografico){
    try {
        //Script SQL
        let sql = 
        `SELECT tbl_filme.id, tbl_filme.nome
            FROM tbl_genero
                INNER JOIN tbl_genero_cinematografico_filme
                    ON tbl_genero.id_genero_cinematografico = tbl_genero_cinematografico_filme.id_genero_cinematografico
                INNER JOIN tbl_filme    
                    ON tbl_filme.id_filme = tbl_genero_cinematografico_filme.id_filme
                WHERE tbl_genero.id_genero_cinematografico = ${id_genero_cinematografico}`

        // Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result))
            return result;
        else
            return false;
    }
    catch (error){
        // console.log(error);
        return false;
    }
}

//Retorna o ultimo Id cadastrado
const getSelectLastId = async function () {
    try {
        //Script SQL
        let sql = `SELECT id FROM tbl_genero_cinematografico_filme ORDER BY id DESC LIMIT 1`;

        //Encaminha o script SQL para o BD
        let result = await prisma.$queryRawUnsafe(sql);

        if (Array.isArray(result)) {
            return Number(result[0].id);
        }
        else {
            return false;
        }

    } catch (error) {
        return false;
    }
}

// Insere um relacionamento de Filme com Gênero no banco de dados
const setInsertMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `INSERT INTO tbl_genero_cinematografico_filme(id_filme, id_genero_cinematografico)
        VALUES('${filmeGenero.id_filme}', '${filmeGenero.id_genero_cinematografico}');`

        //executeRawUnsafe -> Para executar script SQL sem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true
        }
        else {
            return false
        }
    } catch (error) {
        console.log(error);
        return false
    }

}

// Altera um registro de relacionamento de Filme com Gênero no banco de dados
const setUpdateMoviesGenres = async function (filmeGenero) {
    try {
        let sql = `UPDATE tbl_genero_cinematografico_filme
        SET 
            id_filme = '${filmeGenero.id_filme}',
            id_genero_cinematografico = '${filmeGenero.id_genero_cinematografico}'
        WHERE id = ${filmeGenero.id};`

        //executeRawUnsafe -> Para executar script SQL sem retorno de valores
        let result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        }
        else
            return false;
    } catch (error) {
        return false
    }

}

// Exclui um relacionamento de filme com genero pelo id no banco de dados
const setDeleteMoviesGenres = async function (id) {
    try {
        let sql = `DELETE FROM tbl_genero_cinematografico_filme
        WHERE id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result)
            return true;
        else
            return false;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = {
    getSelectAllMovieGenres,
    getSelectByIdMovieGenres,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}