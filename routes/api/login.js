const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

const { getUsuarioLogin } = require('../../models/usuario');


router.post('/', async (req, res) => {

    //getUsuarioLogin devuelve un usuario logado

    const password = req.body.password
    /*  console.log(password); */
    // ! Al poner mal el usuario en el front da un error de titulo of undefined.
    try {
        const usuario = await getUsuarioLogin(req.body.valorLogin)
        usuario.titulo = 'USUARIO AÑADIDO'
        /*     console.log(usuario.password);
            console.log(req.body.valorLogin);
            console.log(usuario);
            console.log(req.body); */

        if (!usuario)
            return res.json({ error: 'Usuario o contraseña incorrectos' })

        const igualPassword = bcrypt.compareSync(password, usuario.password)
        /* console.log(igualPassword); */
        if (!igualPassword) return res.json({ error: 'Usuario o contraseña incorrectos(pw)' })

        /* console.log(createToken(usuario)); */


        res.json({
            success: 'Login correcto',
            token: createToken(usuario)
        })
    } catch (error) {
        res.json({ error: error.message })
    }

    function createToken(usuario) {
        const obj = {
            usuarioId: usuario.id,
            caducidad: dayjs().add(10, 'day').unix()
        }
        return jwt.sign(obj, process.env.SECRET_KEY);
    }
})

module.exports = router