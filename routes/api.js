const router = require('express').Router()

const apiUsuariosRouter = require('./api/usuarios');
const apiPartidasRouter = require('./api/partidas');
const apiJuegosRouter = require('./api/juegos');
const apiLoginRouter = require('./api/login')
const { checkToken } = require('./middleware');


router.use('/usuarios', checkToken, apiUsuariosRouter);

router.use('/partidas', apiPartidasRouter)

router.use('/juegos', apiJuegosRouter)

router.use('/login', apiLoginRouter)



module.exports = router;