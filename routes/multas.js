const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { getMultas, getMulta, postMulta, putMulta, unblockMulta } = require("../controllers/multas");
const { esMultaIdValido } = require("../helpers");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

router.get('/', getMultas)
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esMultaIdValido),
    validarCampos
], getMulta)
router.post('/',[
    validarJWT,
    validarCampos
], postMulta)
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esMultaIdValido),
    validarCampos
], putMulta)
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esMultaIdValido),
    validarCampos
], unblockMulta)


module.exports =router;