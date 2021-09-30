const { Router } = require("express");
const { check } = require("express-validator");
const { getAnuncios, getAnuncio, postAnuncio, putAnuncio, unblockAnuncio } = require("../controllers/anuncios");
const { esAnuncioIdValido } = require("../helpers/db-validators");
const { validarCampos, validarJWT } = require("../middlewares");

const router = new Router();

router.get('/', getAnuncios);
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAnuncioIdValido),
    validarCampos
], getAnuncio);
router.post('/',[
    validarJWT,
    validarCampos
], postAnuncio);
router.put('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAnuncioIdValido),
    validarCampos
], putAnuncio);
router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esAnuncioIdValido),
    validarCampos
], unblockAnuncio);



module.exports = router;