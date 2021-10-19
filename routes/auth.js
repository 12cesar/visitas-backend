const { Router } = require("express");
const { check } = require("express-validator");
const { postLogin } = require("../controllers/auth");
const { coleccionesPermitidas } = require("../helpers/db-validators");
const {validarCampos} = require('../middlewares/validar-campos')
const router = new Router();

router.post('/login/:coleccion',[
    validarCampos
], postLogin);



module.exports = router