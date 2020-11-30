const router = require('express').Router()
const partida = require ('../../models/partida');
const {
    getPartidas, crearPartida, getPartidaId, borrarPartidaId
} = require('../../models/partida');

const { body, validationResult } = require('express-validator');


//Recuperar todas las partidas de la base de datos

router.get('/', async (req, res) => {
    
    try {
        const rows = await getPartidas();
        res.json(rows);

    } catch (error) {
        res.json({ error: error.message });
    }
});

module.exports = router