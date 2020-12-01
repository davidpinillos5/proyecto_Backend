const router = require('express').Router()

const apiUsuariosRouter = require('./api/usuarios');
const apiPartidasRouter = require('./api/partidas');


router.use('/usuarios', apiUsuariosRouter);

router.use('/partidas', apiPartidasRouter)




module.exports = router;