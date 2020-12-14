const router = require('express').Router()
const partida = require('../../models/partida');
const {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas
} = require('../../models/partida');

const { body, validationResult } = require('express-validator');


//recuperar plataformas

router.get('/plataformas', async (req, res) => {
    try {
        const plataformas = await getPlataformas();
        res.json(plataformas);
    } catch (error) {
        res.json({ error: error.message })
    }
})
//RUTA /api/partidas
//Recuperar todas las partidas de la base de datos

router.get('/', async (req, res) => {

    try {
        const rows = await getPartidas();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

//Crear una nueva partida

router.post('/', async (req, res) => {
    const result = await crearPartida(req.body);

    if (result.affectedRows === 1) {
        const nuevaPartida = await getPartidaId(result.insertId);
        res.json(nuevaPartida);
    } else {
        res.json({ error: 'Ha ocurrido un error en la inserción de la partida.' });
    }
});

//borrar partida

router.delete(':partidaId', async (req, res) => {
    try {
        const result = await borrarPartidaId(req.params.partidaId);
        if (result.affectedRows === 1) {
            res.json({ mensaje: 'Se ha borrado correctamente' });
        } else {
            res.json({ error: 'Ha ocurrido un error al tratar de eliminar la partida' });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router