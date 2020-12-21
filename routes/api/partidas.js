const router = require('express').Router()
const partida = require('../../models/partida');
const {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId, getPlataformas, getPartidasFull, getPartidasFullById, unirPartida, getPartidasFullByRegistro, insertarJugadorPartida, getPartidasByModoJuegoId, getPartidasByRangoId, getPartidasByDateAsc, getPartidasByDateDesc, getRegistrosByPartida, updateCantidadJugadores, getPartidasPaginadas, getPartidasFullPaginas, getRegistrosUnicos, getJugadoresByRegistroPartida, getRegistrosUnicosByAsc, getRegistrosUnicosByIdRango, getFechasByregistro, getRegistrosByIdModo, getRegistrosUnicosFull
} = require('../../models/partida');

const { body, validationResult } = require('express-validator');
const { getJuegoById, getModoById, getModosByIdJuego, getRangoById } = require('../../models/juego');
const { getById } = require('../../models/usuario');


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

router.get('/modo/:id_modo/:pagina', async (req, res) => {

    console.log(req.params);
    try {
        const partidas = await getPartidasByModoJuegoId(parseInt(req.params.id_modo), req.params.pagina)
        console.log(req.params)
        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET partida by id de rango

router.get('/rango/:id_rango/:pagina', async (req, res) => {
    console.log(req.params);
    try {
        const partidas = await getPartidasByRangoId(parseInt(req.params.id_rango), parseInt(req.params.pagina))

        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET partidas paginadas 
//! HERE

router.get('/pagina/:idJuego/:pagina', async (req, res) => {


    try {

        const partidas = await getPartidasFullPaginas(req.params.idJuego, req.params.pagina)
        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET partidas ORDENADAS POR FECHA ASCENDENTE/DESCENDENTE por ID de JUEGO

router.get('/asc/:id_juego/:pagina', async (req, res) => {
    try {
        const partidas = await getPartidasByDateAsc(parseInt(req.params.id_juego), req.params.pagina)

        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

router.get('/desc/:id_juego/:pagina', async (req, res) => {
    try {
        const partidas = await getPartidasByDateDesc(parseInt(req.params.id_juego), req.params.pagina)

        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})
router.get('/registro/:registro_partida', async (req, res) => {
    try {
        const partida = await getRegistrosByPartida(req.params.registro_partida)
        res.json(partida)
    } catch (error) {
        res.json({ error: error.message })
    }
})
//GET FULL REGISTROS
router.get('/rg/:idJuego', async (req, res) => {
    try {
        const arrRegistros = await getRegistrosUnicosFull(req.params.idJuego)
        for (registro of arrRegistros) {
            registro.juego = await getJuegoById(registro.fk_juego)
            registro.modo_juego = await getModoById(registro.fk_modo_juego)
            registro.rango = await getRangoById(registro.fk_rango)
            registro.jugadores = await getJugadoresByRegistroPartida(registro.registro_partida)
            registro.fecha = await getFechasByregistro(registro.registro_partida)
        }
        res.json(arrRegistros)

    } catch (error) {
        res.json({ error: error.message })
    }
})


//GET REGISTROS PAGINADOS
router.get('/rg/:idJuego/:pagina', async (req, res) => {
    try {
        const arrRegistros = await getRegistrosUnicos(req.params.idJuego, req.params.pagina)
        for (registro of arrRegistros) {
            registro.juego = await getJuegoById(registro.fk_juego)
            registro.modo_juego = await getModoById(registro.fk_modo_juego)
            registro.rango = await getRangoById(registro.fk_rango)
            registro.jugadores = await getJugadoresByRegistroPartida(registro.registro_partida)
            registro.fecha = await getFechasByregistro(registro.registro_partida)
        }
        res.json(arrRegistros)

    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET BY ANTIGUOS
router.get('/rg/asc/:idJuego/:pagina', async (req, res) => {
    try {
        const arrRegistros = await getRegistrosUnicosByAsc(req.params.idJuego, req.params.pagina)
        for (registro of arrRegistros) {
            registro.juego = await getJuegoById(registro.fk_juego)
            registro.modo_juego = await getModoById(registro.fk_modo_juego)
            registro.rango = await getRangoById(registro.fk_rango)
            registro.jugadores = await getJugadoresByRegistroPartida(registro.registro_partida)
            registro.fecha = await getFechasByregistro(registro.registro_partida)
        }
        res.json(arrRegistros)

    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET BY RECIENTES 

//GET BY RANGO
router.get('/rg/rango/:idJuego/:idRango/:pagina', async (req, res) => {
    try {
        const arrRegistros = await getRegistrosUnicosByIdRango(req.params.idJuego, req.params.idRango, req.params.pagina)
        for (registro of arrRegistros) {
            registro.juego = await getJuegoById(registro.fk_juego)
            registro.modo_juego = await getModoById(registro.fk_modo_juego)
            registro.rango = await getRangoById(registro.fk_rango)
            registro.jugadores = await getJugadoresByRegistroPartida(registro.registro_partida)
            registro.fecha = await getFechasByregistro(registro.registro_partida)
        }
        res.json(arrRegistros)

    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET REGISTROS BY MODO

router.get('/rg/modo/:idJuego/:idModo/:pagina', async (req, res) => {
    try {
        const arrRegistros = await getRegistrosByIdModo(req.params.idJuego, req.params.idModo, req.params.pagina)
        for (registro of arrRegistros) {
            registro.juego = await getJuegoById(registro.fk_juego)
            registro.modo_juego = await getModoById(registro.fk_modo_juego)
            registro.rango = await getRangoById(registro.fk_rango)
            registro.jugadores = await getJugadoresByRegistroPartida(registro.registro_partida)
            registro.fecha = await getFechasByregistro(registro.registro_partida)
        }
        res.json(arrRegistros)

    } catch (error) {
        res.json({ error: error.message })
    }
})

//GET JUGADORES BY REGISTRO PARTIDA
router.get('/players/:registro_partida', async (req, res) => {
    try {
        const jugadores = await getJugadoresByRegistroPartida(req.params.registro_partida)
        res.json(jugadores)
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

router.post('/join/:registro', async (req, res) => {


    const partidaRegistro = getPartidasFullByRegistro(req.body.registro)
    /*  req.body.cantidad_jugadores = partidaId.cantidad_jugadores + 1 */
    /* console.log(partidaRegistro) */
    console.log(req.body);
    const partida = await unirPartida(partidaRegistro, req.body);

    res.json(partida)
})

//Update cantidad

router.put('/update', async (req, res) => {
    const partidaUpdate = await updateCantidadJugadores(req.body.registro_partida)
    const partidaActualizada = getPartidasFullByRegistro(req.body.registro_partida)
    console.log(partidaActualizada);
    res.json({ partida: partidaUpdate, mensaje: "JUGADOR AÑADIDO" })
})


//insertar jugador en partida

/* router.post('/') */
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


