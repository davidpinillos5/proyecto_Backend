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
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas
}