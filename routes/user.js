const {Router} = require('express')
const {usuariosGet, usuariosPut, usuariosPatch, usuariosPost, usuariosDelete} = require("../controllers/usuario");
const {check} = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos");
const Role = require("../models/role");
const {esRoleValido, emailExiste, existeUsuarioPorId} = require("../helpers/db-validators");



const router = Router()

router.get('/', usuariosGet)

router.put('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
    ],usuariosPut)

router.patch('/',usuariosPatch)

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({min: 6}),
    check('correo', 'el correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    //check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost)

router.delete('/:id', [
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
    validarCampos
    ],
    usuariosDelete)


module.exports = router