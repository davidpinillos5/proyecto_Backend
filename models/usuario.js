//Aqui van los métodos (querys)

//(post) Crear usuario, (pedirle username, mail, pass)





const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * FROM usuarios', (error, usuarios) => {
            if (error) reject(error);
            resolve(usuarios)
        })
    })
}
//Obtener usuario por Id
const getById = (usuarioId) => {
    return new Promise((resolve, reject) => {
        db.query('select * FROM usuarios WHERE id = ?', [usuarioId], (err, users) => {
            if (err) reject(err);
            console.log(users);
            resolve(users[0]);
        })
    })
}


//(getUsuario) obtener usuarios por userName o Mail para luego poder logar

const getUsuarioLogin = (usernameOrMail) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * from usuarios where email = ? OR username = ?`, [usernameOrMail, usernameOrMail], (err, result) => {
            if (err) reject(err);
            resolve(result[0]);
        })
    })
}


//Crear usuario
const crearUsuario =
    ({
        username, email, password
    }) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO usuarios (username, email, password, role, fecha_registro) values (?, ?, ?, ?, ?)',
                [username, email, password, 'NONE', new Date()],
                (err, result) => {
                    if (err) reject(err)
                    resolve(result);
                })

        })

    }





module.exports = {
    crearUsuario, getUsuarioLogin, getAll, getById
}