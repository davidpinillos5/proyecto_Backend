const router = require('express').Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dayjs = require('dayjs')

const { getAll, getById } = require('../../models/usuario');
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

//Obtener un usuario logado
//! no poner debajo de la siguiente ruta, se solapan

router.get('/user', async (req, res) => {

    try {
        const rows = await getById(req.user.id)
        /*   console.log('el id es : ' + req.user.id); */
        res.json(rows);
    } catch (error) {
        res.json({ error: error.message })
    }
})

//obtener usuario por ID


router.get('/:usuarioId', async (req, res) => {

    try {
        const usuario = await getById(req.params.usuarioId)
        /* console.log(usuario); */
        /*  console.log(req.params.usuarioId); */

        res.json(usuario)
    } catch (error) {
        res.json({ error: error.message })
    }
})



//registro

/* router.post('/registro', async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
        const result = await crearUsuario(req.body);
        result.aviso = 'Añadido correctamente'
        res.json(result);
    } catch (error) {
        res.json({ error: error.message })
    }

}) */

/* router.post('/login', async (req, res) => {

    

    const password = req.body.password
    
    // ! Al poner mal el usuario en el front da un error de titulo of undefined.
    try {
        const usuario = await getUsuarioLogin(req.body.valorLogin)
        usuario.titulo = 'USUARIO AÑADIDO'
        

        if (!usuario)
            return res.json({ error: 'Usuario o contraseña incorrectos' })

        const igualPassword = bcrypt.compareSync(password, usuario.password)
    
        if (!igualPassword) return res.json({ error: 'Usuario o contraseña incorrectos(pw)' })



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
}) */


/* router.post('/token', (req, res) => {
    const id = getIdByToken(req.body.token);


    function getIdByToken(token) {
        return jwt.verify(token, process.env.SECRET_KEY);
    }

    return res.json(id)
}) */



module.exports = router