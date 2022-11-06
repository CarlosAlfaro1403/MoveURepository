const Router = require('express').Router
const router = Router()
const CooperativaController = require('../controllers/cooperativaController')

// redirecciones
router.get('/crear', CooperativaController.create);
router.get('/edit/:id', CooperativaController.edit);
// metodos
router.get('/', CooperativaController.showAll);
router.post('/', CooperativaController.store);
router.post('/editar/:id', CooperativaController.update);
router.get('/eliminar/:id', CooperativaController.delete);

module.exports = router