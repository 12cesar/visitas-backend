const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { getMensaje, getMensajes, postMensaje, putMensaje, unblockMensaje } = require("../controllers/mensajes");
const { esMensajeIdValido } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require("../middlewares");

const router = Router();

router.get('/', getMensajes);
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIdValido),
    validarCampos
], getMensaje);
router.post('/',[
    validarJWT,
    validarCampos
], postMensaje);
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIdValido),
    validarCampos
], putMensaje);
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esMensajeIdValido),
    validarCampos
], unblockMensaje);



module.exports = router;