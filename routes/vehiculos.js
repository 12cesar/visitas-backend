const { Router, request, response } = require("express");
const { check } = require("express-validator");
const { getVehiculos, postVehiculo, putVehiculo, unblockVehiculo, getVehiculo } = require("../controllers/vehiculos");
const { esVehiculoIdValido, esVehiculoNombreValido, esVehiculoPlacaValido } = require("../helpers");
const { validarCampos, validarJWT } = require("../middlewares");



const router = Router();

router.get('/', getVehiculos)
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esVehiculoIdValido),
    validarCampos
], getVehiculo)
router.post('/',[
    validarJWT,
    check('nombre').custom(esVehiculoNombreValido),
    check('placa').custom(esVehiculoPlacaValido),
    validarCampos
], postVehiculo)
router.put('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esVehiculoIdValido),
    validarCampos
], putVehiculo)
router.delete('/:id',[
    validarJWT,
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esVehiculoIdValido),
    validarCampos
], unblockVehiculo)




module.exports = router;