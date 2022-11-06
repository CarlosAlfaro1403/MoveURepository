const Router = require('express').Router
const router = Router()
const TipoUsuarioController = require('../controllers/tipoUsuarioController')

// redirecciones
router.get('/crear', TipoUsuarioController.create);
router.get('/edit/:id', TipoUsuarioController.edit);
// metodos
router.get('/', TipoUsuarioController.showAll);
router.post('/', TipoUsuarioController.store);
router.post('/editar/:id', TipoUsuarioController.update);
router.get('/eliminar/:id', TipoUsuarioController.delete);

module.exports = router