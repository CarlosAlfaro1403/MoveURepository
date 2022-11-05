const Router = require('express').Router
const router = Router()
const AccidenteController = require('../controllers/accidenteController')
// redirecciones
router.get('/crear', AccidenteController.create);
router.get('/edit/:id', AccidenteController.edit);
// metodos
router.get('/', AccidenteController.showAll);
router.post('/', AccidenteController.store);
router.post('/editar/:id', AccidenteController.update);
router.get('/eliminar/:id', AccidenteController.delete);
module.exports = router