const Router = require('express').Router
const router = Router()
const ClienteController = require('../controllers/clienteController')
// redirecciones
router.get('/crear', ClienteController.create);
router.get('/edit/:id', ClienteController.edit);
// metodos
router.get('/', ClienteController.showAll);
router.post('/', ClienteController.store);
router.post('/editar/:id', ClienteController.update);
router.get('/eliminar/:id', ClienteController.delete);
module.exports = router