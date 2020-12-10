const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const { getById } = require('../models/usuario');


const checkToken = async (req, res, next) => {
    if (process.env.MIDDLEWARE_ACTIVATE === 'OFF') {
        return next()
    }

    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Necesitas la cabecera Authorization' });
    }

    const token = req.headers['authorization'];

    const obj = jwt.decode(token, process.env.SECRET_KEY);
    if (!obj) {
        return res.status(403).json({ error: 'Token incorrecto' })
    }

    if (dayjs().unix() > obj.caducidad) {
        return res.status(403).json({ error: 'Token Caducado, vuelve a logarte' })
    }

    const userExist = await getById(obj.usuarioId);
    if (!userExist) { return res.status(403).json({ error: 'El usuario no existe' }) }

    req.user = userExist;

    next()
}



module.exports = {
    checkToken
}