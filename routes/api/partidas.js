const router = require('express').Router()
const partida = require('../../models/partida');
const {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas, getPartidasFull, getPartidasFullById, unirPartida, getPartidasFullByRegistro, insertarJugadorPartida, getPartidasByModoJuegoId
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
//! OBTENER LAS PARTIDAS POR EL REGISTRO NO POR EL ID, SI NO SE VAN A REPETIR
router.get('/', async (req, res) => {

    try {
        const rows = await getPartidas();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

//Get partidas FULL
router.get('/full', async (req, res) => {
    try {
        const partidas = await getPartidasFull();
        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Get partidas FULL by Id
router.get('/full/:partidaId', async (req, res) => {
    try {
        const partida = await getPartidasFullById(req.params.partidaId);
        res.json(partida[0]);
    } catch (error) {
        res.json({ error: error.message })
    }
})
//Get partidas FULL by registro

router.get('/full/partida/:registro_partida', async (req, res) => {
    try {
        const partida = await getPartidasFullByRegistro(parseInt(req.params.registro_partida))
        console.log(partida);
        console.log(req.params);
        res.json(partida[0]);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET partida by id

router.get('/partida/:partidaId', async (req, res) => {
    try {
        const partida = await getPartidaId(req.params.partidaId);
        res.json(partida);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET partida by id de modo juego

router.get('/modo/:id_modo', async (req, res) => {

    console.log(req.params);
    try {
        const partidas = await getPartidasByModoJuegoId(parseInt(req.params.id_modo))
        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Crear una nueva partida

router.post('/', async (req, res) => {
    const result = await crearPartida(req.body);
    console.log(req.body);

    if (result.affectedRows === 1) {
        const nuevaPartida = await getPartidaId(result.insertId);
        res.json(nuevaPartida);
    } else {
        res.json({ error: 'Ha ocurrido un error en la inserción de la partida.' });
    }
});
//unirse a partida

router.post('/join/:registro_partida', async (req, res) => {

    console.log(req.body);
    const partidaRegistro = getPartidasFullByRegistro(req.body.registro_partida)
    /*  req.body.cantidad_jugadores = partidaId.cantidad_jugadores + 1 */
    console.log(partidaRegistro)
    const partida = await unirPartida(partidaRegistro, req.body);
    res.json(partida)
})

//insertar jugador en partida

router.post('/')
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


