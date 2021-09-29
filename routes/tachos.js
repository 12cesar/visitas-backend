const { Router } = require("express");
const { check } = require("express-validator");
const { getTachos, getTacho, postTacho, putTacho, unblockTacho } = require("../controllers/tachos");
const { esTachoNombreValido, esTachoIdValido } = require("../helpers/db-validators");
const { validarCampos, validarJWT } =require('../middlewares');
const router = new Router();

router.get('/', getTachos);
router.get('/:id', [
    check('id', 'El id no es de tipo mongo').isMongoId(),
    check('id').custom(esTachoIdValido),
    validarCampos
], getTacho);
router.post('/',[
    check('ltd', 'la latitud es obligatorio').not().isEmpty(),
    check('lng', 'la longitud es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom(esTachoNombreValido),
    check('direccion', 'la direccion es obligatorio').not().isEmpty(),
    validarJWT,
    validarCampos
], postTacho);
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es de tipo mongo').isMongoId(),
    check('id').custom(esTachoIdValido),
    validarCampos
], putTacho);
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es de tipo mongo').isMongoId(),
    check('id').custom(esTachoIdValido),
    validarCampos
], unblockTacho);

module.exports = router;