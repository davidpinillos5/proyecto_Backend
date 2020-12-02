//QUERYS a la base de datos

//getJuegos, GetJuegoById, GetModosByIdJuego, getPartidasByIdJuego, getRangosByIdjuego


//Obtener todos los juegos
const getJuegos = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from juegos', (err, juegos) => {
            if (err) reject(error);
            resolve(juegos)
        });

    })
}

//Obtener un juego por id
const getJuegoById = (juegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM juegos WHERE juegos.id = ?', [juegoId], (err, juego) => {
            if (err) reject(err)
            resolve(juego);
        })
    })
}

//Obtener los modos de juego por el ID del juego

const getModosByIdJuego = (juegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT mj.id as "id_modo", mj.fk_juego, mj.nombre, mj.numero_jugadores, mj.descripcion, j.id as "id_juego", j.nombre as "juego" FROM modo_juego mj, juegos j WHERE mj.fk_juego = j.id AND  j.id = ?', [juegoId], (err, modosJuego) => {
            if (err) reject(err);
            resolve(modosJuego)

        })
    })
}

//Obtener todas las partidas por el ID del juego

//TODO: cambiar la sintaxis, no pueden tener el mismo nombre las cabeceras de la columna, SELECT * --> cambiar

const getPartidasByIdJuego = (juegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM partidas p, juegos j WHERE p.fk_juego = j.id AND j.id = ?', [juegoId], (err, partidas) => {
            if (err) reject(err);
            resolve(partidas);
        })
    })
}




module.exports = {
    getJuegos, getJuegoById, getModosByIdJuego, getPartidasByIdJuego

}