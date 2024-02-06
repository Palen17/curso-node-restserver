
const {response} = require('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs')
const {validationResult} = require("express-validator");
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

const usuariosPost = async (req, res = response) => {



    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol})

    //verificar si el correo existe


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt)

    //Guardar en Db



    await usuario.save()

    res.json({
        msg:'post api',
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params
    const {_id, password, google, correo, ...resto} = req.body

    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)


    res.json({
        msg:'put api',
        usuario
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