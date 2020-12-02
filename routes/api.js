const router = require('express').Router()

const apiUsuariosRouter = require('./api/usuarios');
const apiPartidasRouter = require('./api/partidas');
const apiJuegosRouter = require('./api/juegos')


router.use('/usuarios', apiUsuariosRouter);

router.use('/partidas', apiPartidasRouter)

router.use('/juegos', apiJuegosRouter)



module.exports = router;