const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

const { crearUsuario, getUsuarioLogin, getAll, getByUserName } = require('../../models/usuario');
const { json } = require('express');
//Aqui van las peticiones


//obtener lista usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await getAll();
        res.json(usuarios)
    } catch (error) {
        res.json({ error: error.message })
    }
});

//obtener usuario por UserName
// !Se me ha complicado
/*
router.get('/:username', async (req, res) => {

    try {
        const username = req.params.username
        console.log(username);
        const result = await getByUserName(username);

        res.json(result)
    } catch (error) {
        res.json({ error: error.message })
    }
}) */

//registro y login

router.post('/registro', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const result = await crearUsuario(req.body);
        result.aviso = 'Añadido correctamente'
        res.json(result);
    } catch (error) {
        res.json({ error: error.message })
    }

})

router.post('/login', async (req, res) => {

    //getUsuarioLogin devuelve un usuario logado

    const password = req.body.password
    /*  console.log(password); */

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
        console.log(igualPassword);
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