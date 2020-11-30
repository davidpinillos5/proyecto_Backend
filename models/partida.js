//Métodos (querys)
// Todas las acciones sobre la tabla partidas;

//Mostrar Partidas
const getPartidas = () => {
    return new Promise ((resolve, reject) => {
        db.query('select * from partidas', (error, rows) => {
            if(error) reject(error);
            resolve(rows);
        });
    });
};

const crearPartida = ({ usuario, fecha, juego, modo_de_juego, rango, descripcion}) => {
    return new Promise ((resolve, reject) => {
        db.query('INSERT INTO partidas (usuario, fecha, juego, modo_de_juego, rango, descripcion) values (?, ?, ?, ?, ?, ?)', [usuario, fecha, juego, modo_de_juego, rango, descripcion], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};

const getPartidaId = (pPartidaId) => {
    return new Promise ((resolve, reject)=> {
        db.query('select * from partidas where id = ?', [pPartidaId],(error, rows) => {
            if(error) reject(error);
            if(rows.length === 0) resolve(null);
            resolve(rows[0]);
        });
    });
}

const borrarPartidaId = (pPartidaId) => {
    return new Promise((resolve, reject) => {
        db.query('delete * from partidas where id = ?', [pPartidaId], (error, result) => {
            if(error) reject(error);
            resolve(result);
        });
    });
};


module.exports = {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId
}