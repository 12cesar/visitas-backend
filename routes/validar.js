const { Router } = require("express");
const { getValidarDni, putResetPassword } = require("../controllers/validar");
const { validarCampos } = require("../middlewares");


const router = Router();

router.get('/:dni', [
    validarCampos
], getValidarDni);
router.put('/', [
    validarCampos
], putResetPassword);




module.exports =router;