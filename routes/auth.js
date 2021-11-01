const { Router } = require("express");
const { check } = require("express-validator");
const { postLogin, getLogin } = require("../controllers/auth");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWTChofer}= require('../middlewares')
const router = new Router();

router.get('/',[
    validarJWTChofer,
    validarCampos
], getLogin)
router.post('/:coleccion',[
    validarCampos
], postLogin);



module.exports = router