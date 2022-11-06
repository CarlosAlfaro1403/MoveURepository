const Router = require('express').Router
const router = Router()
const VehiculoController = require('../controllers/vehiculoController')

// redirecciones
router.get('/crear', VehiculoController.create);
router.get('/edit/:id', VehiculoController.edit);
// metodos
router.get('/', VehiculoController.showAll);
router.post('/', VehiculoController.store);
router.post('/editar/:id', VehiculoController.update);
router.get('/eliminar/:id', VehiculoController.delete);
router.post('/vehiculoT', VehiculoController.storeT);

module.exports = router