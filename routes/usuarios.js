const {Router} = require('express');
const { getUsuarios, getUsuario, postUsuario, putUsuario, unBlockUsuario } = require('../controllers/usuarios');

const router= Router();

router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', postUsuario);
router.put('/:id', putUsuario);
router.delete('/', unBlockUsuario);

module.exports = router;