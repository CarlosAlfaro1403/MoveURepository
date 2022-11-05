const Router = require('express').Router
const router = Router()
const ViajeController = require('../controllers/viajeController')

// redirecciones
router.get('/crear', ViajeController.create);
//router.get('/edit/:id', ViajeController.edit);
// metodos
router.get('/', ViajeController.showAll);
router.post('/', ViajeController.store);
router.get('/ver/:id', ViajeController.show);
router.get('/notificacion/:id', ViajeController.notificacion);
//router.get('/eliminar/:id', ViajeController.delete);

module.exports = router
