const { request, response, Router } = require("express");
const { check } = require("express-validator");
const { getConducciones, getConduccion, postConduccion, putConduccion, unblockConduccion } = require("../controllers/conduccion");
const { esConduccionIdValido } = require("../helpers");
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
    validarCampos
], postConduccion);
router.put('/:id', putConduccion);
router.delete('/:id', unblockConduccion);


module.exports = router