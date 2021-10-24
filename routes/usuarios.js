const {Router} = require('express');
const { check } = require('express-validator');
const { getUsuarios, getUsuario, postUsuario, putUsuario, unBlockUsuario, getUsuarioChofer } = require('../controllers/usuarios');
const { esUsuarioValido, esNombreUsuarioValido, esUsuarioValidoUser } = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares')
const router= Router();

router.get('/', getUsuarios);
router.get('/tipo/chofer', getUsuarioChofer);
router.get('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioValido),
    validarCampos
], getUsuario);
router.post('/',[
    check('nombre').custom(esNombreUsuarioValido),
    check('usuario').custom(esUsuarioValidoUser),
    validarCampos
], postUsuario);
router.put('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioValido),
    validarCampos
], putUsuario);
router.delete('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(esUsuarioValido),
    validarCampos
], unBlockUsuario);

module.exports = router;