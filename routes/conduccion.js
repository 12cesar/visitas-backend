const { Router } = require("express");
const { check } = require("express-validator");
const { getConducciones, getConduccion, postConduccion, putConduccion, unblockConduccion } = require("../controllers/conduccion");
const { esConduccionIdValido, esUsuarioValido, esVehiculoIdValido } = require("../helpers");
const { validarCampos, validarJWT } = require("../middlewares");


const router = Router();

router.get('/', getConducciones);
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esConduccionIdValido),
    validarCampos
], getConduccion);
router.post('/',[
    validarJWT,
    check('chofer').custom(esUsuarioValido),
    check('vehiculo').custom(esVehiculoIdValido),
    validarCampos
], postConduccion);
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esConduccionIdValido),
    validarCampos
], putConduccion);
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esConduccionIdValido),
    validarCampos
], unblockConduccion);


module.exports = router