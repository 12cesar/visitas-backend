const {Router} = require('express');
const { getCategorias, getCategoria, postCategoria, putCategoria, unblockCategoria } = require('../controllers/categorias');

const router = Router();

router.get('/', getCategorias);
router.get('/:id', getCategoria);
router.post('/', postCategoria);
router.put('/:id', putCategoria);
router.delete('/:id', unblockCategoria);
module.exports = router;


