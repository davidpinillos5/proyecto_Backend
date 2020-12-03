//QUERYS a la base de datos

//getJuegos, GetJuegoById, GetModosByIdJuego, getPartidasByIdJuego, getRangosByIdjuego, getJugadoresByModoJuego


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

//Obtener todas las partidas de un juego por el ID del juego


const getPartidasByIdJuego = (juegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT p.id "partida_id", p.fecha, p.descripcion, p.fk_juego, p.fk_modo_juego, p.fk_rango, p.fk_usuario, j.id "juego_id", j.nombre, j.imagen, j.plataforma, j.año_lanzamiento, j.empresa FROM partidas p, juegos j WHERE p.fk_juego = j.id AND j.id = ?', [juegoId], (err, partidas) => {
            if (err) reject(err);
            resolve(partidas);
        })
    })
}


//Obtener todos los rangos de un juego por el ID del juego

const getRangosByIdjuego = (juegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT r.id "id_rango", r.fk_juego, r.rango, j.* FROM rangos r, juegos j WHERE r.fk_juego = j.id AND j.id = ?;', [juegoId], (err, rangos) => {
            if (err) reject(err);
            resolve(rangos)
        })
    })
}



//Obtener el número máximo de jugadores por modo de juego

const getJugadoresByModoJuego = (modoJuegoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT mj.id, mj.numero_jugadores, mj.nombre  FROM modo_juego mj WHERE mj.id = ? ;', [modoJuegoId], (err, jugadores) => {
            if (err) reject(err);
            resolve(jugadores)
        })
    })
}

module.exports = {
    getJuegos, getJuegoById, getModosByIdJuego, getPartidasByIdJuego, getRangosByIdjuego, getJugadoresByModoJuego

}


