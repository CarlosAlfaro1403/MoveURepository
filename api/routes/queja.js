const Router = require('express').Router
const router = Router()
const QuejaController = require('../controllers/quejaController')

// redirecciones
router.get('/crear', QuejaController.create);
router.get('/edit/:id', QuejaController.edit);
// metodos
router.get('/', QuejaController.showAll);
router.post('/', QuejaController.store);
router.post('/editar/:id', QuejaController.update);
router.get('/eliminar/:id', QuejaController.delete);

module.exports = router