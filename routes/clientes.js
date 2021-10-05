const { Router } = require("express");
const { check } = require("express-validator");
const { getClientes, getCliente, postCliente, putCliente, unblockCliente } = require("../controllers/clientes");
const { esClienteIdValido } = require("../helpers");
const { validarCampos } =require('../middlewares');
const router = new Router();

router.get('/', getClientes)
router.get('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esClienteIdValido),
    validarCampos
], getCliente)
router.post('/', postCliente)
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esClienteIdValido),
    validarCampos
], putCliente)
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(esClienteIdValido),
    validarCampos
], unblockCliente)



module.exports = router;