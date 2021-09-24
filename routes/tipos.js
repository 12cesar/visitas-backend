const { Router } = require('express');
const { getTipos, postTipo, putTipo, getTipo, unblockTipo } = require('../controllers/tipos');


const router = Router();

router.get('/', getTipos);
router.get('/:id', getTipo);
router.post('/', postTipo);
router.put('/:id', putTipo);
router.delete('/:id', unblockTipo);
module.exports = router;



