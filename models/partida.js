//Métodos (querys)
// Todas las acciones sobre la tabla partidas;

//Mostrar Partidas
const getPartidas = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from partidas', (error, rows) => {
            if (error) reject(error);
            resolve(rows);
        });
    });
};
//Mostrar TODO 
const getPartidasFull = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id;', (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

//GET PARTIDAS BY PLAYER
const getPartidasFullByPlayer = (idUsuario) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.fk_usuario = ? ORDER BY fecha ASC LIMIT 6;', [idUsuario], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getPartidasFullById = (partidaId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego",j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores,r.imagen_rango, r.id "id_rango", r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.id = ?;', [partidaId], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getPartidasFullByRegistro = (registro) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.registro_partida, p.id "id_partida", p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida = ?;', [registro], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const crearPartida = ({ fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO partidas (fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida) values (?, ?, ?, ?, ?, ?, ?, ?, ?)', [fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};
//UNIRSE A UNA PARTIDA
const unirPartida = (registro, { fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida }) => {
    return new Promise((resolve, reject) => {

        db.query('INSERT INTO partidas (fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida) VALUES (?,?,?,?,?,?,?,?,?)', [fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida, registro], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

/* const unirPartida = (registro_partida, { fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores }) => {
    return new Promise((resolve, reject) => {

        db.query('INSERT INTO partidas (fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores) VALUES (?,?,?,?,?,?,?,?)', [fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango, jugadores_max, cantidad_jugadores, registro_partida], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
} */

const getPartidaId = (pPartidaId) => {
    return new Promise((resolve, reject) => {
        db.query('select * from partidas where id = ?', [pPartidaId], (error, rows) => {
            if (error) reject(error);
            if (rows.length === 0) resolve(null);
            resolve(rows[0]);
        });
    });
}

const borrarPartidaId = (pPartidaId) => {
    return new Promise((resolve, reject) => {
        db.query('delete * from partidas where id = ?', [pPartidaId], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

//Obtener plataformas

const getPlataformas = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT distinct plataforma_preferida FROM usuarios ', (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}


//Obtener todos los jugadores de una partida


const insertarJugadorPartida = (username, fk_partida, fk_usuario) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO jugadores (username, fk_partida, fk_usuario) values(?, ?, ?)', [username, fk_partida, fk_usuario], (err, res) => {
            if (err) reject(err);

            resolve(res)

        })
    })

}
/* const getJugadoresByRegistroPartida = (registro_partida) => {
    return new Promise((resolve, reject) => {
        db.query('SE')
    })
} */

//*FILTROS 

//OBTENER PARTIDAS POR MODO DE JUEGO

const getPartidasByModoJuegoId = (id_modo, pagina) => {

    console.log(id_modo, pagina);
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.registro_partida, p.id "id_partida", p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida != 1 AND mj.id = ? LIMIT 10 OFFSET ?;', [id_modo, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);

            resolve(res)

        })
    })
}


//OBTENER PARTIDAS POR RANGO

const getPartidasByRangoId = (id_rango, pagina) => {

    console.log(id_rango, pagina);
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.registro_partida, p.id "id_partida", p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida != 1 AND r.id = ? LIMIT 10 OFFSET ?;', [id_rango, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);

            resolve(res)

        })
    })
}

//OBTENER PARTIDAS POR FILTRO DE FECHA Y JUEGO

const getPartidasByDateAsc = (juego_id, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego",j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores,r.imagen_rango, r.id "id_rango", r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida != 1 AND  j.id = ? ORDER BY fecha ASC LIMIT 10 OFFSET ? ;', [juego_id, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getPartidasByDateDesc = (juego_id, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego",j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores,r.imagen_rango, r.id "id_rango", r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida != 1 AND j.id = ? ORDER BY fecha DESC LIMIT 10 OFFSET ?;', [juego_id, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}


const getRegistrosByPartida = (registro_partida) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM partidas WHERE registro_partida = ?;', [registro_partida], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}


const updateCantidadJugadores = (registro_partida) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE partidas SET cantidad_jugadores = cantidad_jugadores + 1 WHERE registro_partida =  ?', [registro_partida], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}


const getPartidasPaginadas = (pagina) => {
    return new Promise((resolve, reject) => {
        db.query('select * from partidas ORDER BY fecha desc LIMIT 10 OFFSET ?;', [(pagina - 1) * 10],
            (err, res) => {
                if (err) reject(err);
                resolve(res)
            })
    })
}


const getPartidasFullPaginas = (idJuego, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", j.estadisticas, u.username, p.cantidad_jugadores, p.jugadores_max, p.id "id_partida", p.registro_partida, p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.imagen_rango, r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.registro_partida != 1 AND j.id = ? ORDER BY fecha desc LIMIT 10 OFFSET ? ;', [idJuego, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

//ALL LOS REGISTROS
const getRegistrosUnicosFull = (idJuego) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT (partidas.registro_partida), partidas.fk_juego, partidas.fk_modo_juego, partidas.fk_rango, partidas.jugadores_max, partidas.cantidad_jugadores FROM partidas WHERE partidas.fk_juego = ? ORDER BY fecha desc;', [idJuego,], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}
//REGISTROS POR PAGINA
const getRegistrosUnicos = (idJuego, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT (partidas.registro_partida), partidas.fk_juego, partidas.fk_modo_juego, partidas.fk_rango, partidas.jugadores_max, partidas.cantidad_jugadores FROM partidas WHERE partidas.fk_juego = ? ORDER BY fecha desc LIMIT 10 OFFSET ?;', [idJuego, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getRegistrosUnicosByAsc = (idJuego, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT (partidas.registro_partida), partidas.fk_juego, partidas.fk_modo_juego, partidas.fk_rango, partidas.jugadores_max, partidas.cantidad_jugadores FROM partidas WHERE partidas.fk_juego = ? ORDER BY fecha asc LIMIT 10 OFFSET ?;', [idJuego, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getRegistrosUnicosByIdRango = (idJuego, idRango, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT (partidas.registro_partida), partidas.fk_juego, partidas.fk_modo_juego, partidas.fk_rango, partidas.jugadores_max, partidas.cantidad_jugadores FROM partidas WHERE partidas.fk_juego = ? AND partidas.fk_rango = ? ORDER BY fecha desc LIMIT 10 OFFSET ?;', [idJuego, idRango, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

//OBTENER JUGADORES POR CADA REGISTRO
const getJugadoresByRegistroPartida = (registro_partida) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT partidas.registro_partida, usuarios.id, usuarios.username  FROM partidas, usuarios WHERE partidas.fk_usuario = usuarios.id AND partidas.registro_partida = ?;', [registro_partida], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getFechasByregistro = (registro_partida) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT partidas.fecha FROM partidas WHERE partidas.registro_partida = ? ORDER BY fecha asc LIMIT 1;', [registro_partida], (err, res) => {
            if (err) reject(err);
            resolve(res[0])
        })
    })
}

const getRegistrosByIdModo = (idJuego, idModo, pagina) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT DISTINCT (partidas.registro_partida), partidas.fk_juego, partidas.fk_modo_juego, partidas.fk_rango, partidas.jugadores_max, partidas.cantidad_jugadores FROM partidas WHERE partidas.fk_juego = ? AND partidas.fk_modo_juego = ? ORDER BY fecha desc LIMIT 10 OFFSET ?;', [idJuego, idModo, ((pagina - 1) * 10)], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}
module.exports = {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas, getPartidasFull, getPartidasFullById, unirPartida, getPartidasFullByRegistro, insertarJugadorPartida, getPartidasByModoJuegoId, getPartidasByRangoId, getPartidasByDateAsc, getPartidasByDateDesc, getRegistrosByPartida, updateCantidadJugadores, getPartidasPaginadas, getPartidasFullPaginas, getRegistrosUnicos, getJugadoresByRegistroPartida, getRegistrosUnicosByAsc, getRegistrosUnicosByIdRango, getFechasByregistro, getRegistrosByIdModo, getRegistrosUnicosFull, getPartidasFullByPlayer
}