const router = require('express').Router();
const juego = require('../../models/juego.js');
const { getJuegos, getJuegoById, getModosByIdJuego, getPartidasByIdJuego, getRangosByIdjuego, getJugadoresByModoJuego } = require('../../models/juego.js');


//RUTASSS /api/juegos/...

// get /api/juegos --Obtener todos los juegos
// get /api/juegos/:juego  --obtener un juego por nombre/id
// get /api/juegos/:juego/modos de juego de un juego por nombre/id
// get /api/juegos/:juego/partidas  obtener todas las partidas de un juego
// get /api/juegos/:juego/rangos


//Obtener todos los juegos
router.get('/', async (req, res) => {
    try {
        const result = await getJuegos();

        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }

})

//Obtener un juego por id
router.get('/:juegoId', async (req, res) => {
    try {
        const juego = await getJuegoById(req.params.juegoId);
        console.log((req.params.juegoId));

        res.json(juego)
        console.log(juego);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todos los modos de juego por id del juego

router.get('/:juegoId/modos', async (req, res) => {

    try {
        /* const juego = await getJuegoById(req.params.juegoId)
        console.log(juego); */

        const modos = await getModosByIdJuego(req.params.juegoId)
        console.log(modos);
        res.json(modos)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todas las partidas por id del juego

router.get('/:juegoId/partidas', async (req, res) => {

    try {
        /* const juego = await getJuegoById(req.params.juegoId); */

        const partidas = await getPartidasByIdJuego(req.params.juegoId);

        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todos los rangos de un juego por id del juego

router.get('/:juegoId/rangos', async (req, res) => {
    try {
        /* const juego = await getJuegoById(req.params.juegoId); */

        const rangos = await getRangosByIdjuego(req.params.juegoId);
        res.json(rangos)
    } catch (error) {
        res.json({ error: error.message })
    }


})

//Obtener el número máximo de jugadores por modo de juego

router.get('/modos/:idModoJuego/jugadores', async (req, res) => {
    try {
        const numeroJugadores = await getJugadoresByModoJuego(req.params.idModoJuego);
        res.json(numeroJugadores)
    } catch (error) {
        res.json({ error: error.message })
    }
})





module.exports = router

