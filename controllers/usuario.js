
const {response} = require('express')

const usuariosGet = (req, res = response) => {

    const {q, nombre = 'No name', apikey, page = 1, limit}  = req.params

    res.json({
        msg:'get api',
        q,
        nombre,
        apikey,
        page,
        limit
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body

    res.json({
        msg:'post api',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const id = req.params

    res.json({
        msg:'put api'
    })
}

const usuariosPatch = (req, res = response) => {

    res.json({
        msg:'patch api'
    })
}

const usuariosDelete = (req, res = response) => {

    res.json({
        msg:'delete api'
    })
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}