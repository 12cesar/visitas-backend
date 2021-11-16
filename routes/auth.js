const { Router } = require("express");
const { check } = require("express-validator");
const { postLogin, getLogin, getLoginContribuyente } = require("../controllers/auth");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWTChofer, validarJWT, validarJWTContribuyente}= require('../middlewares')
const router = new Router();

router.get('/',[
    validarJWTChofer,
    validarCampos
], getLogin);
router.get('/cliente',[
    validarJWTContribuyente,
    validarCampos
],getLoginContribuyente);
router.post('/:coleccion',[
    validarCampos
], postLogin);



module.exports = router