const Router = require('express').Router
const router = Router()
const SedeController = require('../controllers/sedeController')

// redirecciones
router.get('/crear', SedeController.create);
router.get('/edit/:id', SedeController.edit);
// metodos
router.get('/', SedeController.showAll);
router.post('/', SedeController.store);
router.post('/editar/:id', SedeController.update);
router.get('/eliminar/:id', SedeController.delete);

module.exports = router