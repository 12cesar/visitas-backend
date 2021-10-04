const { Router } = require("express");
const { check } = require("express-validator");
const { getAlertas, getAlerta, postAlerta, putAlerta, unblockAlerta } = require("../controllers/alertas");
const { esAlertaIdValido } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require('../middlewares');;
const router = new Router();

router.get('/', getAlertas);

router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAlertaIdValido),
    validarCampos
], getAlerta);
router.post('/',[
    validarJWT,
    validarCampos
], postAlerta);
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAlertaIdValido),
    validarCampos
], putAlerta);
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAlertaIdValido),
    validarCampos
], unblockAlerta);

module.exports = router