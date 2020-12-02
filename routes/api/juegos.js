const router = require('express').Router();
const juego = require('../../models/juego.js');
const { getJuegos, getJuegoById, getModosByIdJuego, getPartidasByIdJuego } = require('../../models/juego.js');


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
        res.json(juego)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todos los modos de juego por id del juego

router.get('/:juegoId/modos', async (req, res) => {

    try {
        const juego = await getJuegoById(req.params.juegoId)
        console.log(juego);

        const modos = await getModosByIdJuego(juego)
        res.json(modos)
    } catch (error) {
        res.json({ error: error.message })
    }
})

//Obtener todas las partidas por id del juego

router.get('/:juegoId/partidas', async (req, res) => {

    try {
        const juego = await getJuegoById(req.params.juegoId);

        const partidas = await getPartidasByIdJuego(juego);

        res.json(partidas)
    } catch (error) {
        res.json({ error: error.message })
    }
})





module.exports = router

