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

const getPartidasFull = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", u.username, p.id "id_partida", p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id;', (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const getPartidasFullById = (partidaId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT u.id "id_usuario", j.id "id_juego", j.nombre "nombre_juego", j.imagen "imagen_juego", j.logo "logo_juego", u.username, p.id "id_partida", p.fecha, p.descripcion, p.fk_usuario, p.fk_juego, p.fk_modo_juego, p.fk_rango, mj.id "id_modo", mj.fk_juego "fk_juego_modo", mj.nombre "nombre_modo", mj.numero_jugadores, r.id "id_rango", r.fk_juego "fk_juego_rango", r.rango FROM usuarios u, partidas p, modo_juego mj, rangos r, juegos j WHERE p.fk_modo_juego = mj.id AND p.fk_rango = r.id AND p.fk_usuario = u.id AND p.fk_juego = j.id AND p.id = ?;', [partidaId], (err, res) => {
            if (err) reject(err);
            resolve(res)
        })
    })
}

const crearPartida = ({ fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO partidas (fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango) values (?, ?, ?, ?, ?, ?)', [fecha, descripcion, fk_usuario, fk_juego, fk_modo_juego, fk_rango], (error, result) => {
            if (error) reject(error);
            resolve(result);
        });
    });
};

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


module.exports = {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas, getPartidasFull, getPartidasFullById
}